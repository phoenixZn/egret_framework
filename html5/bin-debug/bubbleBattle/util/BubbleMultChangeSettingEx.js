var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleFuncFlag;
(function (BubbleFuncFlag) {
    //隐形相关功能
    BubbleFuncFlag[BubbleFuncFlag["ShowActorByFloatState"] = 1003] = "ShowActorByFloatState";
    BubbleFuncFlag[BubbleFuncFlag["HideByItemInvisible"] = 1002] = "HideByItemInvisible";
    BubbleFuncFlag[BubbleFuncFlag["HideByGrass"] = 1001] = "HideByGrass";
})(BubbleFuncFlag || (BubbleFuncFlag = {}));
var BubbleMultChangePrioritySetting = (function () {
    function BubbleMultChangePrioritySetting() {
    }
    BubbleMultChangePrioritySetting.InitSetting = function () {
        MultChangePrioritySetting.InitSetting();
        //隐形相关功能优先级
        MultChangePrioritySetting.SetPriority(BubbleFuncFlag.ShowActorByFloatState, 30);
        MultChangePrioritySetting.SetPriority(BubbleFuncFlag.HideByItemInvisible, 20);
        MultChangePrioritySetting.SetPriority(BubbleFuncFlag.HideByGrass, 10);
    };
    return BubbleMultChangePrioritySetting;
}());
__reflect(BubbleMultChangePrioritySetting.prototype, "BubbleMultChangePrioritySetting");
//# sourceMappingURL=BubbleMultChangeSettingEx.js.map