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
var CoreGameStatus;
(function (CoreGameStatus) {
    CoreGameStatus[CoreGameStatus["None"] = 0] = "None";
    CoreGameStatus[CoreGameStatus["Loading"] = 1] = "Loading";
    CoreGameStatus[CoreGameStatus["Running"] = 2] = "Running";
    CoreGameStatus[CoreGameStatus["GameOver"] = 3] = "GameOver";
})(CoreGameStatus || (CoreGameStatus = {}));
var CoreGame = (function () {
    function CoreGame() {
        this.m_status = CoreGameStatus.None;
        this.m_recv_count = 0;
        this.m_send_count = 0;
        this.m_last_tick = egret.getTimer();
    }
    Object.defineProperty(CoreGame.prototype, "Logic", {
        get: function () {
            return this.m_logic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreGame.prototype, "Render", {
        get: function () {
            return this.m_render;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoreGame.prototype, "Sync", {
        get: function () {
            return this.m_sync;
        },
        enumerable: true,
        configurable: true
    });
    CoreGame.prototype.CreateCoreGameFactory = function () {
        return new BubbleCoreGameFactory();
    };
    CoreGame.prototype.Init = function (init_info) {
        egret.log("CoreGame.Init()");
        this.m_coregame_factory = this.CreateCoreGameFactory();
        this.m_coregame_factory.RegisterComponents();
        this.m_coregame_factory.RegisterCommands();
        this.m_coregame_factory.RegisterRenderMessages();
        //组件初始化
        this.m_logic = this.m_coregame_factory.CreateLogicWorld();
        this.m_render = this.m_coregame_factory.CreateRenderWorld();
        //this.m_sync = new GameSyncLocal();
        this.m_sync = new GameSyncLockFrame();
        var worldcontext = this.m_coregame_factory.CreateWorldCreationContext(init_info);
        this.m_logic.Init(worldcontext);
        this.m_render.Init(this.m_logic, this.m_sync);
        this.m_sync.Init();
    };
    CoreGame.prototype.Prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //资源装载
                        this.m_status = CoreGameStatus.Loading;
                        egret.log("m_logic.Prepare()");
                        return [4 /*yield*/, this.m_logic.Prepare()];
                    case 1:
                        _a.sent();
                        egret.log("m_render.Prepare()");
                        return [4 /*yield*/, this.m_render.Prepare()];
                    case 2:
                        _a.sent();
                        egret.log("m_sync.Prepare()");
                        return [4 /*yield*/, this.m_sync.Prepare()];
                    case 3:
                        _a.sent();
                        egret.log("CoreGame ready");
                        return [2 /*return*/];
                }
            });
        });
    };
    CoreGame.prototype.Start = function (latency) {
        egret.log("CoreGame.Start()");
        this.m_sync.Start(latency);
        this.m_logic.Start();
        this.m_render.Start();
        this.m_status = CoreGameStatus.Running;
    };
    CoreGame.prototype.Update = function () {
        if (this.m_status == CoreGameStatus.Running) {
            this.m_sync.Update();
            var frame = this.m_sync.PopFrame();
            while (frame != null) {
                this.m_recv_count += frame.commands.length;
                this.m_logic.HandleCommands(frame.commands);
                this.m_logic.Update();
                for (var _i = 0, _a = frame.commands; _i < _a.length; _i++) {
                    var cmd = _a[_i];
                    var op = cmd;
                    egret.log("HandleCommands, x:" + op.m_opX + ", y:" + op.m_opY);
                }
                frame = this.m_sync.PopFrame();
            }
            this.m_render.Update();
            var cmds = this.m_render.PopCommands();
            this.m_sync.SendCommnads(cmds);
            this.m_send_count += cmds.length;
            var tick = egret.getTimer();
            if (tick - this.m_last_tick > 1000) {
                //egret.log("cmd processed: " + this.m_recv_count + "," + this.m_send_count + "," + (this.m_send_count - this.m_recv_count));
                this.m_last_tick = tick;
            }
        }
    };
    CoreGame.prototype.Running = function () {
        return this.m_status == CoreGameStatus.Running;
    };
    return CoreGame;
}());
__reflect(CoreGame.prototype, "CoreGame");
//# sourceMappingURL=CoreGame.js.map