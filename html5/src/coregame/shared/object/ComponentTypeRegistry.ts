
// 组件适用对象的类别
enum CmptSuitableCategory
{
    All,
    LogicWorld,
    RenderWorld,
    LogicEntity,
    RenderEntity,
    Error,
}

//组件类型注册
class ComponentTypeRegistry
{
    static m_components_id2type : Map<int, any> = new Map<int, any>();     //<component_type_id, class type>
    static m_components_type2id : Map<any, int> = new Map<any, int>();     //<class type, component_type_id>
    static m_components_suitable : Map<int, int> = new Map<int, int>();    //<component_type_id, CmptSuitableCategory>

    public static Clear()
    {
        this.m_components_id2type.clear();
        this.m_components_type2id.clear();
        this.m_components_suitable.clear();
    }

    public static Register(type : any, suitableCategory : CmptSuitableCategory = CmptSuitableCategory.All)
    {
        let component_type_id : int = CRC.CalculateString(type.toString());

        this.m_components_id2type.set(component_type_id, type);
        this.m_components_type2id.set(type, component_type_id);
        this.m_components_suitable.set(component_type_id, suitableCategory);
    }

    public static ComponentID2Type(component_type_id : int) : any
    {
        return this.m_components_id2type.get(component_type_id);
    }

    public static ComponentType2ID(type : any) : int
    {
        var id = this.m_components_type2id.get(type);
        if (typeof id == "undefined") 
        {
            return -1;
        }
        return id;
    }

    public static CreateComponent(component_type_id : int)
    {
        var type = this.m_components_id2type.get(component_type_id);
        if (type != null && typeof type != "undefined") 
        {
            return new type;
        }
    }

    public static ComponentID2SuitableCategory(component_type_id : int) : CmptSuitableCategory
    {
        let suitableCategory = this.m_components_suitable.get(component_type_id);
        if(suitableCategory === undefined)
            return CmptSuitableCategory.Error;
        return suitableCategory;
    }

    //////////////////////////////////////////////////////////////////////
    //Helper
    public static IsLogicEntityComponent(component_type_id : int) : boolean
    {
        let suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.LogicEntity || suitableCategory == CmptSuitableCategory.All;
    }
    public static IsRenderEntityComponent(component_type_id : int) : boolean
    {
        let suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.RenderEntity || suitableCategory == CmptSuitableCategory.All;
    }
    public static IsLogicWorldComponent(component_type_id : int) : boolean
    {
        let suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.LogicWorld || suitableCategory == CmptSuitableCategory.All;
    }
    public static IsRenderWorldComponent(component_type_id : int) : boolean
    {
        let suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.RenderWorld || suitableCategory == CmptSuitableCategory.All;
    }

}