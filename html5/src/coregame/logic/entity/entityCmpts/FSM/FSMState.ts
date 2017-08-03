class FSMState<TOwner>
{
    //data
    protected m_stateID : int = -1;
    protected m_owner : TOwner = null;
    protected m_time_acc : int = 0;

    //constructor/functions
    public constructor(type : int)
    {
        this.m_stateID = type;
    }

    public Init(owner : TOwner)
    {
        this.m_owner = owner;
    }

    public get StateID()
    {
        return this.m_stateID;
    }

    public Enter()
    {
        this.m_time_acc = 0;
        //LogHelper.LogInfo(Constant.LogAI, "FSMState Enter: " + mType);
    }
    public Exit()
    {
        //LogHelper.LogInfo(Constant.LogAI, "FSMState Exit: " + mType);
    }

    public Update(dt : int) 
    {
        this.m_time_acc += dt;
    }

    public CheckTransitions() : int
    { 
        return this.m_stateID;
    }

};