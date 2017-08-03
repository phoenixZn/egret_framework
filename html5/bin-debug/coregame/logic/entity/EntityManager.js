var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityManager = (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager(logic_world) {
        return _super.call(this, logic_world, 100) || this;
    }
    EntityManager.prototype.CreateObjectInstance = function (context) {
        return new Entity();
    };
    EntityManager.prototype.AfterObjectCreated = function (entity) {
        _super.prototype.AfterObjectCreated.call(this, entity);
        // let position_component = entity.GetComponent(PositionComponent);
        // if (position_component === undefined)
        //     return;
        this.m_logic_world.AddSimpleRenderMessage(RenderMessageType.CreateEntity, entity.ID, 0);
    };
    EntityManager.prototype.PreDestroyObject = function (entity) {
        _super.prototype.PreDestroyObject.call(this, entity);
        this.m_logic_world.AddSimpleRenderMessage(RenderMessageType.DestroyEntity, entity.ID, 0);
    };
    return EntityManager;
}(ObjectManager));
__reflect(EntityManager.prototype, "EntityManager");
//# sourceMappingURL=EntityManager.js.map