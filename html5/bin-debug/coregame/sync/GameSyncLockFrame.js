var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameSyncLockFrame = (function (_super) {
    __extends(GameSyncLockFrame, _super);
    function GameSyncLockFrame() {
        var _this = _super.call(this) || this;
        _this.m_first_sync = false;
        return _this;
    }
    GameSyncLockFrame.prototype.Init = function () {
        this.m_call_center = GameGlobal.GameLogic.Game;
    };
    GameSyncLockFrame.prototype.SendCommnads = function (cmds) {
        var msg = new InGameSyncCommands();
        msg.commands = cmds;
        msg.ToBuff();
        this.m_call_center.SendMessageOnly(msg);
        if (!this.m_first_sync) {
            this.m_first_sync = true;
            this.m_timer.Update();
            egret.log("first sync, frame:" + this.m_timer.CurrFrame + " " + egret.getTimer());
        }
    };
    GameSyncLockFrame.prototype.HandleCommnads = function (frame, cmds) {
        var info = new FrameInfo();
        info.frame = frame;
        info.commands = cmds;
        this.m_frames.push(info);
    };
    return GameSyncLockFrame;
}(GameSync));
__reflect(GameSyncLockFrame.prototype, "GameSyncLockFrame");
//# sourceMappingURL=GameSyncLockFrame.js.map