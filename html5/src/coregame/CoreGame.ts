enum CoreGameStatus
{
	None,
	Loading,
	Running,
	GameOver,
}

class CoreGame
{
	private m_coregame_factory : ICoreGameFactory;

	private m_logic : LogicWorld;
	private m_render : RenderWorld;
	private m_sync : GameSync;
	private m_status : CoreGameStatus = CoreGameStatus.None;
	private m_recv_count : int = 0;
	private m_send_count : int = 0;
	private m_last_tick : int = egret.getTimer();

	public get Logic(): LogicWorld
	{
		return this.m_logic;
	}

	public get Render(): RenderWorld
	{
		return this.m_render;
	}

	public get Sync(): GameSync
	{
		return this.m_sync;
	}

	protected CreateCoreGameFactory() : ICoreGameFactory
	{
		return new BubbleCoreGameFactory();
	}

	public Init(init_info : CoreGameInitInfo)
	{
		egret.log("CoreGame.Init()");

		this.m_coregame_factory = this.CreateCoreGameFactory();

		this.m_coregame_factory.RegisterComponents(); 
		this.m_coregame_factory.RegisterCommands();
		this.m_coregame_factory.RegisterRenderMessages();
		
		//组件初始化
		this.m_logic = this.m_coregame_factory.CreateLogicWorld();
		this.m_render = this.m_coregame_factory.CreateRenderWorld();
		//this.m_sync = new GameSyncLocal();
		this.m_sync = new GameSyncLockFrame();

		let worldcontext = this.m_coregame_factory.CreateWorldCreationContext(init_info);
		this.m_logic.Init(worldcontext);
		this.m_render.Init(this.m_logic, this.m_sync);
		this.m_sync.Init();	
	}

	public async Prepare()
	{
		//资源装载
		this.m_status = CoreGameStatus.Loading;

		egret.log("m_logic.Prepare()");
		await this.m_logic.Prepare();
		egret.log("m_render.Prepare()");
		await this.m_render.Prepare();
		egret.log("m_sync.Prepare()");
		await this.m_sync.Prepare();
		egret.log("CoreGame ready");
	}

	public Start(latency: int)
	{
		egret.log("CoreGame.Start()");
		this.m_sync.Start(latency);
		this.m_logic.Start();
		this.m_render.Start();

		this.m_status = CoreGameStatus.Running;
	}

	public Update()
	{
		if(this.m_status == CoreGameStatus.Running)
		{
			this.m_sync.Update();
			let frame: FrameInfo = this.m_sync.PopFrame();
			while(frame != null)
			{
				this.m_recv_count += frame.commands.length;
				this.m_logic.HandleCommands(frame.commands);
				this.m_logic.Update();
				for (let cmd of frame.commands) {
					let op = cmd as OperationCommand;
					egret.log("HandleCommands, x:" + op.m_opX + ", y:" + op.m_opY);
				}
				frame = this.m_sync.PopFrame();
			}
			
			this.m_render.Update();
			let cmds = this.m_render.PopCommands();
			this.m_sync.SendCommnads(cmds);
			this.m_send_count += cmds.length;

			let tick = egret.getTimer();
			if (tick - this.m_last_tick > 1000) {
				//egret.log("cmd processed: " + this.m_recv_count + "," + this.m_send_count + "," + (this.m_send_count - this.m_recv_count));
				this.m_last_tick = tick;
			}
		}
	}

	public Running()
	{
		return this.m_status == CoreGameStatus.Running;
	}
}
