enum CallCenterResult
{
	Normal = 0,
	ConnectionClosed = -1,
	TimeOut = -2,
	OtherErr = -3,
}

class ReplyInfo
{
	public err: CallCenterResult;
	public msg: ReplyMessage;

	public get Succ()
	{
		return this.err == CallCenterResult.Normal;
	}
}

class RequestInfo
{
	public serial: int;
	public req: RequestMessage;
	public start_time: int = egret.getTimer();
	public send_count: int = 0;
	public send_time: int;
	public reply_callback: Function;

	public OnSend()
	{
		this.send_count++;
		this.send_time = egret.getTimer();
	}
}

class CallCenter extends EventCenter implements IEventNotifier
{
	private m_serial: int = 100;
	private m_ack: int = 0;
	private m_requests: Array<RequestInfo> = new Array<RequestInfo>();
	private m_netintf: NetInterface = new NetInterface(this);
	private m_conn: INetConnection;

	private m_ip: string;
	private m_port: short;
	private m_proxy: string;

	private m_recv_count: int = 0;
	private m_send_count: int = 0;
	private m_last_tick: int = egret.getTimer();;

	public constructor()
	{
		super();
	}

	public OnConnectFail(conn: INetConnection)
	{
		this.m_conn = null;
	}

	public OnConnectEstablish(conn: INetConnection)
	{
		for (let i of this.m_requests)
			this.SendMessage(i.req);
	}

	public OnConnectClose(conn: INetConnection)
	{
		this.m_conn = null;
	}

	public OnMessage(conn: INetConnection, msg: NetMessage)
	{
		let mobile_msg: ReqRepMessage = msg as ReqRepMessage;
		if (mobile_msg == null) {
			return;
		}
		let seq: int = mobile_msg.Head.seq_or_ack;
		if (seq > 0 && seq != this.m_ack + 1) {
			egret.log("msg not on demand: serial=", mobile_msg.Head.serial, ", type=", msg, ", seq=", seq, ", ack=", this.m_ack);
			return;
		}
		else if (seq > 0) {
			this.m_ack = seq;
		}

		if (mobile_msg instanceof InGameMessage) {
			this.HandleInGameMessage(mobile_msg as InGameMessage);
		}
		else if (mobile_msg instanceof ReplyMessage) {
			this.HandleReplyMessage(mobile_msg as ReplyMessage);
		}
		else if (mobile_msg instanceof ServerPushMessage) {
			this.HandleServerPushMessage(mobile_msg as ServerPushMessage);
		}
	}

	private HandleInGameMessage(msg: InGameMessage)
	{
		this.Trigger(msg.CLSID, msg);
		if (msg.CLSID ==  MessageDef.InGame_SyncCommands)
		{
			let sync_msg = msg as InGameSyncCommands;
			this.m_recv_count += sync_msg.buff.length;
		}
	}

	private HandleReplyMessage(msg: ReplyMessage)
	{
		let serial: int = msg.Head.serial;
		egret.log("HandleReply: serial=" + serial + ", type=" + msg);
		let info: RequestInfo = this.RemoveRequest(msg);
		if (info != null) {
			info.reply_callback(CallCenterResult.Normal, msg);
		}
	}

	private HandleServerPushMessage(msg: ServerPushMessage)
	{
		this.Trigger(msg.CLSID, msg);
	}

	private RemoveRequest(msg: ReplyMessage): RequestInfo
	{
		let serial: int = msg.Head.serial;
		for (let i = 0; i < this.m_requests.length; i++) {
			if (this.m_requests[i].serial == serial) {
				let info: RequestInfo = this.m_requests.splice(i, 1)[0];
				return info;
			}
		}
		return null;
	}

	private Connect()
	{
		if (this.m_conn == null) {
			this.m_conn = this.m_netintf.Connect(this.m_ip, this.m_port, this.m_proxy);
		}
	}

	private Disconnect()
	{
		if (this.m_conn != null) {
			this.m_conn.CloseConnection();
		}
	}

	private get Connected(): boolean
	{
		return this.m_conn != null && this.m_conn.IsConnected;
	}

	private SendMessage(msg: NetMessage)
	{
		if (this.Connected) {
			this.m_conn.SendMessage(msg);
			if (msg.CLSID ==  MessageDef.InGame_SyncCommands) {
				let sync_msg = msg as InGameSyncCommands;
				this.m_send_count += sync_msg.buff.length;
			}
		}
		else {
			this.Connect();
		}
	}

	public SendMessageOnly(msg: InGameMessage)
	{
		this.SendMessage(msg);
	}

	public SetAddress(ip: string, port: short, proxy: string)
	{
		this.m_ip = ip;
		this.m_port = port;
		this.m_proxy = proxy;
	}

	public async Request(req: RequestMessage): Promise<ReplyInfo>
	{
		let promise: Promise<ReplyInfo> = new Promise<ReplyInfo>((resolve) =>
		{
			let info: RequestInfo = new RequestInfo();
			info.req = req;
			info.reply_callback = function (err: CallCenterResult, rep: ReplyMessage)
			{
				let res: ReplyInfo = new ReplyInfo();
				res.err = err;
				res.msg = rep;
				resolve(res);
			};
			this.SendRequest(info);
		}
		);
		return promise;
	}

	private SendRequest(info: RequestInfo)
	{
		info.serial = this.GenerateSerial();
		info.req.Head.serial = info.serial;
		this.m_requests.push(info);
		this.SendMessage(info.req);
	}

	private GenerateSerial()
	{
		let serial = this.m_serial++;
		if (this.m_serial == 0x7fffffff) {
			this.m_serial = 100;
		}
		return serial;
	}

	public Update()
	{
		this.m_netintf.ProcessEvents();
		this.CheckTimeout();

		let now = egret.getTimer();
		if ( now - this.m_last_tick > 1000 )
		{
			this.m_last_tick = now;
			// if (this.m_send_count)
			// 	egret.log("InGameSyncCommands recv:" + this.m_recv_count + ", send:" + this.m_send_count + ", diff:" + (this.m_send_count - this.m_recv_count));
		}
	}

	private CheckTimeout()
	{

	}
}