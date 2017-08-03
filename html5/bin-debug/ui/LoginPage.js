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
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        return _super.call(this) || this;
    }
    LoginPage.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LoginPage.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.username.$setText("player_" + Math.round(Math.random() * 10000));
    };
    LoginPage.prototype.onClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, bulletin, login, server, panel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = 0;
                        // 读帐号
                        GameGlobal.GameLogic.Account = this.username.$getText();
                        egret.log("username is " + GameGlobal.GameLogic.Account);
                        GameGlobal.AudioManager.PlayBGM();
                        bulletin = GameGlobal.GameLogic.ModuleManager.GetModule(BulletinModule);
                        login = GameGlobal.GameLogic.ModuleManager.GetModule(LoginModule);
                        if (!(bulletin && login)) return [3 /*break*/, 11];
                        egret.log("logging in to " + this.ip.$getText());
                        bulletin.SetAddress(this.ip.$getText(), 8111, "ws://172.17.100.111:9501");
                        // egret.log("about to perform protobuf test");
                        // res = await bulletin.TestProtobuf();
                        // egret.log("protobuf test returns " + res);
                        egret.log("about to login to bulletin");
                        return [4 /*yield*/, bulletin.Login()];
                    case 1:
                        res = _a.sent();
                        egret.log("login to bulletin returns " + res);
                        if (!(res == 0)) return [3 /*break*/, 10];
                        egret.log("about to get server info");
                        return [4 /*yield*/, bulletin.GetServerInfo()];
                    case 2:
                        res = _a.sent();
                        egret.log("get server info returns " + res);
                        return [4 /*yield*/, bulletin.GetDefaultServerInfo()];
                    case 3:
                        res = _a.sent();
                        egret.log("get default server info returns " + res);
                        server = bulletin.DefaultServer;
                        login.SetAddress(server.ip, server.port, "ws://172.17.100.111:9501");
                        egret.log("about to login to game");
                        return [4 /*yield*/, login.Login()];
                    case 4:
                        res = _a.sent();
                        egret.log("login to game returns " + res);
                        _a.label = 5;
                    case 5:
                        if (!(res == 2)) return [3 /*break*/, 8];
                        return [4 /*yield*/, new Promise(function (resolve) { setTimeout(resolve, 1000); })];
                    case 6:
                        _a.sent();
                        egret.log("about to login to game again");
                        return [4 /*yield*/, login.Login()];
                    case 7:
                        res = _a.sent();
                        egret.log("login to game returns " + res);
                        return [3 /*break*/, 5];
                    case 8:
                        if (!(res == 0)) return [3 /*break*/, 10];
                        egret.log("about to role login to game");
                        return [4 /*yield*/, login.RoleLogin()];
                    case 9:
                        res = _a.sent();
                        egret.log("role login to game returns " + res + ", pstid=" + login.Pstid().toOctetString());
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        egret.log("bulletin/login is null");
                        _a.label = 12;
                    case 12:
                        if (res == 0) {
                            GameGlobal.UIManager.SwitchUI(UIName.Match);
                        }
                        else {
                            panel = new eui.Panel();
                            panel.title = "登陆失败";
                            panel.horizontalCenter = 0;
                            panel.verticalCenter = 0;
                            this.addChild(panel);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginPage;
}(UIBase));
__reflect(LoginPage.prototype, "LoginPage");
//# sourceMappingURL=LoginPage.js.map