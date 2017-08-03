class GameComponent<TOwner>
{
	protected m_owner: TOwner;

	protected m_component_type_id: int = -1;
	protected m_disable_count: int = 0;


	public get Owner(): TOwner {
		return this.m_owner;
	}

	public get ComponentTypeID(): int {
		return this.m_component_type_id;
	}


	public Destruct() 
	{

	}

	public PreInitialize(id : int, owner: TOwner, variables: Map<string, any>) 
	{
		this.m_component_type_id = id;
		this.m_owner = owner;
	}

	public InitializeComponent()
	{
	}

	public PostInitializeComponent() 
	{
		if (this.m_disable_count == 0)
			this.OnEnable();
		else if (this.m_disable_count > 0)
			this.OnDisable();
	}

	// Enable Disable
	public Enable() 
	{
		if (this.m_disable_count > 0) {
			--this.m_disable_count;
			if (this.m_disable_count == 0)
				this.OnEnable();
		}
	}

	public Disable() 
	{
		++this.m_disable_count;
		if (this.m_disable_count == 1)
			this.OnDisable();
	}

	public IsEnable(): boolean 
	{
		return this.m_disable_count == 0;
	}

	protected OnEnable() 
	{
	}

	protected OnDisable() 
	{
	}

}