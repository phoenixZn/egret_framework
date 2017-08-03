var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectTypeData = (function () {
    function ObjectTypeData() {
        this.m_components_data = new Array();
    }
    return ObjectTypeData;
}());
__reflect(ObjectTypeData.prototype, "ObjectTypeData");
var ComponentData = (function () {
    function ComponentData() {
        this.m_component_variables = new Map();
    }
    return ComponentData;
}());
__reflect(ComponentData.prototype, "ComponentData");
var ObjectProtoData = (function () {
    function ObjectProtoData() {
        this.m_object_variables = new Map();
        //public m_attributes : Map<int, FixPoint> = new Map<int, FixPoint>();
    }
    return ObjectProtoData;
}());
__reflect(ObjectProtoData.prototype, "ObjectProtoData");
var ObjectCreationContext = (function () {
    function ObjectCreationContext() {
        //静态配置
        this.m_type_data = new ObjectTypeData();
        this.m_proto_data = new ObjectProtoData();
        //运行时配置
        this.m_custom_datas = new Map();
        this.m_object_id = -1;
        //TODO: 都移入m_custom_datas
        //public m_owner_id : int = -1;
    }
    return ObjectCreationContext;
}());
__reflect(ObjectCreationContext.prototype, "ObjectCreationContext");
//# sourceMappingURL=ObjectCreationContext.js.map