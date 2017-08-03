
//标记数值是哪一个功能修改的
class FlagedValue<T>
{
    public Flag : int;
    public Value : T;
    public constructor(flag : int, value : T)
    {
        this.Flag = flag;
        this.Value = value;
    }
}

//////////////////////////////////////////////////////////////////////////
//可能同时被多个独立功能模块修改的值, 会记录多个改动，根据定义的计算策略得出当前值
abstract class MultChangeValue<T>
{
    protected mValueChangeList : Array<FlagedValue<T>> = new Array<FlagedValue<T>>();
    protected mBaseValue : T;
    protected mCurValue : T;

    public constructor(baseValue : T)
    {
        this.mCurValue = this.mBaseValue = baseValue;
    }

    public get BaseValue() : T 
    { 
        return this.mBaseValue; 
    }
    public set BaseValue( value : T)
    { 
        this.mBaseValue = value;
    }

    public get CurValue() : T 
    { 
        return this.mCurValue; 
    }

    public AddChange(value : T, flag : int = 0) : void
    {
        this.RemoveChange(flag);
        this.mValueChangeList.push(new FlagedValue(flag, value));
        this.CalcuCurValue();
    }

    public RemoveChange(flag : int = 0) : void
    {
        for(var i = 0, indexAdd = 1, len = this.mValueChangeList.length; i < len; i += indexAdd)
        {
            if(this.mValueChangeList[i].Flag == flag )
            {
                this.mValueChangeList.splice(i, 1);
                indexAdd = 0;
            } 
            else 
            {
               indexAdd = 1;
            }
        }
        this.CalcuCurValue();
    }

    public Clear() : void
    {
        this.mValueChangeList.splice(0);
        this.CalcuCurValue();
    }

    protected abstract CalcuCurValue() : void;


}