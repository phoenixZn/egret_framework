abstract class GameModule
{
	private m_callcenter: CallCenter;
	private m_module_manager: GameModuleManager;

	public constructor()
	{
	}

	protected SendMessageOnly(msg: InGameMessage)
	{
		this.m_callcenter.SendMessageOnly(msg);
	}

	protected async SendMessage(req: RequestMessage) : Promise<ReplyInfo>
	{
		return await this.m_callcenter.Request(req);
	}

	public Init()
	{
	}

	public Destroy()
	{
		
	}

	public SetAddress(ip: string, port: short, proxy: string)
	{
		this.m_callcenter.SetAddress(ip, port, proxy);
	}

	public set ModuleManager(mng: GameModuleManager)
	{
		this.m_module_manager = mng;
	}

	public set CallCenter(cc: CallCenter)
	{
		this.m_callcenter = cc;
	}

	public get CallCenter()
	{
		return this.m_callcenter;
	}

	protected GetModule<T extends GameModule>(t: {new(): T}) : T
	{
		return this.m_module_manager.GetModule(t);
	}
}

enum ModuleType
{
	Game,
	Bulletin,
	Match,
}

class GameModuleManager
{
	private m_modules: Map<any, GameModule> = new Map<any, GameModule>();
	private m_module_fac: ModuleFactory = new ModuleFactory();

	public Init()
	{
		this.m_module_fac.Init(this);
	}

	public AddModule<T extends GameModule>(t: {new(): T}, type: ModuleType)
	{
		let module: T = new t();
		module.ModuleManager = this;

		if(type == ModuleType.Game)
		{
			module.CallCenter = GameGlobal.GameLogic.Game;
		}
		else if(type == ModuleType.Bulletin)
		{
			module.CallCenter = GameGlobal.GameLogic.Bulletin;
		}
		else if(type == ModuleType.Match)
		{
			module.CallCenter = GameGlobal.GameLogic.Match;
		}
		module.Init();
		this.m_modules.set(t.prototype, module);
	}

	public GetModule<T extends GameModule>(t: {new(): T}): T
	{
		return <T>this.m_modules.get(t.prototype);
	}
}