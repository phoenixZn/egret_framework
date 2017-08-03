var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameTimer = (function () {
    function GameTimer() {
        this.m_latency = 0;
    }
    Object.defineProperty(GameTimer.prototype, "CurrFrame", {
        get: function () {
            return this.m_curr_frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameTimer.prototype, "LastFrame", {
        get: function () {
            return this.m_last_frame;
        },
        enumerable: true,
        configurable: true
    });
    GameTimer.prototype.Start = function (latency) {
        this.m_curr_frame = this.m_last_frame = 1;
        this.m_start_time = egret.getTimer();
        this.m_latency = latency;
        var delay = 100 - this.m_latency;
        if (delay < 0)
            delay = 0;
        this.m_start_time += delay;
        egret.log("start timer " + egret.getTimer());
    };
    GameTimer.prototype.Update = function () {
        var curr_time = egret.getTimer();
        var elapsed_time = curr_time - this.m_start_time;
        this.m_last_frame = this.m_curr_frame;
        var curr_frame = Math.ceil(elapsed_time / GameConst.LogicFrameLength) + 1;
        if (curr_frame != this.m_curr_frame) {
            this.m_curr_frame = curr_frame;
        }
    };
    return GameTimer;
}());
__reflect(GameTimer.prototype, "GameTimer");
//# sourceMappingURL=GameTimer.js.map