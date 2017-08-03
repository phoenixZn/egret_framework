
class EntityManager extends ObjectManager<Entity>
{
    public constructor(logic_world : LogicWorld)
    {
        super(logic_world, 100);
    }

    protected CreateObjectInstance(context : ObjectCreationContext) : Entity
    {
        return new Entity();
    }

    protected AfterObjectCreated(entity : Entity)
    {
        super.AfterObjectCreated(entity);
        // let position_component = entity.GetComponent(PositionComponent);
        // if (position_component === undefined)
        //     return;
        this.m_logic_world.AddSimpleRenderMessage(RenderMessageType.CreateEntity, entity.ID, 0);
    }

    protected PreDestroyObject(entity : Entity)
    {
        super.PreDestroyObject(entity);
        this.m_logic_world.AddSimpleRenderMessage(RenderMessageType.DestroyEntity, entity.ID, 0);
    }
}