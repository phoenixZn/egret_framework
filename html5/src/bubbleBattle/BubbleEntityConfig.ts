//////////////////////////////////////////////////////////////////////////////////////////////////

class BubbleObjectConfig
{
    static LocalActorEntityID: int = 10001;
    static NetActorEntityID: int = 10002;

    static MusicBoyProtoID : int = 1;

    private m_object_type_data: Map<int, ObjectTypeData>= new Map<int, ObjectTypeData>();
    private m_object_proto_data: Map<int, ObjectProtoData>= new Map<int, ObjectProtoData>();

    public GetObjectTypeData(id : int) : ObjectTypeData
    {
        let type_data = this.m_object_type_data.get(id);
        if (type_data === undefined)
            return null;
        return type_data;
    }

    public GetObjectProtoData(id : int) : ObjectProtoData
    {
        let proto_data = this.m_object_proto_data.get(id);
        if (proto_data === undefined)
            return null;
        return proto_data;
    }

    public constructor()
    {
        this.AddType_LocalActor();
        this.AddType_NetActor();
    }


    public AddType_LocalActor()
    {
        let type_data = new ObjectTypeData();
        type_data.m_name = "localActor";
        let cmpt = new ComponentData();

        this.AddActorBaseComponent(type_data, cmpt);
        
        cmpt = new ComponentData();
        cmpt.m_component_type_id = ComponentTypeRegistry.ComponentType2ID(UILocalCtrlCmpt);
        type_data.m_components_data.push(cmpt);

        this.m_object_type_data.set(BubbleObjectConfig.LocalActorEntityID, type_data);
    }


    public AddType_NetActor()
    {
        let type_data = new ObjectTypeData();
        type_data.m_name = "NetActor";
        let cmpt = new ComponentData();

        this.AddActorBaseComponent(type_data, cmpt);

        this.m_object_type_data.set(BubbleObjectConfig.NetActorEntityID, type_data);
    }


    public InitActorProtoData()
    {
        // var proto_data = new ObjectProtoData();
        // proto_data.m_name = "270";
        // proto_data.m_object_variables["asset"] = "Entity/Actor/270";
        // proto_data.m_object_variables["male"] = "true";
        // this.m_object_proto_data[BubbleCfgID.Actor270ProtoID] = proto_data;

        // proto_data = new ObjectProtoData();
        // proto_data.m_name = "420";
        // proto_data.m_object_variables["asset"] = "Entity/Actor/420";
        // proto_data.m_object_variables["male"] = "false";

        // this.m_object_proto_data[BubbleCfgID.Actor420ProtoID] = proto_data;

        // proto_data = new ObjectProtoData();
        // proto_data.m_name = "110";
        // proto_data.m_object_variables["asset"] = "Entity/Actor/110";
        // proto_data.m_object_variables["male"] = "true";

        // this.m_object_proto_data[BubbleCfgID.Actor110ProtoID] = proto_data;
    }

    protected AddActorBaseComponent(type_data: ObjectTypeData, cmpt : ComponentData)
    {
        //Entity的组件
		cmpt.m_component_type_id = ComponentTypeRegistry.ComponentType2ID(PositionComponent);
        type_data.m_components_data.push(cmpt);
        cmpt = new ComponentData();
		cmpt.m_component_type_id = ComponentTypeRegistry.ComponentType2ID(ActorMoveCtrlCmpt);
        type_data.m_components_data.push(cmpt);
        cmpt = new ComponentData();
		cmpt.m_component_type_id = ComponentTypeRegistry.ComponentType2ID(ActorCmpt);
        type_data.m_components_data.push(cmpt);

        //RenderEntity的组件
        cmpt = new ComponentData();
        cmpt.m_component_type_id = ComponentTypeRegistry.ComponentType2ID(ActorRenderCmpt);
        type_data.m_components_data.push(cmpt);

    }

}