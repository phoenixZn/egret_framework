var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WorldCreationContext = (function (_super) {
    __extends(WorldCreationContext, _super);
    function WorldCreationContext() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_level_id = -1;
        _this.m_game_mode = -1;
        _this.m_world_seed = -1;
        _this.m_pstid2proxyid = new Map();
        _this.m_proxyid2pstid = new Map();
        _this.m_entities = new Array();
        return _this;
    }
    return WorldCreationContext;
}(ObjectCreationContext));
__reflect(WorldCreationContext.prototype, "WorldCreationContext");
//# sourceMappingURL=WorldCreationContext.js.map