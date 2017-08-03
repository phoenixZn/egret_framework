class FsmStateGenData
{
    public stateID: int;
    public classType: any;
}

class FSMComponent extends EntityComponent
{
    protected m_fsm: FSMMachine<Entity> = null;

    public get CurStateID(): int
	{
		return this.m_fsm.mCurrentState.StateID;
	}

	public PreInitialize(id : int, owner: Entity, variables: Map<string, any>) 
	{
		super.PreInitialize(id, owner, variables);
        let fsmID = <int>variables.get(EntityConstant.ECVK_FsmID);
        let stateList = <Array<FsmStateGenData>>variables.get(EntityConstant.ECVK_FsmStateList);
        this.m_fsm = new FSMMachine<Entity>(fsmID);

        for (let data of stateList)
        {
            this.AddState(data.classType, data.stateID);
        }
        this.m_fsm.Init(owner);

        let defaultID = <int>variables.get(EntityConstant.ECVK_FsmDefaultState);
        this.m_fsm.SetDefaultState(defaultID);

	}

    protected AddState<T extends FSMState<Entity>>(stateClass: {new(id:int): T}, stateID: int)
	{
		let state : T = new stateClass(stateID);
        this.m_fsm.AddState(state);
	}

    // public InitializeComponent()
	// {
    //     super.InitializeComponent();
	// }

	public PostInitializeComponent() 
	{
		super.PostInitializeComponent();
        //this.m_fsm.Reset();
	}

    public Update()
    {
        this.m_fsm.Update(GameConst.LogicFrameLength);
    }

	protected OnDestruct() : void
    {
    }

}