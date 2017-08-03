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
var UIBase = (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UIBase.prototype, "Name", {
        get: function () {
            return this.m_name;
        },
        set: function (name) {
            this.m_name = name;
        },
        enumerable: true,
        configurable: true
    });
    UIBase.prototype.EnterUI = function () {
    };
    UIBase.prototype.LeaveUI = function () {
    };
    UIBase.prototype.LoadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return UIBase;
}(eui.Component));
__reflect(UIBase.prototype, "UIBase");
var UIManager = (function () {
    function UIManager() {
        this.m_ui_root = new eui.UILayer();
        this.m_ui_fac = new UIFactory();
        this.m_curr_ui = new Array();
    }
    Object.defineProperty(UIManager.prototype, "UIRoot", {
        get: function () {
            return this.m_ui_root;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.Init = function () {
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        GameGlobal.Stage.addChild(this.UIRoot);
        this.m_ui_fac.Init();
    };
    UIManager.prototype.Prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RES.loadGroup("eui")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.LoadTheme()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UIManager.prototype.LoadTheme = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve) {
                    var theme = new eui.Theme("resource/default.thm.json", GameGlobal.Stage);
                    theme.once(eui.UIEvent.COMPLETE, function () { resolve(); }, _this);
                });
                return [2 /*return*/, promise];
            });
        });
    };
    UIManager.prototype.ShowUI = function (name) {
        var ui = this.m_ui_fac.Create(name);
        ui.Name = name;
        ui.EnterUI();
        this.m_curr_ui.push(ui);
        this.m_ui_root.addChild(ui);
        ui.LoadData();
    };
    UIManager.prototype.HideUI = function (name) {
        for (var i = 0; i < this.m_curr_ui.length; i++) {
            var ui = this.m_curr_ui[i];
            if (ui.Name == name) {
                ui.LeaveUI();
                this.m_ui_root.removeChild(ui);
                this.m_curr_ui.splice(i, 1);
                break;
            }
        }
    };
    UIManager.prototype.HideAll = function () {
        for (var i = 0; i < this.m_curr_ui.length; i++) {
            var ui = this.m_curr_ui[i];
            ui.LeaveUI();
            this.m_ui_root.removeChild(ui);
        }
        this.m_curr_ui = new Array();
    };
    UIManager.prototype.SwitchUI = function (name) {
        this.HideAll();
        this.ShowUI(name);
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map