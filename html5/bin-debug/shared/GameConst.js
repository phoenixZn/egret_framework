var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    return GameConst;
}());
GameConst.LogicFrameLength = 33;
GameConst.LogicFrameRate = 1000 / GameConst.LogicFrameLength;
GameConst.RequestTTL = 15 * 1000;
__reflect(GameConst.prototype, "GameConst");
//# sourceMappingURL=GameConst.js.map