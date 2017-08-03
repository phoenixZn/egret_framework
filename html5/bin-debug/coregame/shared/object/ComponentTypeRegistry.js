var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 组件适用对象的类别
var CmptSuitableCategory;
(function (CmptSuitableCategory) {
    CmptSuitableCategory[CmptSuitableCategory["All"] = 0] = "All";
    CmptSuitableCategory[CmptSuitableCategory["LogicWorld"] = 1] = "LogicWorld";
    CmptSuitableCategory[CmptSuitableCategory["RenderWorld"] = 2] = "RenderWorld";
    CmptSuitableCategory[CmptSuitableCategory["LogicEntity"] = 3] = "LogicEntity";
    CmptSuitableCategory[CmptSuitableCategory["RenderEntity"] = 4] = "RenderEntity";
    CmptSuitableCategory[CmptSuitableCategory["Error"] = 5] = "Error";
})(CmptSuitableCategory || (CmptSuitableCategory = {}));
//组件类型注册
var ComponentTypeRegistry = (function () {
    function ComponentTypeRegistry() {
    }
    ComponentTypeRegistry.Clear = function () {
        this.m_components_id2type.clear();
        this.m_components_type2id.clear();
        this.m_components_suitable.clear();
    };
    ComponentTypeRegistry.Register = function (type, suitableCategory) {
        if (suitableCategory === void 0) { suitableCategory = CmptSuitableCategory.All; }
        var component_type_id = CRC.CalculateString(type.toString());
        this.m_components_id2type.set(component_type_id, type);
        this.m_components_type2id.set(type, component_type_id);
        this.m_components_suitable.set(component_type_id, suitableCategory);
    };
    ComponentTypeRegistry.ComponentID2Type = function (component_type_id) {
        return this.m_components_id2type.get(component_type_id);
    };
    ComponentTypeRegistry.ComponentType2ID = function (type) {
        var id = this.m_components_type2id.get(type);
        if (typeof id == "undefined") {
            return -1;
        }
        return id;
    };
    ComponentTypeRegistry.CreateComponent = function (component_type_id) {
        var type = this.m_components_id2type.get(component_type_id);
        if (type != null && typeof type != "undefined") {
            return new type;
        }
    };
    ComponentTypeRegistry.ComponentID2SuitableCategory = function (component_type_id) {
        var suitableCategory = this.m_components_suitable.get(component_type_id);
        if (suitableCategory === undefined)
            return CmptSuitableCategory.Error;
        return suitableCategory;
    };
    //////////////////////////////////////////////////////////////////////
    //Helper
    ComponentTypeRegistry.IsLogicEntityComponent = function (component_type_id) {
        var suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.LogicEntity || suitableCategory == CmptSuitableCategory.All;
    };
    ComponentTypeRegistry.IsRenderEntityComponent = function (component_type_id) {
        var suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.RenderEntity || suitableCategory == CmptSuitableCategory.All;
    };
    ComponentTypeRegistry.IsLogicWorldComponent = function (component_type_id) {
        var suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.LogicWorld || suitableCategory == CmptSuitableCategory.All;
    };
    ComponentTypeRegistry.IsRenderWorldComponent = function (component_type_id) {
        var suitableCategory = this.ComponentID2SuitableCategory(component_type_id);
        return suitableCategory == CmptSuitableCategory.RenderWorld || suitableCategory == CmptSuitableCategory.All;
    };
    return ComponentTypeRegistry;
}());
ComponentTypeRegistry.m_components_id2type = new Map(); //<component_type_id, class type>
ComponentTypeRegistry.m_components_type2id = new Map(); //<class type, component_type_id>
ComponentTypeRegistry.m_components_suitable = new Map(); //<component_type_id, CmptSuitableCategory>
__reflect(ComponentTypeRegistry.prototype, "ComponentTypeRegistry");
//# sourceMappingURL=ComponentTypeRegistry.js.map