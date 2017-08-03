class PositionComponent extends EntityComponent
{
    protected m_pos: egret3d.Vector3D = new egret3d.Vector3D();

    public get Pos(): egret3d.Vector3D
	{
		return this.m_pos;
	}

    public set Pos(pos: egret3d.Vector3D)
    {
        this.m_pos = pos;
    }

	public PostInitializeComponent() 
	{
		super.PostInitializeComponent();
	}

	protected OnDestruct() : void
    {
    }

}