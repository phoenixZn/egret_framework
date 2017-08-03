//////////////////////////////////////////////////////////////////////////
//当前值以优先级最高的修改为准
class MultChangeValue_Priority<T> extends MultChangeValue<T>
{
    public constructor(baseValue : T)
    {
        super(baseValue)
    }

    protected CalcuCurValue() : void
    {
        if (this.mValueChangeList.length <= 0)
        {
            this.mCurValue = this.mBaseValue;
            return;
        }

        let highPriority : int = 0;
        for (var i = 0, len = this.mValueChangeList.length; i < len; ++i)
        {
            var v = this.mValueChangeList[i];
            let priority : int = MultChangePrioritySetting.GetPriority(v.Flag);
            if (priority >= highPriority)
            {
                highPriority = priority;
                this.mCurValue = v.Value;
            }
        }
    }

}