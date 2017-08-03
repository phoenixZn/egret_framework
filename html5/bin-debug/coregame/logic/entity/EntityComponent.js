var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityComponent = (function (_super) {
    __extends(EntityComponent, _super);
    function EntityComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityComponent.prototype.GetOwnerPlayerID = function () {
        return 0;
    };
    EntityComponent.prototype.GetOwnerEntityID = function () {
        return this.m_owner.ID;
    };
    EntityComponent.prototype.GetOwnerEntity = function () {
        return this.m_owner;
    };
    EntityComponent.prototype.GetLogicWorld = function () {
        return this.m_owner.GetLogicWorld();
    };
    return EntityComponent;
}(GameComponent));
__reflect(EntityComponent.prototype, "EntityComponent");
//# sourceMappingURL=EntityComponent.js.map