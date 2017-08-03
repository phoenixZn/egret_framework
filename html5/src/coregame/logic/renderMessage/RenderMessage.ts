enum RenderMessageType
{
    Invalid = 0,
    CreateEntity = 1,              //SimpleRenderMessage
    DestroyEntity = 2,             //SimpleRenderMessage
}

class RenderMessage
{
    protected m_entity_id : int = -1;
    protected m_type : int = RenderMessageType.Invalid;

    public constructor(type : int, entity_id : int)
    {
        this.m_type = type;
        this.m_entity_id = entity_id;
    }

    public get Type() : int
    {
        return this.m_type;
    }
    public get EntityID() : int
    {
        return this.m_entity_id;
    }
}

class SimpleRenderMessage extends RenderMessage
{
    public m_simple_data : int = 0;

    public constructor(type : int, entity_id : int, simple_data : int = 0)
    {
        super(type, entity_id);
        this.m_simple_data = simple_data;
    }

}