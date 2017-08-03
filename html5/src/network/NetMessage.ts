abstract class NetMessage
{
	public abstract get CLSID(): short;
	public abstract FromStream(stream: NetBuffer): void;
	public abstract ToStream(stream: NetBuffer): void;

	public abstract get ENCRYPT(): boolean;
}

class ReqRepHead
{
	public serial: int = 0;
	public seq_or_ack: int = 0;

	public FromStream(stream: NetBuffer)
	{
		this.serial = stream.readInt();
		this.seq_or_ack = stream.readInt();
	}

	public ToStream(stream: NetBuffer)
	{
		stream.writeInt(this.serial);
		stream.writeInt(this.seq_or_ack);
	}
}

abstract class ReqRepMessage extends NetMessage
{
	private m_head: ReqRepHead = new ReqRepHead();

	public get Head(): ReqRepHead
	{
		return this.m_head;
	}

	public FromStream(stream: NetBuffer): void
	{
		this.m_head.FromStream(stream);
		from_stream(this, stream,this.m_head.serial);
	}

	public ToStream(stream: NetBuffer): void
	{
		this.m_head.ToStream(stream);
		to_stream(this, stream,this.m_head.serial);
	}

	public get ENCRYPT(): boolean
	{
		return true;
	}
}

abstract class RequestMessage extends ReqRepMessage
{
}

abstract class ReplyMessage extends ReqRepMessage
{
}

abstract class ServerPushMessage extends ReqRepMessage
{
}

abstract class InGameMessage extends ReqRepMessage
{
	public get ENCRYPT(): boolean
	{
		return false;
	}
}
