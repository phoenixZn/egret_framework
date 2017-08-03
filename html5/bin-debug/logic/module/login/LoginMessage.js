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
// TypeScript file
var RequestMobileRoleLogin = (function (_super) {
    __extends(RequestMobileRoleLogin, _super);
    function RequestMobileRoleLogin() {
        var _this = _super.call(this) || this;
        _this.server_id = -1;
        return _this;
    }
    Object.defineProperty(RequestMobileRoleLogin.prototype, "CLSID", {
        get: function () {
            return MessageDef.Request_MobileRoleLogin;
        },
        enumerable: true,
        configurable: true
    });
    return RequestMobileRoleLogin;
}(RequestMessage));
__decorate([
    field(1)
], RequestMobileRoleLogin.prototype, "server_id", void 0);
RequestMobileRoleLogin = __decorate([
    protobuf
], RequestMobileRoleLogin);
__reflect(RequestMobileRoleLogin.prototype, "RequestMobileRoleLogin");
;
var ReplyMobileRoleLoginResult = (function (_super) {
    __extends(ReplyMobileRoleLoginResult, _super);
    function ReplyMobileRoleLoginResult() {
        var _this = _super.call(this) || this;
        _this.ret = -1;
        _this.char_info = new MobileCharInfo();
        return _this;
    }
    Object.defineProperty(ReplyMobileRoleLoginResult.prototype, "CLSID", {
        get: function () {
            return MessageDef.Reply_MobileRoleLoginResult;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyMobileRoleLoginResult;
}(ReplyMessage));
__decorate([
    field(1)
], ReplyMobileRoleLoginResult.prototype, "ret", void 0);
__decorate([
    field(2)
], ReplyMobileRoleLoginResult.prototype, "char_info", void 0);
ReplyMobileRoleLoginResult = __decorate([
    protobuf
], ReplyMobileRoleLoginResult);
__reflect(ReplyMobileRoleLoginResult.prototype, "ReplyMobileRoleLoginResult");
;
//# sourceMappingURL=LoginMessage.js.map