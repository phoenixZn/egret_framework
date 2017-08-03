//////////////////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleObjectConfig = (function () {
    function BubbleObjectConfig() {
        this.m_object_type_data = new Map();
        this.m_object_proto_data = new Map();
        this.AddType_LocalActor();
        this.AddType_NetActor();
    }
    BubbleObjectConfig.prototype.GetObjectTypeData = function (id) {
        var type_data = this.m_object_type_data.get(id);
        if (type_data === undefined)
            return null;
        return type_data;
    };
    BubbleObjectConfig.prototype.GetObjectProtoData = function (id) {
        var proto_data = this.m_object_proto_data.get(id);
        if (proto_data === undefined)
            return null;
        return proto_data;
    };
    BubbleObjectConfig.prototype.AddType_LocalActor = function () {
        var type_data = new ObjectTypeData();
        type_data.m_name = "localActor";
        var cmpt = new ComponentData();
        this.AddActorBaseComponent(type_data, cmpt);
        cmpt = new ComponentData();
        cmpt.m_component_type_id = ComponentTypeRegistry.ComponentType2ID(UILocalCtrlCmpt);
        type_data.m_components_data.push(cmpt);
        this.m_object_type_data.set(BubbleObjectConfig.LocalActorEntityID, type_data);
    };
    BubbleObjectConfig.prototype.AddType_NetActor = function () {
        var type_data = new ObjectTypeData();
        type_data.m_name = "NetActor";
        var cmpt = new ComponentData();
        this.AddActorBaseComponent(type_data, cmpt);
        this.m_object_type_data.set(BubbleObjectConfig.NetActorEntityID, type_data);
    };
    BubbleObjectConfig.prototype.InitActorProtoData = function () {
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
    };
    BubbleObjectConfig.prototype.AddActorBaseComponent = function (type_data, cmpt) {
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
    };
    return BubbleObjectConfig;
}());
BubbleObjectConfig.LocalActorEntityID = 10001;
BubbleObjectConfig.NetActorEntityID = 10002;
BubbleObjectConfig.MusicBoyProtoID = 1;
__reflect(BubbleObjectConfig.prototype, "BubbleObjectConfig");
//# sourceMappingURL=BubbleEntityConfig.js.map