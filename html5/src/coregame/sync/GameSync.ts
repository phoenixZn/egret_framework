class FrameInfo
{
	public frame : int = -1;
	public commands : Array<Command> = new Array<Command>();
}

//暂时局内持有该接口，发送操作命令
interface ICommnadSync
{
	SendCommnad(cmd : Command);
}

class GameSync implements ICommnadSync
{
	protected m_frames : Array<FrameInfo> = new Array<FrameInfo>();
	protected m_timer : GameTimer = new GameTimer();
	protected m_curr_frame : int = 0;

	public constructor()
	{
	}

	public Init()
	{
		
	}

	public async Prepare()
	{
		
	}

	public Start(latency: int)
	{
		this.m_timer.Start(latency);
	}

	// ICommnadSync 
	public SendCommnad(cmd : Command)
	{

	}

	public SendCommnads(cmds : Array<Command>)
	{

	}

	public HandleCommnads(frame: int, cmd : Array<Command>)
	{

	}

	public Update()
	{
		this.m_timer.Update();
	}

	public get CurrFrame() : number
	{
		return this.m_curr_frame;
	}

	public PopFrame() : FrameInfo
	{
		if(this.m_frames.length > 0)
		{
			let frame = this.m_timer.CurrFrame;
			if (this.m_frames[0].frame <= frame) {
				this.m_curr_frame = this.m_frames[0].frame;
				return this.m_frames.shift();
			}
			else
			{
				egret.log("wait..." + (this.m_frames[0].frame - frame) + "..." + this.m_frames.length);
			}
		}
		return null;
	}
}