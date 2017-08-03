var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActorMoveCtrlCmpt = (function (_super) {
    __extends(ActorMoveCtrlCmpt, _super);
    function ActorMoveCtrlCmpt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_moveDir = null;
        _this.m_is_stop = true;
        _this.m_pos_cmpt = null;
        return _this;
    }
    ActorMoveCtrlCmpt.prototype.PostInitializeComponent = function () {
        _super.prototype.PostInitializeComponent.call(this);
        this.m_pos_cmpt = this.Owner.GetComponent(PositionComponent);
    };
    ActorMoveCtrlCmpt.prototype.OnDestruct = function () {
    };
    ActorMoveCtrlCmpt.prototype.SetMoveDir = function (moveDir) {
        this.m_moveDir = moveDir;
    };
    ActorMoveCtrlCmpt.prototype.GetMoveDir = function () {
        return this.m_moveDir;
    };
    ActorMoveCtrlCmpt.prototype.IsStop = function () {
        return this.m_is_stop;
    };
    ActorMoveCtrlCmpt.prototype.Update = function () {
        if (this.m_is_stop)
            return;
        var z = this.m_pos_cmpt.Pos.z + this.m_moveDir.z * 5;
        var x = this.m_pos_cmpt.Pos.x + this.m_moveDir.x * 5;
        this.m_pos_cmpt.Pos.z = z;
        this.m_pos_cmpt.Pos.x = x;
    };
    return ActorMoveCtrlCmpt;
}(EntityComponent));
__reflect(ActorMoveCtrlCmpt.prototype, "ActorMoveCtrlCmpt");
//# sourceMappingURL=ActorMoveCtrlCmpt.js.map