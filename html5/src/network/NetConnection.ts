enum ConnectStatus
{
	None = 0,
	Connecting,
	Connected,
	Failed,
	Closed,
};

const PingCycle: int = 30 * 1000;
const MaxNoPackTick: int = 120 * 1000;
const ConnectTimeout: int = 1000;

class NetConnection implements INetConnection
{
	private m_packets_buff: Array<NetPacket>;
	private m_packets_send: Array<NetPacket>;
	private m_socket: egret.WebSocket;
	private m_dispatcher: IEventDispatcher;
	private m_status: ConnectStatus;

	public get Status(): ConnectStatus
	{
		return this.m_status;
	}

	private m_send_offset: int = 0;
	private m_ping: int = -1;
	private m_last_pack_tick: int = 0;
	private m_last_conn_tick: int = 0;
	private m_packet_receving: NetPacket = null;

	private m_timer : egret.Timer = null;

	constructor(dispatcher: IEventDispatcher)
	{
		this.m_packets_buff = new Array<NetPacket>();
		this.m_packets_send = new Array<NetPacket>();
		this.m_socket = new egret.WebSocket;
		this.m_socket.type = egret.WebSocket.TYPE_BINARY;
		this.m_socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
		this.m_socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
		this.m_socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
		this.m_socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
		this.m_dispatcher = dispatcher;
		this.m_status = ConnectStatus.None;
	}

	// INetConnection
	public get IsConnected() : boolean
	{
		return this.m_status == ConnectStatus.Connected;
	}

	public CloseConnection(): void
	{
		this.m_socket.close();
	}

	public SendMessage(msg: NetMessage): void
	{
		let pack = this.AllocPacket(false);
		pack.bodyBuffer.writeShort(msg.CLSID);
		msg.ToStream(pack.bodyBuffer);
		this.SendPacket(pack);
	}

	public Ping(): int
	{
		return this.m_ping;
	}

	public IsConnectTimeout(): boolean
	{
		if (this.m_status == ConnectStatus.Connecting) {
			if (egret.getTimer() - this.m_last_conn_tick > ConnectTimeout) {
				return true;
			}
		}
		return false;
	}

	public Connect(ip: string, port: short, proxy: string)
	{
		if (this.m_status != ConnectStatus.None)
			return;

		this.RefreshTick();
		this.RefreshConnTick();

		let url = proxy.length > 0 ? (proxy + "?addr=" + ip + "&port=" + port) : null;
		this.m_status = ConnectStatus.Connecting;
		if (url)
			this.m_socket.connectByUrl(url);
		else
			this.m_socket.connect(ip, port);
	}

	private AllocPacket(is_inner: boolean): NetPacket
	{
		if (this.m_packets_buff.length > 0) {
			let p = this.m_packets_buff.shift();
			p.IsInner = is_inner;
			p.clear();
			return p;
		}
		return new NetPacket(is_inner);
	}

	private DeallocPacket(p: NetPacket): void
	{
		this.m_packets_buff.push(p);
	}

	private RefreshTick(): void
	{
		this.m_last_pack_tick = egret.getTimer();
	}

	private RefreshConnTick(): void
	{
		this.m_last_conn_tick = egret.getTimer();
	}

	private ActivatePing():void
	{
		this.m_timer = new egret.Timer(PingCycle);
		this.m_timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this.m_timer.start();
	}

	private SendPacket(pack: NetPacket): void
	{
		pack.encode();
		this.m_packets_send.push(pack);
		if (this.m_packets_send.length == 1)
			this.PostSend();
	}

	private PostSend(): void
	{
		if (this.m_packets_send.length != 0) {
			let p = this.m_packets_send.shift();
			this.m_socket.writeBytes(p.headBuffer);
			this.m_socket.writeBytes(p.bodyBuffer);
			this.m_socket.flush();
			this.DeallocPacket(p);
			this.PostSend();
		}
	}

	private onReceiveMessage(e: egret.Event): void
	{
		// 从socket中读数据
		var bytes: NetBuffer = new NetBuffer();
		this.m_socket.readBytes(bytes);
		let offset = 0;

		while (bytes.bytesAvailable > 0) {
			// 分配packet
			if (!this.m_packet_receving)
				this.m_packet_receving = this.AllocPacket(false);

			// 如果是新的packet，先读header
			if (this.m_packet_receving.m_head_transfered == 0) {
				bytes.readBytes(this.m_packet_receving.headBuffer, 0, 4);
				this.m_packet_receving.decode();
				this.m_packet_receving.m_head_transfered += 4;
				offset += 4;
			}

			// 继续读body
			let left = this.m_packet_receving.payloadLength - this.m_packet_receving.m_body_transfered;
			let len = Math.min(left, bytes.bytesAvailable);
			if (len > 0) {
				this.m_packet_receving.m_body_transfered += len;
				bytes.readBytes(this.m_packet_receving.bodyBuffer, this.m_packet_receving.bodyBuffer.position, len);
				offset += len;
			}

			// 检查packet是否读完
			if ( this.m_packet_receving.isCompleted )
			{
				this.RefreshTick();
				if (this.m_packet_receving.IsInner) {
					this.HandleInnerCommand(this.m_packet_receving);
				}
				else
				{
					let event: NetEvent = new NetEvent(NetEventType.IncomingMessage, this);
					event.message = read_msg(this.m_packet_receving.bodyBuffer);
					if (event)
						this.m_dispatcher.PostEvent(event);
				}
				this.DeallocPacket(this.m_packet_receving);
				this.m_packet_receving = null;
			}
		}
	}

	private onSocketOpen(): void
	{
		this.ActivatePing();
		this.m_status = ConnectStatus.Connected;
		this.m_dispatcher.PostEvent(new NetEvent(NetEventType.ConnectionEstablish, this));
	}

	private onSocketClose(): void
	{
		if (this.m_status == ConnectStatus.Connecting) {
			this.m_status = ConnectStatus.Failed;
			this.m_socket = null;
			this.m_dispatcher.PostEvent(new NetEvent(NetEventType.ConnectFail, this));
			this.m_timer.stop();
		}
		else if (this.m_status == ConnectStatus.Connected) {
			this.m_status = ConnectStatus.Closed;
			this.m_socket = null;
			this.m_dispatcher.PostEvent(new NetEvent(NetEventType.ConnectionClose, this));
			this.m_timer.stop();
		}
	}

	private onSocketError(): void
	{
		this.CloseConnection();
	}

	private HandleInnerCommand( packet : NetPacket ): void
	{
		let cmd = new inner_command();
		cmd.FromStream(packet.bodyBuffer);
		if (cmd.command == InnerCommand.NET_PONG) {
			this.m_ping = egret.getTimer() - cmd.param32_0;
			//egret.log("ping is " + this.m_ping +  " ms");
		}
	}

	private onTimer(event: egret.TimerEvent)
	{
		let tick = egret.getTimer();
		if (tick - this.m_last_pack_tick > MaxNoPackTick) {
			this.CloseConnection();
			return;
		}

		let ping = new inner_command();
		ping.command = InnerCommand.NET_PING;
		ping.param32_0 = tick;
		ping.param32_1 = this.m_ping;

		let packet = this.AllocPacket(true);
		ping.ToStream(packet.bodyBuffer);
		this.SendPacket(packet);
	}
}