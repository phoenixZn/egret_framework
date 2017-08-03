enum InnerCommand
{
	NET_PING = 1,
	NET_PONG = 2
}

class inner_command
{
	public command: InnerCommand = 0;
	public param32_0: int = 0;
	public param32_1: int = 0;
	public param32_2: int = 0;
	public param64: Int64 = new Int64(0, 0);

	public ToStream(outs: NetBuffer): void
	{
		outs.writeInt(this.command);
		outs.writeInt(this.param32_0);
		outs.writeInt(this.param32_1);
		outs.writeInt(this.param32_2);
		outs.writeInt64(this.param64);
	}

	public FromStream(ins: NetBuffer): void
	{
		this.command = ins.readInt();
		this.param32_0 = ins.readInt();
		this.param32_1 = ins.readInt();
		this.param32_2 = ins.readInt();
		this.param64 = ins.readInt64();
	}
};

class package_header
{
	public is_inner: boolean = false;
	public body_length: int = 0;

	public constructor(is_inner: boolean)
	{
		this.is_inner = is_inner;
	}

	public Load(stream: egret.ByteArray): void
	{
		this.body_length = stream.readInt();
		if (this.body_length < 0) {
			this.is_inner = true;
			this.body_length = -this.body_length;
		}
	}

	public Save(stream: egret.ByteArray): void
	{
		let len = this.body_length;
		if (this.is_inner) {
			len = -len;
		}
		stream.writeInt(len);
	}
};

class NetPacket
{
	private m_header: package_header;
	private m_header_buffer: NetBuffer;
	private m_body_buffer: NetBuffer;
	public m_head_transfered: int;
	public m_body_transfered: int;

	public constructor( is_inner: boolean )
	{
		this.m_header = new package_header(is_inner);
		this.m_header_buffer = new NetBuffer();
		this.m_body_buffer = new NetBuffer();
		this.m_head_transfered = 0;
		this.m_body_transfered = 0;
	}

	public get IsInner(): boolean
	{
		return this.m_header.is_inner;
	}
	public set IsInner(value: boolean)
	{
		this.m_header.is_inner = value;
	}

	public get headBuffer(): NetBuffer
	{
		return this.m_header_buffer;
	}
	public get bodyBuffer(): NetBuffer
	{
		return this.m_body_buffer;
	}

	public get payloadLength(): int
	{
		return this.m_header.body_length;
	}

	public get isCompleted(): boolean
	{
		return this.m_head_transfered > 0 && this.m_body_transfered > 0 && this.m_body_transfered == this.m_header.body_length;
	}

	public clear() : void
	{
		this.m_header.body_length = 0;
		this.m_header_buffer.clear();
		this.m_body_buffer.clear();
		this.m_head_transfered = 0;
		this.m_body_transfered = 0;
	}

	public decode(): boolean
	{
		this.m_header.Load(this.m_header_buffer);
		return true;
	}

	public encode(): void
	{
		this.m_header.body_length = this.m_body_buffer.length;
		this.m_header.Save(this.m_header_buffer);
	}
};
