var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super.call(this) || this;
        _this.m_object = _this;
        return _this;
    }
    Entity.prototype.GetLogicWorld = function () {
        return this.m_logic_world;
    };
    Entity.prototype.OnDestruct = function () {
        _super.prototype.OnDestruct.call(this);
    };
    Entity.prototype.PreInitialize = function (context) {
        _super.prototype.PreInitialize.call(this, context);
        this.m_logic_world = context.m_custom_datas.get("LogicWorld");
    };
    Entity.prototype.IsSuitableComponent = function (component_type_id) {
        return ComponentTypeRegistry.IsLogicEntityComponent(component_type_id);
    };
    return Entity;
}(ComposableObject));
__reflect(Entity.prototype, "Entity");
//# sourceMappingURL=Entity.js.map