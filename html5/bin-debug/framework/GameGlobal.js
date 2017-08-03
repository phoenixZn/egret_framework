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
var GameGlobal = (function () {
    function GameGlobal() {
        this.m_audio_manager = new AudioManager;
        this.m_ui_manager = new UIManager;
        this.m_game_logic = new GameLogic;
        this.m_state_manager = new StateManager;
    }
    Object.defineProperty(GameGlobal, "Instance", {
        get: function () {
            return GameGlobal.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "Stage", {
        get: function () {
            return GameGlobal.Instance.m_stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "Stage3D", {
        get: function () {
            return GameGlobal.Instance.m_stage3d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "CoreGame", {
        get: function () {
            return GameGlobal.Instance.m_core_game;
        },
        set: function (cg) {
            GameGlobal.Instance.m_core_game = cg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "AudioManager", {
        get: function () {
            return GameGlobal.Instance.m_audio_manager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "UIManager", {
        get: function () {
            return GameGlobal.Instance.m_ui_manager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "GameLogic", {
        get: function () {
            return GameGlobal.Instance.m_game_logic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameGlobal, "StateManager", {
        get: function () {
            return GameGlobal.Instance.m_state_manager;
        },
        enumerable: true,
        configurable: true
    });
    GameGlobal.prototype.Init = function (stage, stage3d) {
        this.m_stage = stage;
        this.m_stage3d = stage3d;
        this.m_game_logic.Init();
        this.m_audio_manager.Init();
        this.m_ui_manager.Init();
        this.m_state_manager.Init();
        // this.m_core_game = new CoreGame();
        // this.m_core_game.Init();
    };
    GameGlobal.prototype.Prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // await this.m_core_game.Prepare();
                    return [4 /*yield*/, this.m_ui_manager.Prepare()];
                    case 1:
                        // await this.m_core_game.Prepare();
                        _a.sent();
                        return [4 /*yield*/, this.m_audio_manager.LoadBGM("sound/music_01.mp3")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameGlobal.prototype.Start = function () {
        this.m_stage.addEventListener(egret.Event.ENTER_FRAME, this.FrameUpdate, this);
        this.m_ui_manager.SwitchUI(UIName.Login);
        // this.m_core_game.Start();
    };
    GameGlobal.prototype.FrameUpdate = function () {
        this.m_game_logic.Update();
        if (this.m_core_game != null) {
            this.m_core_game.Update();
        }
    };
    return GameGlobal;
}());
GameGlobal.s_instance = new GameGlobal;
__reflect(GameGlobal.prototype, "GameGlobal");
//# sourceMappingURL=GameGlobal.js.map