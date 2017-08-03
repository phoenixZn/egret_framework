class RenderEntity extends ComposableObject<RenderEntity>
{
    m_render_world : RenderWorld;
    m_logicEntity : Entity;
    m_hide_reference_count : int = 0;

    public constructor(render_world : RenderWorld)
	{
        super();
        this.m_object = this;
        this.m_render_world = render_world;
	}

    protected OnDestruct() : void
    {
        super.OnDestruct();
        this.m_render_world = null;
        this.m_logicEntity = null;
    }

    public get LogicEntityID() : int
    {
        return this.m_logicEntity.ID;
    }

    public get LogicEntity() : Entity
    {
        return this.m_logicEntity;
    }

    public GetRenderWorld() : RenderWorld
    {
        return this.m_render_world;
    }

    public GetLogicWorld() : LogicWorld
    {
        return this.m_logicEntity.GetLogicWorld();
    }

    protected PreInitialize(context : ObjectCreationContext)
    {
        super.PreInitialize(context);
        let lw = context.m_custom_datas.get("LogicWorld");
        this.m_logicEntity = lw.GetEntityManager().GetObject(this.m_context.m_object_id);
    }

    protected IsSuitableComponent(component_type_id : int) : boolean
    {
        return ComponentTypeRegistry.IsRenderEntityComponent(component_type_id);
    }



}