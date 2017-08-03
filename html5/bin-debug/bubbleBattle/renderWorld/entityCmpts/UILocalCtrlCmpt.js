var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UILocalCtrlCmpt = (function (_super) {
    __extends(UILocalCtrlCmpt, _super);
    function UILocalCtrlCmpt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mUIOperateCenter = new OperateCenter();
        return _this;
    }
    Object.defineProperty(UILocalCtrlCmpt.prototype, "UIOperateCenter", {
        get: function () {
            return this.mUIOperateCenter;
        },
        enumerable: true,
        configurable: true
    });
    UILocalCtrlCmpt.prototype.PostInitializeComponent = function () {
        _super.prototype.PostInitializeComponent.call(this);
        this.SetUILocal();
    };
    UILocalCtrlCmpt.prototype.SetUILocal = function () {
        var render_world = this.Owner.GetRenderWorld();
        this.mUIOperateCenter.Init(render_world.m_joystick);
        this.mUIOperateCenter.Reg(this);
    };
    UILocalCtrlCmpt.prototype.OnDestruct = function () {
        _super.prototype.OnDestruct.call(this);
        this.mUIOperateCenter.UnReg(this);
    };
    UILocalCtrlCmpt.prototype.HandleOperation = function (op) {
        var cmd = new OperationCommand();
        cmd.m_entity_id = this.LogicEntityID;
        cmd.m_opType = op.opType;
        cmd.m_opX = op.x;
        cmd.m_opY = op.y;
        //egret.log("PushLocalCommand type:" + op.opType + ", x:", op.x + ", y:", op.y);
        this.Owner.GetRenderWorld().PushLocalCommand(cmd);
        return true;
    };
    UILocalCtrlCmpt.prototype.Update = function () {
        this.mUIOperateCenter.Update();
    };
    return UILocalCtrlCmpt;
}(RenderEntityComponent));
__reflect(UILocalCtrlCmpt.prototype, "UILocalCtrlCmpt", ["IOperationHandler"]);
//# sourceMappingURL=UILocalCtrlCmpt.js.map