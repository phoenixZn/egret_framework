enum NetEventType
{
	ConnectFail,
	ConnectionEstablish,
	ConnectionClose,
	IncomingMessage,
}

class NetEvent
{
	public type: NetEventType;
	public conn: INetConnection;
	public message: NetMessage;

	public constructor(type: NetEventType, conn: INetConnection)
	{
		this.type = type;
		this.conn = conn;
	}
}

interface INetConnection
{
	readonly IsConnected: boolean;
	CloseConnection(): void;
	SendMessage(msg: NetMessage): void;
	Ping(): int;
	IsConnectTimeout(): boolean;	
}

interface IEventNotifier
{
	OnConnectFail(conn: INetConnection);
	OnConnectEstablish(conn: INetConnection);
	OnConnectClose(conn: INetConnection);
	OnMessage(conn: INetConnection, msg: NetMessage);
}

interface IEventDispatcher
{
	PostEvent(ev: NetEvent);
}

class NetInterface implements IEventDispatcher
{
	private m_note: IEventNotifier;
	private m_event_list: Array<NetEvent> = new Array<NetEvent>();

	public constructor(note: IEventNotifier)
	{
		this.m_note = note;
	}

	public Connect(addr: string, port: short, proxy: string) : INetConnection
	{
		let conn = new NetConnection(this);
		conn.Connect(addr, port, proxy);
		return conn;
	}

	public ProcessEvents()
	{
		if(this.m_event_list.length == 0)
		{
			return;
		}
		for(let ev of this.m_event_list)
		{
			this.ProcessEvent(ev);
		}
		this.m_event_list = new Array<NetEvent>();
	}

	private ProcessEvent(ev: NetEvent)
	{
		if(ev.type == NetEventType.IncomingMessage)
		{
			this.m_note.OnMessage(ev.conn, ev.message);
		}
		else if(ev.type == NetEventType.ConnectFail)
		{
			this.m_note.OnConnectFail(ev.conn);
		}
		else if(ev.type == NetEventType.ConnectionClose)
		{
			this.m_note.OnConnectClose(ev.conn);
		}
		else if(ev.type == NetEventType.ConnectionEstablish)
		{
			this.m_note.OnConnectEstablish(ev.conn);
		}
	}

	public PostEvent(ev: NetEvent)
	{
		this.m_event_list.push(ev);
	}

}