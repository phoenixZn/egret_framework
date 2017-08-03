var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CoreGameInitInfo = (function () {
    function CoreGameInitInfo() {
        this.world_seed = 0;
        this.level_id = 0;
        this.player_pstids = new Array();
        this.player_openids = new Map();
    }
    return CoreGameInitInfo;
}());
__reflect(CoreGameInitInfo.prototype, "CoreGameInitInfo");
//# sourceMappingURL=ICoreGameFactory.js.map