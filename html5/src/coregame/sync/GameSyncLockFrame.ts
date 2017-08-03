class GameSyncLockFrame extends GameSync
{
	private m_call_center: CallCenter;
	private m_first_sync: boolean = false;

	public constructor()
	{
		super();
	}

	public Init()
	{
		this.m_call_center = GameGlobal.GameLogic.Game;
	}

	public SendCommnads(cmds : Array<Command>)
	{
		let msg: InGameSyncCommands = new InGameSyncCommands();
		msg.commands = cmds;
		msg.ToBuff();
		this.m_call_center.SendMessageOnly(msg);
		if ( !this.m_first_sync )
		{
			this.m_first_sync = true;
			this.m_timer.Update();
			egret.log("first sync, frame:" + this.m_timer.CurrFrame + " " + egret.getTimer());
		}
	}

	public HandleCommnads(frame: int, cmds : Array<Command>)
	{
		let info = new FrameInfo();
		info.frame = frame;
		info.commands = cmds;
		this.m_frames.push(info);
	}
}