var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//标记数值是哪一个功能修改的
var FlagedValue = (function () {
    function FlagedValue(flag, value) {
        this.Flag = flag;
        this.Value = value;
    }
    return FlagedValue;
}());
__reflect(FlagedValue.prototype, "FlagedValue");
//////////////////////////////////////////////////////////////////////////
//可能同时被多个独立功能模块修改的值, 会记录多个改动，根据定义的计算策略得出当前值
var MultChangeValue = (function () {
    function MultChangeValue(baseValue) {
        this.mValueChangeList = new Array();
        this.mCurValue = this.mBaseValue = baseValue;
    }
    Object.defineProperty(MultChangeValue.prototype, "BaseValue", {
        get: function () {
            return this.mBaseValue;
        },
        set: function (value) {
            this.mBaseValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultChangeValue.prototype, "CurValue", {
        get: function () {
            return this.mCurValue;
        },
        enumerable: true,
        configurable: true
    });
    MultChangeValue.prototype.AddChange = function (value, flag) {
        if (flag === void 0) { flag = 0; }
        this.RemoveChange(flag);
        this.mValueChangeList.push(new FlagedValue(flag, value));
        this.CalcuCurValue();
    };
    MultChangeValue.prototype.RemoveChange = function (flag) {
        if (flag === void 0) { flag = 0; }
        for (var i = 0, indexAdd = 1, len = this.mValueChangeList.length; i < len; i += indexAdd) {
            if (this.mValueChangeList[i].Flag == flag) {
                this.mValueChangeList.splice(i, 1);
                indexAdd = 0;
            }
            else {
                indexAdd = 1;
            }
        }
        this.CalcuCurValue();
    };
    MultChangeValue.prototype.Clear = function () {
        this.mValueChangeList.splice(0);
        this.CalcuCurValue();
    };
    return MultChangeValue;
}());
__reflect(MultChangeValue.prototype, "MultChangeValue");
//# sourceMappingURL=MultChangeValue.js.map