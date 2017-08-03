var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//////////////////////////////////////////////////////////////////////////
//可能同时被多个独立模块修改的bool, 只要有一个为true，当前值为true
var MultChangeBool_OR = (function (_super) {
    __extends(MultChangeBool_OR, _super);
    function MultChangeBool_OR() {
        return _super.call(this, false) || this;
    }
    MultChangeBool_OR.prototype.CalcuCurValue = function () {
        if (this.mValueChangeList.some(function (v, index, array) { return v.Value == true; }))
            this.mCurValue = true;
        else
            this.mCurValue = false;
    };
    return MultChangeBool_OR;
}(MultChangeValue));
__reflect(MultChangeBool_OR.prototype, "MultChangeBool_OR");
//# sourceMappingURL=MultChangeBool_OR.js.map