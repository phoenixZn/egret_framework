class LogicWorld extends ComposableObject<LogicWorld> implements IRenderMessageGenerator
{
	protected m_entity_manager: EntityManager;
	protected m_command_handler: ICommandHandler;

	protected m_render_messages: Array<RenderMessage>;
	protected m_world_context: WorldCreationContext;

	public constructor()
	{
		super();
		this.m_object = this;

		this.m_render_messages = new Array<RenderMessage>();
		this.m_entity_manager = new EntityManager(this);
		this.m_command_handler = new BubbleCommandHandler(this);
		
	}

	//////////////////////////////////////////////////////////////////////////////////
	// ComposableObject
	protected PreInitialize(context : ObjectCreationContext)
    {
        super.PreInitialize(context);

		//this.m_command_handler = <ICommandHandler>worldcontext.m_custom_datas.get("CommandHandler");
    }

	public Init(worldcontext : WorldCreationContext)
	{
		this.m_world_context = worldcontext;
		this.AddComponent(GameModeComponent);
	}

	public Update()
	{
		this.UpdateComponents();
		this.m_entity_manager.Update();
	}

	public HandleCommands(cmds : Array<Command>)
	{
		cmds.forEach(element => {
			this.m_command_handler.Handle(element);
		});
	}

	public async Prepare()
	{
		for (let context of this.m_world_context.m_entities)
		{
			context.m_custom_datas.set("LogicWorld", this);
			this.m_entity_manager.CreateObject(context);
		}
	}

	public Start()
	{

	}

	public GetEntityManager() : EntityManager
	{
		return this.m_entity_manager;
	}

	public GetWorldCreationContext() : WorldCreationContext
	{
		return this.m_world_context;
	}

	///////////////////////////////////////////////////////////////////////////
	// IRenderMessageGenerator
	public CanGenerateRenderMessage() : boolean 
	{
		return true;
	}
    public AddRenderMessage(render_message : RenderMessage) : void
	{
		this.m_render_messages.push(render_message);
	}
    public AddSimpleRenderMessage(type : int, entity_id : int, simple_data : int) : void
	{
		// SimpleRenderMessage render_message = RenderMessage.Create<SimpleRenderMessage>();
		// render_message.Construct(type, entity_id, simple_data);
		// m_render_messages.Add(render_message);
		this.m_render_messages.push(new SimpleRenderMessage(type, entity_id, simple_data));
	}
    public GetAllRenderMessages() : Array<RenderMessage>
	{
		return this.m_render_messages;
	}
    public ClearRenderMessages() : void
	{
		this.m_render_messages.splice(0);
	}


}