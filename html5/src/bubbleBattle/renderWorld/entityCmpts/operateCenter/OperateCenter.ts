
//把摇杆、虚拟摇杆、键盘、等操作状态转变为 原始操作信息传出去
class OperateCenter
{
    protected m_OperationHandlers : Array<IOperationHandler> = new Array<IOperationHandler>();
    protected m_Operates : Array<Operation> = new Array<Operation>();

    protected mLastJoystackDir : egret.Point = new egret.Point(0, 0);
    protected mLastJoystackDirIndex : int = -1;

    protected mJoystack : IJoystack = null;
    public Init(joystack : IJoystack)
    {
        this.mJoystack = joystack;
    }

    public Update()
    {
        this.CheckOperate();
        this.HandleOperate();
    }

    protected CheckOperate()
    {
        this.m_Operates.splice(0);
        this.CheckJoystack();
    }

    protected CheckJoystack()
    {
        if (this.mJoystack == null)
            return;

        let dir : egret.Point = this.mJoystack.CurDir();
        let dir_index : int = Dir8Converter.GetDirIndex(dir);

        //if (dir_index != this.mLastJoystackDirIndex)
        if (true)
        {
            //if (dir_index == -1)
            if (dir.length < 0.1)
            {
                let op = new Operation();
                op.opType = OperationType.Op_JoystackRelease;
                op.x = this.mLastJoystackDir.x;
                op.y = this.mLastJoystackDir.y;
                this.m_Operates.push(op);
            }
            else
            {
                let op1 = new Operation();
                op1.opType = OperationType.Op_JoystackMove;
                op1.x = dir.x;
                op1.y = dir.y;
                this.m_Operates.push(op1);
            }
        }
        this.mLastJoystackDir = dir;
        this.mLastJoystackDirIndex = dir_index;
    }

    protected HandleOperate()
    {
        for (let op of this.m_Operates)
        {
            for (let oph of this.m_OperationHandlers)
            {
                oph.HandleOperation(op);
            }
        }
    }

    public Reg(OpHandler : IOperationHandler)
    {
        this.m_OperationHandlers.push(OpHandler);
    }

    public UnReg(OpHandler : IOperationHandler)
    {
        let findindex : int = -1;
        for (var i = 0; i < this.m_OperationHandlers.length; i++) 
        {
            if (this.m_OperationHandlers[i] == OpHandler)
            {
                findindex = i;
                break;
            }
        }
        if (findindex != -1)
        {
            this.m_OperationHandlers.splice(findindex, 1);
        }
    }


}