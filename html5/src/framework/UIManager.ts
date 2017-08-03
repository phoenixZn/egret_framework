abstract class UIBase extends eui.Component
{
	private m_name: UIName;

	public get Name(): UIName
	{
		return this.m_name;
	}

	public set Name(name : UIName)
	{
		this.m_name = name;
	}

	public EnterUI()
	{

	}

	public LeaveUI()
	{

	}

	public async LoadData()
	{

	}
}

class UIManager
{
	private m_ui_root: eui.UILayer = new eui.UILayer();
	private m_ui_fac: UIFactory = new UIFactory();
	private m_curr_ui: Array<UIBase> = new Array<UIBase>();

	public get UIRoot(): eui.UILayer
	{
		return this.m_ui_root;
	}

	public Init()
	{
		let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		GameGlobal.Stage.addChild(this.UIRoot);

		this.m_ui_fac.Init();
	}

	public async Prepare()
	{
		await RES.loadGroup("eui");
		await this.LoadTheme();	
	}

	public async LoadTheme(): Promise<void>
	{
		let promise = new Promise<void>((resolve) =>
		{
			let theme = new eui.Theme("resource/default.thm.json", GameGlobal.Stage);
			theme.once(eui.UIEvent.COMPLETE, function(){resolve();}, this);
		}
		)
		return promise;
	}

	public ShowUI(name : UIName)
	{
		let ui = this.m_ui_fac.Create(name);
		ui.Name = name;
		ui.EnterUI();
		this.m_curr_ui.push(ui);
		this.m_ui_root.addChild(ui);
		ui.LoadData();
	}

	public HideUI(name: UIName)
	{
		for(let i = 0; i < this.m_curr_ui.length; i++)
		{
			let ui = this.m_curr_ui[i];
			if(ui.Name == name)
			{
				ui.LeaveUI();
				this.m_ui_root.removeChild(ui);
				this.m_curr_ui.splice(i, 1);
				break;
			}
		}
	}

	public HideAll()
	{
		for(let i = 0; i < this.m_curr_ui.length; i++)
		{
			let ui = this.m_curr_ui[i];
			ui.LeaveUI();
			this.m_ui_root.removeChild(ui);
		}
		this.m_curr_ui = new Array<UIBase>();
	}

	public SwitchUI(name: UIName)
	{
		this.HideAll();
		this.ShowUI(name);
	}
}