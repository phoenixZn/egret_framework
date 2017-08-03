var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//////////////////////////////////////////////////////////////////////////
//当前值以最后一次修改的为准
var MultChangeValue_Last = (function (_super) {
    __extends(MultChangeValue_Last, _super);
    function MultChangeValue_Last(baseValue) {
        return _super.call(this, baseValue) || this;
    }
    MultChangeValue_Last.prototype.CalcuCurValue = function () {
        if (this.mValueChangeList.length > 0)
            this.mCurValue = this.mValueChangeList[this.mValueChangeList.length - 1].Value;
        else
            this.mCurValue = this.mBaseValue;
    };
    return MultChangeValue_Last;
}(MultChangeValue));
__reflect(MultChangeValue_Last.prototype, "MultChangeValue_Last");
//# sourceMappingURL=MultChangeValue_Last.js.map