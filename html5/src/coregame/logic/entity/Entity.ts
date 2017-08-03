class Entity extends ComposableObject<Entity>
{
    protected m_logic_world: LogicWorld;
	public constructor()
	{
        super();
        this.m_object = this;
	}

    public GetLogicWorld() : LogicWorld
    {
        return this.m_logic_world;
    }

    protected OnDestruct() : void
    {
        super.OnDestruct();
    }

    protected PreInitialize(context : ObjectCreationContext)
    {
        super.PreInitialize(context);
        this.m_logic_world = context.m_custom_datas.get("LogicWorld");
    }

    protected IsSuitableComponent(component_type_id : int) : boolean
    {
        return ComponentTypeRegistry.IsLogicEntityComponent(component_type_id);
    }

}