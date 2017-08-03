class UILocalCtrlCmpt extends RenderEntityComponent implements IOperationHandler
{
    private mUIOperateCenter : OperateCenter = new OperateCenter();
    public get UIOperateCenter() : OperateCenter
    {
        return this.mUIOperateCenter;
    }

    public PostInitializeComponent() 
	{
		super.PostInitializeComponent();
        this.SetUILocal();
	}

    private SetUILocal()
    {
        let render_world = this.Owner.GetRenderWorld();
        this.mUIOperateCenter.Init(render_world.m_joystick);
        this.mUIOperateCenter.Reg(this);
    }

    protected OnDestruct() : void
    {
        super.OnDestruct();
        this.mUIOperateCenter.UnReg(this);
    }

    public HandleOperation(op : Operation) : boolean
    {
        let cmd = new OperationCommand();
        cmd.m_entity_id = this.LogicEntityID;
        cmd.m_opType = op.opType;
        cmd.m_opX = op.x;
        cmd.m_opY = op.y;
        //egret.log("PushLocalCommand type:" + op.opType + ", x:", op.x + ", y:", op.y);
        this.Owner.GetRenderWorld().PushLocalCommand(cmd);
        return true;
    }


    public Update()
    {
        this.mUIOperateCenter.Update();
    }

}