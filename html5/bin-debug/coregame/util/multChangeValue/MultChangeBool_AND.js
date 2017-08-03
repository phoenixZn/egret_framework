var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//////////////////////////////////////////////////////////////////////////
//可能同时被多个独立模块修改的bool, 只要有一个为false，当前值为false
var MultChangeBool_AND = (function (_super) {
    __extends(MultChangeBool_AND, _super);
    function MultChangeBool_AND() {
        return _super.call(this, true) || this;
    }
    MultChangeBool_AND.prototype.CalcuCurValue = function () {
        if (this.mValueChangeList.some(function (v, index, array) { return v.Value == false; }))
            this.mCurValue = false;
        else
            this.mCurValue = true;
    };
    return MultChangeBool_AND;
}(MultChangeValue));
__reflect(MultChangeBool_AND.prototype, "MultChangeBool_AND");
//# sourceMappingURL=MultChangeBool_AND.js.map