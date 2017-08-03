//////////////////////////////////////////////////////////////////////////
//函数名和方法名是标准的
//内容都是为工程特化定制的
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FuncFlag;
(function (FuncFlag) {
    FuncFlag[FuncFlag["Sys"] = 0] = "Sys";
})(FuncFlag || (FuncFlag = {}));
var MultChangePrioritySetting = (function () {
    function MultChangePrioritySetting() {
    }
    MultChangePrioritySetting.SetPriority = function (flag, priority) {
        this.mFlag2Priority[flag] = priority;
    };
    MultChangePrioritySetting.GetPriority = function (flag) {
        if (this.mFlag2Priority.has(flag)) {
            return this.mFlag2Priority.get(flag);
        }
        return 0;
    };
    MultChangePrioritySetting.InitSetting = function () {
        this.SetPriority(FuncFlag.Sys, 0);
    };
    return MultChangePrioritySetting;
}());
//设定各个功能修改数值的优先级 for MultChangeValue_Priority
MultChangePrioritySetting.mFlag2Priority = new Map(); //<flag, priority>
__reflect(MultChangePrioritySetting.prototype, "MultChangePrioritySetting");
//# sourceMappingURL=MultChangeSettingEx.js.map