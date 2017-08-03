class BubbleRenderMessageProcessor implements IRenderMessageProcessor
{
    protected m_render_world: RenderWorld;
    protected m_logic_world: LogicWorld;
    protected m_render_entity_manager: RenderEntityManager;

    public constructor(render_world : RenderWorld)
    {
        this.m_render_world = render_world;
        this.m_logic_world = render_world.GetLogicWorld();
        this.m_render_entity_manager = render_world.m_render_entity_manager;
    }

    public Destruct()
    {
        this.m_render_world = null;
        this.m_logic_world = null;
        this.m_render_entity_manager = null;
    }

    public Process(msg : RenderMessage): void
    {
        switch (msg.Type)
        {
            case RenderMessageType.CreateEntity:
                this.ProcessRenderMessage_CreateEntity(msg.EntityID);
                break;
            case RenderMessageType.DestroyEntity:
                this.ProcessRenderMessage_DestroyEntity(msg.EntityID);
                break;
            default:
                break;
        }
    }

    private ProcessRenderMessage_CreateEntity(entity_id : int)
    {
        let entity = this.m_logic_world.GetEntityManager().GetObject(entity_id);
        if (entity === undefined)
            return;
        this.m_render_entity_manager.CreateObject(entity.GetCreationContext());
    }

    private ProcessRenderMessage_DestroyEntity(entity_id : int)
    {
        this.m_render_entity_manager.DestroyObject(entity_id);
    }
}