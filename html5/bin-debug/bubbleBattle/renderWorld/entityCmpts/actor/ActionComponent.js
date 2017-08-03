var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActionComponent = (function () {
    function ActionComponent() {
    }
    ActionComponent.prototype.Play = function (action) {
        this.m_ani.play(this.m_name + "_" + action + ".eam");
    };
    return ActionComponent;
}());
__reflect(ActionComponent.prototype, "ActionComponent");
//# sourceMappingURL=ActionComponent.js.map