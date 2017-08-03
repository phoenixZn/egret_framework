class GameGlobal
{
	private m_stage: egret.Stage;
	private m_stage3d: egret3d.Stage3D;
	private m_core_game : CoreGame;
	private m_audio_manager : AudioManager = new AudioManager;
	private m_ui_manager: UIManager = new UIManager;
	private m_game_logic: GameLogic = new GameLogic;
	private m_state_manager: StateManager = new StateManager;

	private static s_instance : GameGlobal = new GameGlobal;

	public static get Instance() : GameGlobal
	{
		return GameGlobal.s_instance;
	}

	public static get Stage() : egret.Stage
	{
		return GameGlobal.Instance.m_stage;
	}
	public static get Stage3D() : egret3d.Stage3D
	{
		return GameGlobal.Instance.m_stage3d;
	}

	public static get CoreGame() : CoreGame
	{
		return GameGlobal.Instance.m_core_game;
	}

	public static set CoreGame(cg: CoreGame)
	{
		GameGlobal.Instance.m_core_game = cg;
	}

	public static get AudioManager() : AudioManager
	{
		return GameGlobal.Instance.m_audio_manager;
	}

	public static get UIManager(): UIManager
	{
		return GameGlobal.Instance.m_ui_manager;
	}

	public static get GameLogic(): GameLogic
	{
		return GameGlobal.Instance.m_game_logic;
	}

	public static get StateManager(): StateManager
	{
		return GameGlobal.Instance.m_state_manager;
	}

	private constructor()
	{
	}

	public Init(stage : egret.Stage, stage3d: egret3d.Stage3D)
	{
		this.m_stage  = stage;
		this.m_stage3d = stage3d;

		this.m_game_logic.Init();
		this.m_audio_manager.Init();
		this.m_ui_manager.Init();
		this.m_state_manager.Init();

		// this.m_core_game = new CoreGame();
		// this.m_core_game.Init();
	}

	public async Prepare()
	{
		// await this.m_core_game.Prepare();
		await this.m_ui_manager.Prepare();
		await this.m_audio_manager.LoadBGM("sound/music_01.mp3");

	}

	public Start()
	{
		this.m_stage.addEventListener(egret.Event.ENTER_FRAME, this.FrameUpdate, this);
		this.m_ui_manager.SwitchUI(UIName.Login);

		// this.m_core_game.Start();
		
	}

	private FrameUpdate()
	{
		this.m_game_logic.Update();
		
		if(this.m_core_game != null)
		{
			this.m_core_game.Update();
		}
	}

}