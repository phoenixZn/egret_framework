var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderEntity = (function (_super) {
    __extends(RenderEntity, _super);
    function RenderEntity(render_world) {
        var _this = _super.call(this) || this;
        _this.m_hide_reference_count = 0;
        _this.m_object = _this;
        _this.m_render_world = render_world;
        return _this;
    }
    RenderEntity.prototype.OnDestruct = function () {
        _super.prototype.OnDestruct.call(this);
        this.m_render_world = null;
        this.m_logicEntity = null;
    };
    Object.defineProperty(RenderEntity.prototype, "LogicEntityID", {
        get: function () {
            return this.m_logicEntity.ID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderEntity.prototype, "LogicEntity", {
        get: function () {
            return this.m_logicEntity;
        },
        enumerable: true,
        configurable: true
    });
    RenderEntity.prototype.GetRenderWorld = function () {
        return this.m_render_world;
    };
    RenderEntity.prototype.GetLogicWorld = function () {
        return this.m_logicEntity.GetLogicWorld();
    };
    RenderEntity.prototype.PreInitialize = function (context) {
        _super.prototype.PreInitialize.call(this, context);
        var lw = context.m_custom_datas.get("LogicWorld");
        this.m_logicEntity = lw.GetEntityManager().GetObject(this.m_context.m_object_id);
    };
    RenderEntity.prototype.IsSuitableComponent = function (component_type_id) {
        return ComponentTypeRegistry.IsRenderEntityComponent(component_type_id);
    };
    return RenderEntity;
}(ComposableObject));
__reflect(RenderEntity.prototype, "RenderEntity");
//# sourceMappingURL=RenderEntity.js.map