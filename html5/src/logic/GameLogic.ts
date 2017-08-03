class GameLogic
{
	private m_module_manager: GameModuleManager = new GameModuleManager();

	private m_bulletin: CallCenter = new CallCenter();
	private m_game: CallCenter = new CallCenter();
	private m_match: CallCenter = new CallCenter();
	private m_account = "1234";

	public constructor()
	{
	}

	public Init()
	{
		this.m_module_manager.Init();
	}

	public Update()
	{
		this.m_bulletin.Update();
		this.m_game.Update();
		this.m_match.Update();
	}

	public get Bulletin()
	{
		return this.m_bulletin;
	}

	public get Game()
	{
		return this.m_game;
	}

	public get Match()
	{
		return this.m_match;
	}

	public get ModuleManager()
	{
		return this.m_module_manager;
	}

	public get Account()
	{
		return this.m_account;
	}

	public set Account( value : string )
	{
		this.m_account = value;
	}
}