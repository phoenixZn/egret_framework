enum OperationType
{
    Op_None,

    Op_JoystackMove,        //摇杆 位移
    Op_JoystackRelease,     //摇杆 归零or释放 

    Op_CreateBomb,         

    Op_Rush,
    Op_RushRelease,

    //引爆
    Op_TriggerBomb,
    //闪烁
    Op_Blink,
    //眩晕
    Op_Stun,
    //混乱
    Op_Confuse,
    //无敌
    Op_Invincible,
    //救命针
    Op_SkillFloatBreak,         

}