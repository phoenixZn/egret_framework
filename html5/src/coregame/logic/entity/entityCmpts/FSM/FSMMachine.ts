
class FSMMachine<TOwner> extends FSMState<TOwner>
{
    private mStates : Array<FSMState<TOwner>>  = new Array<FSMState<TOwner>>();
    private mDefaultID : int = -1;
    private mGoalID : int = -1;
    public mCurrentState : FSMState<TOwner> = null;

    public constructor(stateID : int)
    {
        super(stateID);
        this.mCurrentState = null;
        this.mDefaultID = -1;
        this.mGoalID = -1;
    }

    public Update(dt : int)
    {
        super.Update(dt);

        if (this.mStates.length == 0)
            return;

        if (this.mCurrentState == null)
            this.mCurrentState = this.FindState(this.mDefaultID);
        if (this.mCurrentState == null)
            return;

        //检查状态转移
        let oldStateID = this.mCurrentState.StateID;
        let nextStateID = this.mCurrentState.CheckTransitions();

        //如果有目标转移状态
        if (nextStateID != oldStateID)
        {
            this.ChangeState(nextStateID);
        }
        this.mCurrentState.Update(dt);

    }

    public AddState(state : FSMState<TOwner>)
    {
        this.mStates.push(state);
    }

    private FindState(stateID: int): FSMState<TOwner>
    {
        if (this.mStates.length == 0)
            return null;

        for (let i = 0; i < this.mStates.length; i++)
        {
            if (this.mStates[i].StateID == stateID)
            {
                return this.mStates[i];
            }
        }
        return null;
    }

    public Reset()
    {
        this.Exit();

        if (this.mCurrentState != null)
            this.mCurrentState.Exit();
        this.mCurrentState = this.FindState(this.mDefaultID);

        for (let i = 0; i < this.mStates.length; i++)
        {
            this.mStates[i].Init(this.m_owner);
        }

        if (this.mCurrentState != null)
            this.mCurrentState.Enter();

    }

    public SetDefaultState(defaultState : int) 
    {
        this.mDefaultID = defaultState;
    }

    public ChangeState(stateID: int)
    {
        if (this.mCurrentState != null)
        {
            this.mCurrentState.Exit();
        }
        let goalState = this.FindState(stateID);
        if (goalState != null)
        {
            this.mCurrentState.Exit();
            this.mCurrentState = goalState;
            this.mCurrentState.Enter();
        }
    }



};