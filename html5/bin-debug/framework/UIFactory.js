var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIName;
(function (UIName) {
    UIName[UIName["Login"] = 0] = "Login";
    UIName[UIName["Match"] = 1] = "Match";
    UIName[UIName["Ingame"] = 2] = "Ingame";
})(UIName || (UIName = {}));
var UIFactory = (function () {
    function UIFactory() {
        this.m_ui_creators = new Map();
    }
    UIFactory.prototype.Init = function () {
        this.m_ui_creators.set(UIName.Login, LoginPage);
        this.m_ui_creators.set(UIName.Match, MatchPage);
    };
    UIFactory.prototype.Create = function (name) {
        var cls = this.m_ui_creators.get(name);
        if (cls != null) {
            return new cls;
        }
        return null;
    };
    return UIFactory;
}());
__reflect(UIFactory.prototype, "UIFactory");
//# sourceMappingURL=UIFactory.js.map