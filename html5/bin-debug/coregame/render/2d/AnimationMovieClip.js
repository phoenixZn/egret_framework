var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimationMovieClip = (function (_super) {
    __extends(AnimationMovieClip, _super);
    function AnimationMovieClip() {
        var _this = _super.call(this) || this;
        _this.m_mc_map = {};
        return _this;
    }
    AnimationMovieClip.prototype.LoadAnimation = function (json, textrue) {
        var data = RES.getRes(json);
        var txtr = RES.getRes(textrue);
        var fac = new egret.MovieClipDataFactory(data, txtr);
        var mcdata = fac.mcDataSet["mc"];
        for (var key in mcdata) {
            var val = new egret.MovieClip(fac.generateMovieClipData(key));
            var labels = mcdata[key]["labels"];
            for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                var action = labels_1[_i];
                this.m_mc_map[action["name"]] = val;
            }
        }
    };
    AnimationMovieClip.prototype.Play = function (action, loop) {
        if (action == this.m_curr_action) {
            return;
        }
        var mc = this.m_mc_map[action];
        if (mc != null) {
            if (mc != this.m_curr_mc && this.m_curr_mc != null) {
                this.removeChild(this.m_curr_mc);
                this.m_curr_mc = null;
            }
            if (this.m_curr_mc == null) {
                this.m_curr_mc = mc;
                console.log(this.m_curr_mc);
                this.addChild(this.m_curr_mc);
            }
            mc.gotoAndPlay(action, loop ? -1 : 1);
            this.m_curr_action = action;
        }
    };
    return AnimationMovieClip;
}(egret.DisplayObjectContainer));
__reflect(AnimationMovieClip.prototype, "AnimationMovieClip");
//# sourceMappingURL=AnimationMovieClip.js.map