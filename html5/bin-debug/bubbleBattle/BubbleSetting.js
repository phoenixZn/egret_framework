var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleSetting = (function () {
    function BubbleSetting() {
    }
    BubbleSetting.CoreGameSettingInit = function () {
    };
    BubbleSetting.RenderWorldCreationContext = function (world) {
        var context = new ObjectCreationContext();
        context.m_custom_datas.set("LogicWorld", world.GetLogicWorld());
        return context;
    };
    return BubbleSetting;
}());
__reflect(BubbleSetting.prototype, "BubbleSetting");
var ModeRule = (function () {
    function ModeRule() {
    }
    return ModeRule;
}());
__reflect(ModeRule.prototype, "ModeRule");
//# sourceMappingURL=BubbleSetting.js.map