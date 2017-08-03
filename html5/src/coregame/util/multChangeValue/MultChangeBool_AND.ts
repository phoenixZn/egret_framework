//////////////////////////////////////////////////////////////////////////
//可能同时被多个独立模块修改的bool, 只要有一个为false，当前值为false
class MultChangeBool_AND extends MultChangeValue<boolean>
{
    public constructor()
    {
        super(true);
    }

    protected CalcuCurValue() : void
    {
      if ( this.mValueChangeList.some( (v, index, array) => v.Value == false) )
            this.mCurValue = false;
        else
            this.mCurValue = true;
    }

}