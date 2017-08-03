class ActorState extends FSMState<Entity>
{
    public constructor(type : int)
    {
        super(type);
    }

    // public Init(owner : Entity)
    // {
    //     super.Init(owner);
    // }

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

    // public Update(dt : int) 
    // {
    //     super.Update(dt);
    // }

    // public CheckTransitions() : int
    // { 
    //     return super.CheckTransitions();
    // }
}