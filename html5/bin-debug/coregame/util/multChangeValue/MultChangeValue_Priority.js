var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//////////////////////////////////////////////////////////////////////////
//当前值以优先级最高的修改为准
var MultChangeValue_Priority = (function (_super) {
    __extends(MultChangeValue_Priority, _super);
    function MultChangeValue_Priority(baseValue) {
        return _super.call(this, baseValue) || this;
    }
    MultChangeValue_Priority.prototype.CalcuCurValue = function () {
        if (this.mValueChangeList.length <= 0) {
            this.mCurValue = this.mBaseValue;
            return;
        }
        var highPriority = 0;
        for (var i = 0, len = this.mValueChangeList.length; i < len; ++i) {
            var v = this.mValueChangeList[i];
            var priority = MultChangePrioritySetting.GetPriority(v.Flag);
            if (priority >= highPriority) {
                highPriority = priority;
                this.mCurValue = v.Value;
            }
        }
    };
    return MultChangeValue_Priority;
}(MultChangeValue));
__reflect(MultChangeValue_Priority.prototype, "MultChangeValue_Priority");
//# sourceMappingURL=MultChangeValue_Priority.js.map