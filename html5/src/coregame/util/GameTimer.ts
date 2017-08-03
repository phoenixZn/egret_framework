class GameTimer
{
	private m_start_time : long;
	private m_curr_frame : long;
	private m_last_frame : long;
	private m_latency: int = 0;

	public get CurrFrame() : long
	{
		return this.m_curr_frame;
	}

	public get LastFrame() : long
	{
		return this.m_last_frame;
	}

	public Start(latency: int)
	{
		this.m_curr_frame = this.m_last_frame = 1;
		this.m_start_time = egret.getTimer();
		this.m_latency = latency;
		let delay = 100 - this.m_latency;
		if ( delay < 0 ) delay = 0;
		this.m_start_time += delay;
		egret.log("start timer " + egret.getTimer());
	}

	public Update()
	{
		let curr_time = egret.getTimer();
		let elapsed_time = curr_time - this.m_start_time;
		this.m_last_frame = this.m_curr_frame;
		let curr_frame = Math.ceil(elapsed_time / GameConst.LogicFrameLength) + 1;
		if ( curr_frame != this.m_curr_frame )
		{
			this.m_curr_frame = curr_frame;
			//egret.log("local turn changed to " + curr_frame);
			//egret.log("update timer " + egret.getTimer());
		}
	}
}