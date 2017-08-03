//TODO ： 改成world组件
class RenderEntityManager extends ObjectManager<RenderEntity>
{
    protected m_render_world : RenderWorld;

    public constructor(logic_world : LogicWorld, render_world : RenderWorld)
    {
        super(logic_world, 100);
        this.m_render_world = render_world;
    }

    public Destruct() : void
    {
        super.Destruct();
        this.m_render_world = null;
    }

    protected CreateObjectInstance(context : ObjectCreationContext) : RenderEntity
    {
        return new RenderEntity(this.m_render_world);
    }


    protected AfterObjectCreated(entity : RenderEntity)
    {
        super.AfterObjectCreated(entity);
    }

    protected PreDestroyObject(entity : RenderEntity)
    {
        super.PreDestroyObject(entity);
    }
}
