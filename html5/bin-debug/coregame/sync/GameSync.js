var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FrameInfo = (function () {
    function FrameInfo() {
        this.frame = -1;
        this.commands = new Array();
    }
    return FrameInfo;
}());
__reflect(FrameInfo.prototype, "FrameInfo");
var GameSync = (function () {
    function GameSync() {
        this.m_frames = new Array();
        this.m_timer = new GameTimer();
        this.m_curr_frame = 0;
    }
    GameSync.prototype.Init = function () {
    };
    GameSync.prototype.Prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    GameSync.prototype.Start = function (latency) {
        this.m_timer.Start(latency);
    };
    // ICommnadSync 
    GameSync.prototype.SendCommnad = function (cmd) {
    };
    GameSync.prototype.SendCommnads = function (cmds) {
    };
    GameSync.prototype.HandleCommnads = function (frame, cmd) {
    };
    GameSync.prototype.Update = function () {
        this.m_timer.Update();
    };
    Object.defineProperty(GameSync.prototype, "CurrFrame", {
        get: function () {
            return this.m_curr_frame;
        },
        enumerable: true,
        configurable: true
    });
    GameSync.prototype.PopFrame = function () {
        if (this.m_frames.length > 0) {
            var frame = this.m_timer.CurrFrame;
            if (this.m_frames[0].frame <= frame) {
                this.m_curr_frame = this.m_frames[0].frame;
                return this.m_frames.shift();
            }
            else {
                egret.log("wait..." + (this.m_frames[0].frame - frame) + "..." + this.m_frames.length);
            }
        }
        return null;
    };
    return GameSync;
}());
__reflect(GameSync.prototype, "GameSync", ["ICommnadSync"]);
//# sourceMappingURL=GameSync.js.map