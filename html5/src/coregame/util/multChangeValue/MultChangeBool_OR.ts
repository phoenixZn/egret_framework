//////////////////////////////////////////////////////////////////////////
//可能同时被多个独立模块修改的bool, 只要有一个为true，当前值为true
class MultChangeBool_OR extends MultChangeValue<boolean>
{
    public constructor()
    {
        super(false);
    }

    protected CalcuCurValue() : void
    {
      if ( this.mValueChangeList.some( (v, index, array) => v.Value == true) )
            this.mCurValue = true;
        else
            this.mCurValue = false;
    }

}