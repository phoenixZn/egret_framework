//////////////////////////////////////////////////////////////////////////
//当前值以最后一次修改的为准
class MultChangeValue_Last<T> extends MultChangeValue<T>
{
    public constructor(baseValue : T)
    {
        super(baseValue)
    }

    protected CalcuCurValue() : void
    {
        if (this.mValueChangeList.length > 0)
            this.mCurValue = this.mValueChangeList[this.mValueChangeList.length - 1].Value;
        else
            this.mCurValue = this.mBaseValue;
    }
}