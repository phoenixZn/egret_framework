class IDGenerator
{
    m_next_id : int = 0;

    public constructor(first_id : int)
    {
        this.m_next_id = first_id;
    }

    public Destruct() : void
    {
        this.m_next_id = 0;
    }

    public GenID() : int
    {
        return this.m_next_id++;
    }
}


abstract class ObjectManager<TObject extends ComposableObject<TObject>>
{
    protected m_logic_world : LogicWorld;
    protected m_id_generator : IDGenerator;
    protected m_objects : Map<int, TObject> = new Map<int, TObject>();
    //protected m_named_objects : Map<string, TObject> = new Map<string, TObject>();
    protected m_is_dirty : boolean = false;

    public constructor(logic_world : LogicWorld, first_id : int)
    {
        this.m_logic_world = logic_world;
        this.m_id_generator = new IDGenerator(first_id);
    }

    public Destruct() : void
    {
        this.m_objects.forEach(
            (value, key, map) => {
                this.PreDestroyObject(value);
                value.Destruct();
            }
        );
        this.m_objects.clear();
        //this.m_named_objects.clear();
        this.m_logic_world = null;
        this.m_id_generator.Destruct();
    }

    public get Dirty() : boolean
    {
        return this.m_is_dirty;
    }
    public set Dirty(value : boolean)
    {
        this.m_is_dirty = value;
    }

    public GetObject(object_id : int) : TObject
    {
        return this.m_objects.get(object_id);
    }

    // public GetObjectByName(name : string) : TObject
    // {
    //     return this.m_named_objects[name];
    // }

    public CreateObject(context : ObjectCreationContext) : TObject
    {
        if (context.m_object_id < 0)
        {
            let id : int = this.m_id_generator.GenID();
            context.m_object_id = id;
        }
        let obj : TObject = this.CreateObjectInstance(context);
        this.m_objects.set(context.m_object_id, obj);
        // if (context.m_name != null && context.m_name.Length > 0)
        //     this.m_named_objects[context.m_name] = obj;
        obj.Initialize(context);
        this.AfterObjectCreated(obj);
        this.m_is_dirty = true;
        return obj;
    }

    protected abstract CreateObjectInstance(context : ObjectCreationContext) : TObject;

    protected AfterObjectCreated(obj : TObject)
    {
    }

    public DestroyObject(object_id : int)
    {
        let obj : TObject = this.m_objects.get(object_id);
        if (typeof obj == "undefined")
            return;
        // name : string = obj.Name;
        // if (name != null && name.Length > 0)
        //     m_named_objects.Remove(name);
        this.PreDestroyObject(obj);
        obj.Destruct();
        this.m_objects.delete(object_id);
        this.m_is_dirty = true;
    }

    protected PreDestroyObject(obj : TObject) : void
    {
    }

    public GetAllObjects() : Map<int, TObject>
    {
        return this.m_objects;
    }

    public Update()
	{
        this.m_objects.forEach(
            (value, key, map) => {
                value.UpdateComponents();
            }
        );
    }
}