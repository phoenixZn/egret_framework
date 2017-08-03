class ActorMoveCtrlCmpt extends EntityComponent
{
    protected m_moveDir: egret3d.Vector3D = null;
    public m_is_stop: boolean = true;

    protected m_pos_cmpt: PositionComponent = null;

	public PostInitializeComponent() 
	{
		super.PostInitializeComponent();

        this.m_pos_cmpt = this.Owner.GetComponent(PositionComponent);
	}

	protected OnDestruct() : void
    {
    }

    public SetMoveDir(moveDir: egret3d.Vector3D)
    {
        this.m_moveDir = moveDir;
    }

    public GetMoveDir()
    {
        return this.m_moveDir;
    }

    public IsStop() : boolean
    {
        return this.m_is_stop;
    }

    public Update()
    {
        if (this.m_is_stop)
            return;
		let z = this.m_pos_cmpt.Pos.z + this.m_moveDir.z * 5;
        let x = this.m_pos_cmpt.Pos.x + this.m_moveDir.x * 5;
        this.m_pos_cmpt.Pos.z = z;
        this.m_pos_cmpt.Pos.x = x;
    }
     
}