
class ComposableObject<TObject>
{
	protected m_object: TObject;
	protected m_components : Map<int, GameComponent<TObject>> = new Map<int, GameComponent<TObject>>();
	protected m_update_components : Array<GameComponent<TObject>> = new Array<GameComponent<TObject>>();
    protected m_context : ObjectCreationContext;

	public constructor()
	{
	}

    public Destruct()
    {
        this.m_components.forEach(
            (value, key, map) => {
                value.Destruct();
            }
        );
        this.m_components.clear();
        this.OnDestruct();
    }
	
    protected OnDestruct()
    {
        this.m_context = null;
    }

    public get ID() : int
    {
        return this.m_context.m_object_id;
    }

    public GetCreationContext() : ObjectCreationContext
    {
        return this.m_context;
    }


    public Initialize(context : ObjectCreationContext)
    {
        egret.log("PreInitialize");
        this.PreInitialize(context);
        egret.log("InitializeComponents");
        this.InitializeComponents(context);
        egret.log("PostInitialize");
        this.PostInitialize(context);
    }

    protected PreInitialize(context : ObjectCreationContext)
    {
        this.m_context = context;
    }

    protected InitializeComponents(context : ObjectCreationContext)
    {
        let components_data = context.m_type_data.m_components_data;

		for(let data of components_data)
		{
            this.AddComponentFromData(data);
		}

        this.m_components.forEach(
            (value, key, map) => {
                value.InitializeComponent();
            }
        );

        this.m_components.forEach(
            (value, key, map) => {
                value.PostInitializeComponent();
            }
        );
    }

    protected PostInitialize(context : ObjectCreationContext)
    {
    }

    protected AddComponentFromData(component_data : ComponentData) : GameComponent<TObject>
    {
        let component_type_id : int = component_data.m_component_type_id;
        if (!this.IsSuitableComponent(component_type_id))
            return null;
        let component = <GameComponent<TObject>>ComponentTypeRegistry.CreateComponent(component_type_id);
        if (component == null)
            return null;
        this.m_components.set(component_type_id, component);
        if(component["Update"] instanceof Function)
		{
			this.m_update_components.push(component);
		}
        if (component_data.m_component_variables != null)
            component.PreInitialize(component_type_id, this.m_object, component_data.m_component_variables);
        return component;
    }

    protected IsSuitableComponent(component_type_id : int)
    {
        return true;
    }

    //不通过数据驱动，直接加组件
	protected AddComponent<T extends GameComponent<TObject>>(cmptType: {new(): T}, variables : Map<string, string> = null)
	{
        let component_type_id : int = CRC.CalculateString(cmptType.toString());
		let component : T = new cmptType()
        this.m_components.set(component_type_id, component);
		if(component["Update"] instanceof Function)
		{
			this.m_update_components.push(component);
		}
        component.PreInitialize(component_type_id, this.m_object, variables);
        component.InitializeComponent();
        component.PostInitializeComponent();
	}

	public GetComponent<T extends GameComponent<TObject>>(t: {new(): T}) : T
	{
        let component_type_id : int = CRC.CalculateString(t.toString());
		return <T>this.m_components.get(component_type_id);
	}

	public UpdateComponents()
	{
		for(let component of this.m_update_components)
		{
			component["Update"]();
		}
	}

    public HasUpdateComponents() : boolean
    {
        return this.m_update_components != null && this.m_update_components.length > 0;
    }

}
