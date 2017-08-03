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
var GameModule = (function () {
    function GameModule() {
    }
    GameModule.prototype.SendMessageOnly = function (msg) {
        this.m_callcenter.SendMessageOnly(msg);
    };
    GameModule.prototype.SendMessage = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.m_callcenter.Request(req)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GameModule.prototype.Init = function () {
    };
    GameModule.prototype.Destroy = function () {
    };
    GameModule.prototype.SetAddress = function (ip, port, proxy) {
        this.m_callcenter.SetAddress(ip, port, proxy);
    };
    Object.defineProperty(GameModule.prototype, "ModuleManager", {
        set: function (mng) {
            this.m_module_manager = mng;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameModule.prototype, "CallCenter", {
        get: function () {
            return this.m_callcenter;
        },
        set: function (cc) {
            this.m_callcenter = cc;
        },
        enumerable: true,
        configurable: true
    });
    GameModule.prototype.GetModule = function (t) {
        return this.m_module_manager.GetModule(t);
    };
    return GameModule;
}());
__reflect(GameModule.prototype, "GameModule");
var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["Game"] = 0] = "Game";
    ModuleType[ModuleType["Bulletin"] = 1] = "Bulletin";
    ModuleType[ModuleType["Match"] = 2] = "Match";
})(ModuleType || (ModuleType = {}));
var GameModuleManager = (function () {
    function GameModuleManager() {
        this.m_modules = new Map();
        this.m_module_fac = new ModuleFactory();
    }
    GameModuleManager.prototype.Init = function () {
        this.m_module_fac.Init(this);
    };
    GameModuleManager.prototype.AddModule = function (t, type) {
        var module = new t();
        module.ModuleManager = this;
        if (type == ModuleType.Game) {
            module.CallCenter = GameGlobal.GameLogic.Game;
        }
        else if (type == ModuleType.Bulletin) {
            module.CallCenter = GameGlobal.GameLogic.Bulletin;
        }
        else if (type == ModuleType.Match) {
            module.CallCenter = GameGlobal.GameLogic.Match;
        }
        module.Init();
        this.m_modules.set(t.prototype, module);
    };
    GameModuleManager.prototype.GetModule = function (t) {
        return this.m_modules.get(t.prototype);
    };
    return GameModuleManager;
}());
__reflect(GameModuleManager.prototype, "GameModuleManager");
//# sourceMappingURL=GameModule.js.map