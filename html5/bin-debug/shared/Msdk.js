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
var Msdk;
(function (Msdk) {
    var CallbackRet = (function () {
        function CallbackRet() {
            this.flag = -1;
            this.desc = "";
            this.platform = 0;
        }
        return CallbackRet;
    }());
    __decorate([
        field(1)
    ], CallbackRet.prototype, "flag", void 0);
    __decorate([
        field(2)
    ], CallbackRet.prototype, "desc", void 0);
    __decorate([
        field(3)
    ], CallbackRet.prototype, "platform", void 0);
    CallbackRet = __decorate([
        protobuf
    ], CallbackRet);
    Msdk.CallbackRet = CallbackRet;
    __reflect(CallbackRet.prototype, "Msdk.CallbackRet");
    ;
    var TokenRet = (function () {
        function TokenRet() {
            this.type = 0;
            this.value = "";
            this.expiration = new Int64(0, 0);
        }
        return TokenRet;
    }());
    __decorate([
        field(1)
    ], TokenRet.prototype, "type", void 0);
    __decorate([
        field(2)
    ], TokenRet.prototype, "value", void 0);
    __decorate([
        field(3)
    ], TokenRet.prototype, "expiration", void 0);
    TokenRet = __decorate([
        protobuf
    ], TokenRet);
    Msdk.TokenRet = TokenRet;
    __reflect(TokenRet.prototype, "Msdk.TokenRet");
    ;
    var LoginRet = (function (_super) {
        __extends(LoginRet, _super);
        function LoginRet() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.open_id = "";
            _this.user_id = "";
            _this.pf = "";
            _this.pf_key = "";
            _this.token = new Array();
            return _this;
        }
        return LoginRet;
    }(CallbackRet));
    __decorate([
        field(10)
    ], LoginRet.prototype, "open_id", void 0);
    __decorate([
        field(11)
    ], LoginRet.prototype, "user_id", void 0);
    __decorate([
        field(12)
    ], LoginRet.prototype, "pf", void 0);
    __decorate([
        field(13)
    ], LoginRet.prototype, "pf_key", void 0);
    __decorate([
        field(14, "array", "TokenRet")
    ], LoginRet.prototype, "token", void 0);
    LoginRet = __decorate([
        protobuf
    ], LoginRet);
    Msdk.LoginRet = LoginRet;
    __reflect(LoginRet.prototype, "Msdk.LoginRet");
    ;
})(Msdk || (Msdk = {}));
//# sourceMappingURL=Msdk.js.map