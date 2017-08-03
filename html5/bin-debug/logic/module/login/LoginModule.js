var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var ClientInfo = (function () {
    function ClientInfo() {
        this.platform_anios = 0;
        this.client_version = "0.0.0.0";
        this.platform_qqwx = 0;
        this.server_list_md5 = "";
        this.device_info = "";
        this.fps = 0;
        this.internet_type = 0;
        this.reg_channel = "";
        this.login_channel = "";
        this.launch_channel = 0;
        this.operatingSystem = "";
        this.processorType = "";
        this.processorCount = 0;
        this.systemMemorySize = 0;
        this.graphicsMemorySize = 0;
        this.graphicsDeviceName = "";
        this.graphicsDeviceVendor = "";
        this.graphicsDeviceID = 0;
        this.graphicsDeviceVendorID = 0;
        this.graphicsDeviceVersion = "";
        this.graphicsShaderLevel = 0;
        this.supportsShadows = false;
        this.supportsRenderTextures = false;
        this.supportsImageEffects = false;
        this.deviceUniqueIdentifier = "";
        this.deviceName = "";
        this.deviceModel = "";
        this.lodLevel = 0;
        this.is_guest = false;
    }
    return ClientInfo;
}());
__decorate([
    field(1)
], ClientInfo.prototype, "platform_anios", void 0);
__decorate([
    field(2)
], ClientInfo.prototype, "client_version", void 0);
__decorate([
    field(3)
], ClientInfo.prototype, "platform_qqwx", void 0);
__decorate([
    field(4)
], ClientInfo.prototype, "server_list_md5", void 0);
__decorate([
    field(5)
], ClientInfo.prototype, "device_info", void 0);
__decorate([
    field(6)
], ClientInfo.prototype, "fps", void 0);
__decorate([
    field(7)
], ClientInfo.prototype, "internet_type", void 0);
__decorate([
    field(8)
], ClientInfo.prototype, "reg_channel", void 0);
__decorate([
    field(9)
], ClientInfo.prototype, "login_channel", void 0);
__decorate([
    field(10)
], ClientInfo.prototype, "launch_channel", void 0);
__decorate([
    field(11)
], ClientInfo.prototype, "operatingSystem", void 0);
__decorate([
    field(12)
], ClientInfo.prototype, "processorType", void 0);
__decorate([
    field(13)
], ClientInfo.prototype, "processorCount", void 0);
__decorate([
    field(14)
], ClientInfo.prototype, "systemMemorySize", void 0);
__decorate([
    field(15)
], ClientInfo.prototype, "graphicsMemorySize", void 0);
__decorate([
    field(16)
], ClientInfo.prototype, "graphicsDeviceName", void 0);
__decorate([
    field(17)
], ClientInfo.prototype, "graphicsDeviceVendor", void 0);
__decorate([
    field(18)
], ClientInfo.prototype, "graphicsDeviceID", void 0);
__decorate([
    field(19)
], ClientInfo.prototype, "graphicsDeviceVendorID", void 0);
__decorate([
    field(20)
], ClientInfo.prototype, "graphicsDeviceVersion", void 0);
__decorate([
    field(21)
], ClientInfo.prototype, "graphicsShaderLevel", void 0);
__decorate([
    field(22)
], ClientInfo.prototype, "supportsShadows", void 0);
__decorate([
    field(23)
], ClientInfo.prototype, "supportsRenderTextures", void 0);
__decorate([
    field(24)
], ClientInfo.prototype, "supportsImageEffects", void 0);
__decorate([
    field(25)
], ClientInfo.prototype, "deviceUniqueIdentifier", void 0);
__decorate([
    field(26)
], ClientInfo.prototype, "deviceName", void 0);
__decorate([
    field(27)
], ClientInfo.prototype, "deviceModel", void 0);
__decorate([
    field(28)
], ClientInfo.prototype, "lodLevel", void 0);
__decorate([
    field(29)
], ClientInfo.prototype, "is_guest", void 0);
ClientInfo = __decorate([
    protobuf
], ClientInfo);
__reflect(ClientInfo.prototype, "ClientInfo");
;
var LoginModule = (function (_super) {
    __extends(LoginModule, _super);
    function LoginModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.charinfo = new MobileCharInfo();
        return _this;
    }
    LoginModule.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestMobileLogin();
                        msg.login_info.open_id = GameGlobal.GameLogic.Account;
                        msg.login_info.desc = GameGlobal.GameLogic.Account;
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "expecting ReplyMobileLogin";
                        return [2 /*return*/, res.m_n_ret];
                }
            });
        });
    };
    LoginModule.prototype.RoleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestMobileRoleLogin();
                        msg.server_id = 1;
                        egret.log(msg);
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "expecting ReplyMobileRoleLoginResult";
                        this.charinfo = res.char_info;
                        return [2 /*return*/, res.ret];
                }
            });
        });
    };
    LoginModule.prototype.Pstid = function () {
        return this.charinfo.pstid;
    };
    return LoginModule;
}(GameModule));
__reflect(LoginModule.prototype, "LoginModule");
;
//# sourceMappingURL=LoginModule.js.map