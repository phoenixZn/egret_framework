var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleName;
(function (ModuleName) {
    ModuleName[ModuleName["Bulletin"] = 0] = "Bulletin";
    ModuleName[ModuleName["Login"] = 1] = "Login";
    ModuleName[ModuleName["Match"] = 2] = "Match";
})(ModuleName || (ModuleName = {}));
var ModuleFactory = (function () {
    function ModuleFactory() {
    }
    ModuleFactory.prototype.Init = function (mng) {
        mng.AddModule(BulletinModule, ModuleType.Bulletin);
        mng.AddModule(LoginModule, ModuleType.Game);
        mng.AddModule(MatchModule, ModuleType.Game);
    };
    return ModuleFactory;
}());
__reflect(ModuleFactory.prototype, "ModuleFactory");
//# sourceMappingURL=ModuleFactory.js.map