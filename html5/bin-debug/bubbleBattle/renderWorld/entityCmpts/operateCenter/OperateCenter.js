var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//把摇杆、虚拟摇杆、键盘、等操作状态转变为 原始操作信息传出去
var OperateCenter = (function () {
    function OperateCenter() {
        this.m_OperationHandlers = new Array();
        this.m_Operates = new Array();
        this.mLastJoystackDir = new egret.Point(0, 0);
        this.mLastJoystackDirIndex = -1;
        this.mJoystack = null;
    }
    OperateCenter.prototype.Init = function (joystack) {
        this.mJoystack = joystack;
    };
    OperateCenter.prototype.Update = function () {
        this.CheckOperate();
        this.HandleOperate();
    };
    OperateCenter.prototype.CheckOperate = function () {
        this.m_Operates.splice(0);
        this.CheckJoystack();
    };
    OperateCenter.prototype.CheckJoystack = function () {
        if (this.mJoystack == null)
            return;
        var dir = this.mJoystack.CurDir();
        var dir_index = Dir8Converter.GetDirIndex(dir);
        //if (dir_index != this.mLastJoystackDirIndex)
        if (true) {
            //if (dir_index == -1)
            if (dir.length < 0.1) {
                var op = new Operation();
                op.opType = OperationType.Op_JoystackRelease;
                op.x = this.mLastJoystackDir.x;
                op.y = this.mLastJoystackDir.y;
                this.m_Operates.push(op);
            }
            else {
                var op1 = new Operation();
                op1.opType = OperationType.Op_JoystackMove;
                op1.x = dir.x;
                op1.y = dir.y;
                this.m_Operates.push(op1);
            }
        }
        this.mLastJoystackDir = dir;
        this.mLastJoystackDirIndex = dir_index;
    };
    OperateCenter.prototype.HandleOperate = function () {
        for (var _i = 0, _a = this.m_Operates; _i < _a.length; _i++) {
            var op = _a[_i];
            for (var _b = 0, _c = this.m_OperationHandlers; _b < _c.length; _b++) {
                var oph = _c[_b];
                oph.HandleOperation(op);
            }
        }
    };
    OperateCenter.prototype.Reg = function (OpHandler) {
        this.m_OperationHandlers.push(OpHandler);
    };
    OperateCenter.prototype.UnReg = function (OpHandler) {
        var findindex = -1;
        for (var i = 0; i < this.m_OperationHandlers.length; i++) {
            if (this.m_OperationHandlers[i] == OpHandler) {
                findindex = i;
                break;
            }
        }
        if (findindex != -1) {
            this.m_OperationHandlers.splice(findindex, 1);
        }
    };
    return OperateCenter;
}());
__reflect(OperateCenter.prototype, "OperateCenter");
//# sourceMappingURL=OperateCenter.js.map