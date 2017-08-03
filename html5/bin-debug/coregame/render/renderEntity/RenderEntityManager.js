var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//TODO ： 改成world组件
var RenderEntityManager = (function (_super) {
    __extends(RenderEntityManager, _super);
    function RenderEntityManager(logic_world, render_world) {
        var _this = _super.call(this, logic_world, 100) || this;
        _this.m_render_world = render_world;
        return _this;
    }
    RenderEntityManager.prototype.Destruct = function () {
        _super.prototype.Destruct.call(this);
        this.m_render_world = null;
    };
    RenderEntityManager.prototype.CreateObjectInstance = function (context) {
        return new RenderEntity(this.m_render_world);
    };
    RenderEntityManager.prototype.AfterObjectCreated = function (entity) {
        _super.prototype.AfterObjectCreated.call(this, entity);
    };
    RenderEntityManager.prototype.PreDestroyObject = function (entity) {
        _super.prototype.PreDestroyObject.call(this, entity);
    };
    return RenderEntityManager;
}(ObjectManager));
__reflect(RenderEntityManager.prototype, "RenderEntityManager");
//# sourceMappingURL=RenderEntityManager.js.map