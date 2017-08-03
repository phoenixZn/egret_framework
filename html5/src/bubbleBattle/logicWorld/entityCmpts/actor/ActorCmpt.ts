class ActorCmpt extends EntityComponent
{
    protected m_move_cmpt: ActorMoveCtrlCmpt = null;

	public PostInitializeComponent() 
	{
		super.PostInitializeComponent();

		this.m_move_cmpt = this.Owner.GetComponent(ActorMoveCtrlCmpt);
	}

	protected OnDestruct() : void
    {
    }

	public HandleOperation(op:Operation)
	{
		if (op.opType == OperationType.Op_JoystackMove)
		{
			this.m_move_cmpt.SetMoveDir(new egret3d.Vector3D(op.x, 0, -op.y));
			this.m_move_cmpt.m_is_stop = false;
		}
		else if (op.opType == OperationType.Op_JoystackRelease)
		{
			this.m_move_cmpt.m_is_stop = true;
		}
	}
}