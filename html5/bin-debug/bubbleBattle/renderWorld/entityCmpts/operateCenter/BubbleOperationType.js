var OperationType;
(function (OperationType) {
    OperationType[OperationType["Op_None"] = 0] = "Op_None";
    OperationType[OperationType["Op_JoystackMove"] = 1] = "Op_JoystackMove";
    OperationType[OperationType["Op_JoystackRelease"] = 2] = "Op_JoystackRelease";
    OperationType[OperationType["Op_CreateBomb"] = 3] = "Op_CreateBomb";
    OperationType[OperationType["Op_Rush"] = 4] = "Op_Rush";
    OperationType[OperationType["Op_RushRelease"] = 5] = "Op_RushRelease";
    //引爆
    OperationType[OperationType["Op_TriggerBomb"] = 6] = "Op_TriggerBomb";
    //闪烁
    OperationType[OperationType["Op_Blink"] = 7] = "Op_Blink";
    //眩晕
    OperationType[OperationType["Op_Stun"] = 8] = "Op_Stun";
    //混乱
    OperationType[OperationType["Op_Confuse"] = 9] = "Op_Confuse";
    //无敌
    OperationType[OperationType["Op_Invincible"] = 10] = "Op_Invincible";
    //救命针
    OperationType[OperationType["Op_SkillFloatBreak"] = 11] = "Op_SkillFloatBreak";
})(OperationType || (OperationType = {}));
//# sourceMappingURL=BubbleOperationType.js.map