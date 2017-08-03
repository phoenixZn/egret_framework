class ActorDieState extends ActorState
{
    public constructor(type : int)
    {
        super(type);
    }

    public Enter()
    {
        egret.log("FSMState Enter: " + this.StateID);
        super.Enter();
    }
    
    public Exit()
    {
        egret.log("FSMState Exit: " + this.StateID);
        super.Exit();
    }


    public CheckTransitions() : int
    { 
        if (this.m_time_acc >= 5000)
            return ActorStateID.Idle;
        return super.CheckTransitions();
    }
}