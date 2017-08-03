var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameSyncLocal = (function (_super) {
    __extends(GameSyncLocal, _super);
    function GameSyncLocal() {
        return _super.call(this) || this;
    }
    GameSyncLocal.prototype.SendCommnads = function (cmds) {
        var curr_frame = this.m_timer.CurrFrame + 1;
        var frame = null;
        if (this.m_frames.length > 0 && this.m_frames[0].frame == curr_frame) {
            frame = this.m_frames[0];
        }
        else {
            frame = new FrameInfo();
            frame.frame = this.m_timer.CurrFrame + 1;
            this.m_frames.push(frame);
        }
        frame.commands = frame.commands.concat(cmds);
    };
    return GameSyncLocal;
}(GameSync));
__reflect(GameSyncLocal.prototype, "GameSyncLocal");
//# sourceMappingURL=GameSyncLocal.js.map