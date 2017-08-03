class GameSyncLocal extends GameSync
{
	public constructor()
	{
		super();
	}

	public SendCommnads(cmds : Array<Command>)
	{
		let curr_frame = this.m_timer.CurrFrame + 1;
		let frame: FrameInfo = null;
		if(this.m_frames.length > 0 && this.m_frames[0].frame == curr_frame)
		{
			frame = this.m_frames[0];
		}
		else
		{
			frame = new FrameInfo();
			frame.frame = this.m_timer.CurrFrame + 1;
			this.m_frames.push(frame);
		}
		frame.commands = frame.commands.concat(cmds);
	}
}