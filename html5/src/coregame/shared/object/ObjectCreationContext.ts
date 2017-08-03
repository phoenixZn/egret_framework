   
class ObjectTypeData
{
    public m_name : string;
    public m_components_data : Array<ComponentData> = new Array<ComponentData>();
}

class ComponentData
{
    public m_component_type_id : int;
    public m_component_variables : Map<string, any> = new Map<string, any>();
}

class ObjectProtoData
{
    public m_name : string;
    public m_object_variables : Map<string, any> = new Map<string, any>();
    //public m_attributes : Map<int, FixPoint> = new Map<int, FixPoint>();
}

class ObjectCreationContext
{
    //静态配置
    public m_type_data : ObjectTypeData = new ObjectTypeData();
    public m_proto_data : ObjectProtoData = new ObjectProtoData();

    //运行时配置
    public m_custom_datas : Map<string, any> = new Map<string, any>();
    public m_object_id : int = -1;

    //TODO: 都移入m_custom_datas
    //public m_owner_id : int = -1;
}