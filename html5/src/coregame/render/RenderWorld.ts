class RenderWorld extends ComposableObject<RenderWorld>
{
	protected m_loader : ResourceLoader = new ResourceLoader;
	public m_render2D_root: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
	
	public m_joystick: Joystick;


	protected m_cmd_sync : ICommnadSync = null;
    protected m_logic_world : LogicWorld = null;

	public m_render_entity_manager : RenderEntityManager = null;		//TODO ： 改成world组件
	protected m_render_message_processor: IRenderMessageProcessor;

	private m_cmds: Array<Command> = new Array<Command>();


	public constructor()
	{
		super();
	}

	public GetLogicWorld() : LogicWorld
	{
		return this.m_logic_world;
	}

	public PushLocalCommand(cmd : Command)
	{
		this.m_cmds.push(cmd);
	}

	public PopCommands(): Array<Command>
	{
		let cmds = this.m_cmds;
		if(this.m_cmds.length > 0)
		{
			this.m_cmds = new Array<Command>();
		}
		return cmds;
	}

	public Init(logic_world : LogicWorld, cmdSync : ICommnadSync)
	{
		this.m_logic_world = logic_world;
		this.m_cmd_sync = cmdSync;
		this.m_render_entity_manager = new RenderEntityManager(logic_world, this);
		this.m_render_message_processor = new BubbleRenderMessageProcessor(this);

		this.AddComponent(ViewComponent);
	}

	public get Loader(): ResourceLoader
	{
		return this.m_loader;
	}

	public Update()
	{
		this.ProcessRenderMessages();
		this.UpdateComponents();
		this.m_render_entity_manager.Update();
	}

	protected ProcessRenderMessages()
	{
		let msglist = this.m_logic_world.GetAllRenderMessages();
		if (msglist.length == 0)
			return;
		for (let msg of msglist) {
			this.m_render_message_processor.Process(msg);
		}
		this.m_logic_world.ClearRenderMessages();
	}

	public async Prepare()
	{
        let scene3D: egret3d.Scene3D = await this.m_loader.LoadScene("zhadanren");
		let role1: egret3d.Role = await this.m_loader.CreateRole("test_01");
		let scene_camera_3d: egret3d.Camera3D = <egret3d.Camera3D>scene3D.getChildAt(1);
		
		GameGlobal.Stage.addChild(this.m_render2D_root);

		//Initialize
		this.Initialize(BubbleSetting.RenderWorldCreationContext(this));

		
		//TODO：joystick 和 view 都用组件的标准形式初始化
		this.m_joystick = new Joystick();
		this.m_joystick.Init();
		this.m_render2D_root.addChild(this.m_joystick);
		this.m_joystick.x = this.m_joystick.width / 2;
		this.m_joystick.y = GameGlobal.Stage.stageHeight - this.m_joystick.height / 2;

		let view_cmp = this.GetComponent(ViewComponent);
		view_cmp.Scene = scene3D;
		view_cmp.Camera = scene_camera_3d;
	}


	public Start()
	{
		
	}
}