var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActorCmpt = (function (_super) {
    __extends(ActorCmpt, _super);
    function ActorCmpt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_move_cmpt = null;
        return _this;
    }
    ActorCmpt.prototype.PostInitializeComponent = function () {
        _super.prototype.PostInitializeComponent.call(this);
        this.m_move_cmpt = this.Owner.GetComponent(ActorMoveCtrlCmpt);
    };
    ActorCmpt.prototype.OnDestruct = function () {
    };
    ActorCmpt.prototype.HandleOperation = function (op) {
        if (op.opType == OperationType.Op_JoystackMove) {
            this.m_move_cmpt.SetMoveDir(new egret3d.Vector3D(op.x, 0, -op.y));
            this.m_move_cmpt.m_is_stop = false;
        }
        else if (op.opType == OperationType.Op_JoystackRelease) {
            this.m_move_cmpt.m_is_stop = true;
        }
    };
    return ActorCmpt;
}(EntityComponent));
__reflect(ActorCmpt.prototype, "ActorCmpt");
//# sourceMappingURL=ActorCmpt.js.map