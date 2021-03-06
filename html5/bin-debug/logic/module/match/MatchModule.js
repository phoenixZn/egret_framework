var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var MatchModule = (function (_super) {
    __extends(MatchModule, _super);
    function MatchModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_latency = 0;
        return _this;
    }
    MatchModule.prototype.Init = function () {
        this.CallCenter.Listen(MessageDef.InGame_StartLoading, this.OnStartLoading, this);
        this.CallCenter.Listen(MessageDef.InGame_StartGame, this.OnStartGame, this);
        this.CallCenter.Listen(MessageDef.InGame_SyncCommands, this.OnSyncCommands, this);
        this.CallCenter.Listen(MessageDef.InGame_GameOver, this.OnGameOver, this);
        this.CallCenter.Listen(MessageDef.InGame_Ping, this.OnPing, this);
        this.CallCenter.Listen(MessageDef.InGame_HeartBeat, this.OnHeartBeat, this);
    };
    MatchModule.prototype.ApplyMatch = function (level_id) {
        if (level_id === void 0) { level_id = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res, msg_ping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestApplyMatch();
                        msg.m_level_id = level_id;
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "expecting ReplyApplyMatch";
                        msg_ping = new InGamePing();
                        msg_ping.send_time = egret.getTimer();
                        this.CallCenter.SendMessageOnly(msg_ping);
                        egret.log("request start " + egret.getTimer());
                        return [2 /*return*/, res.ret];
                }
            });
        });
    };
    MatchModule.prototype.OnStartLoading = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var info, msg_complete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.log("start loading " + egret.getTimer());
                        GameGlobal.CoreGame = this.m_core_game = new CoreGame();
                        info = new CoreGameInitInfo();
                        info.world_seed = msg.world_seed;
                        info.level_id = msg.level_id;
                        info.player_pstids = msg.player_pstids;
                        info.player_openids = msg.player_openids;
                        this.m_core_game.Init(info);
                        return [4 /*yield*/, this.m_core_game.Prepare()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Sleep(100)];
                    case 2:
                        _a.sent();
                        egret.log("loading complete " + egret.getTimer());
                        msg_complete = new InGameLoadingComplete();
                        this.CallCenter.SendMessageOnly(msg_complete);
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchModule.prototype.OnStartGame = function (msg) {
        egret.log("start game " + egret.getTimer());
        this.m_core_game.Start(this.m_latency);
    };
    MatchModule.prototype.OnSyncCommands = function (msg) {
        msg.FromBuff();
        this.m_core_game.Sync.HandleCommnads(msg.turn, msg.commands);
    };
    MatchModule.prototype.OnGameOver = function (msg) {
    };
    MatchModule.prototype.OnPing = function (msg) {
        this.m_latency = egret.getTimer() - msg.send_time;
        egret.log("InGamePing, latency=" + this.m_latency + "ms " + egret.getTimer());
    };
    MatchModule.prototype.OnHeartBeat = function (msg) {
        var latency = (egret.getTimer() - msg.send_time) / 2;
        egret.log("InGameHeartBeat, latency=" + latency + "ms");
    };
    return MatchModule;
}(GameModule));
__reflect(MatchModule.prototype, "MatchModule");
;
//# sourceMappingURL=MatchModule.js.map