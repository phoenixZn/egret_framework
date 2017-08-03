var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FixPoint = (function () {
    function FixPoint(num) {
        if (num === void 0) { num = 0; }
        this.data = Math.round(num * 1000);
    }
    Object.defineProperty(FixPoint.prototype, "Number", {
        get: function () {
            return this.data / 1000;
        },
        enumerable: true,
        configurable: true
    });
    FixPoint.prototype.Add = function (fp) {
        if (typeof fp == "number") {
            this.data += Math.round(fp * 1000);
        }
        else {
            this.data += fp.data;
        }
        return this;
    };
    FixPoint.prototype.Sub = function (fp) {
        if (typeof fp == "number") {
            this.data -= Math.round(fp * 1000);
        }
        else {
            this.data -= fp.data;
        }
        return this;
    };
    FixPoint.prototype.Mul = function (fp) {
        if (typeof fp == "number") {
            this.data *= Math.round(fp * 1000);
        }
        else {
            this.data *= fp.data;
        }
        return this;
    };
    FixPoint.prototype.Div = function (fp) {
        if (typeof fp == "number") {
            this.data /= Math.round(fp * 1000);
        }
        else {
            this.data = Math.round(this.data / fp.data);
        }
        return this;
    };
    FixPoint.prototype.Mod = function (fp) {
        if (typeof fp == "number") {
            this.data %= Math.round(fp * 1000);
        }
        else {
            this.data %= fp.data;
        }
        return this;
    };
    return FixPoint;
}());
__reflect(FixPoint.prototype, "FixPoint");
//# sourceMappingURL=FixPoint.js.map