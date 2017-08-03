
enum BubbleFuncFlag
{
    //隐形相关功能
    ShowActorByFloatState = 1003,
    HideByItemInvisible = 1002,
    HideByGrass = 1001,
}

class BubbleMultChangePrioritySetting
{
    static InitSetting()
    {
        MultChangePrioritySetting.InitSetting();

        //隐形相关功能优先级
        MultChangePrioritySetting.SetPriority(BubbleFuncFlag.ShowActorByFloatState, 30);
        MultChangePrioritySetting.SetPriority(BubbleFuncFlag.HideByItemInvisible, 20);
        MultChangePrioritySetting.SetPriority(BubbleFuncFlag.HideByGrass, 10);
    }
}
