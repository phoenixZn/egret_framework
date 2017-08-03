//////////////////////////////////////////////////////////////////////////
//函数名和方法名是标准的
//内容都是为工程特化定制的

enum FuncFlag
{
    Sys = 0,
}


class MultChangePrioritySetting
{
    //设定各个功能修改数值的优先级 for MultChangeValue_Priority
    public static mFlag2Priority : Map<int, int> = new Map<int, int>();   //<flag, priority>

    public static SetPriority(flag : int, priority : int) : void
    {
        this.mFlag2Priority[flag] = priority;
    }

    public static GetPriority(flag : int) : int
    {
        if (this.mFlag2Priority.has(flag))
        {
            return this.mFlag2Priority.get(flag);
        }
        return 0;
    }

    static InitSetting()
    {
        this.SetPriority(FuncFlag.Sys, 0);
    }
}