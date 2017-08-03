class RenderEntityComponent extends GameComponent<RenderEntity>
{
    protected m_logicEntity : Entity = null;

    public GetOwnerPlayerID() : int
    {
        return 0;
    }

    public get LogicEntityID() : int
    {
        return this.m_owner.LogicEntityID;
    }

    public get LogicEntity() : Entity
    {
        return this.m_owner.LogicEntity;
    }

    public GetLogicWorld() : LogicWorld
    {
        return this.m_owner.GetLogicWorld();
    }

    public GetRenderWorld() : RenderWorld
    {
        return this.m_owner.GetRenderWorld();
    }

    public PostInitializeComponent() 
	{
		super.PostInitializeComponent();

        // IRenderNeedUpdateEveryFrame iupdate = this instanceof IRenderNeedUpdateEveryFrame;
        // if (iupdate != null)
        //     GetRenderWorld().GetComponent<RenderWorldEveryFrameUpdater>().Register(iupdate);
	}

    public Destruct() 
	{
        // IRenderNeedUpdateEveryFrame iupdate = this as IRenderNeedUpdateEveryFrame;
        // if (iupdate != null)
        //     GetRenderWorld().GetComponent<RenderWorldEveryFrameUpdater>().Unregister(iupdate);
        this.OnDestruct();
	}

    protected OnDestruct() : void
    {

    }
}
