/// <reference path="../../network/Protobuf.ts"/>
/// <reference path="MessageDef.ts"/>
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
var MOBILE_LOGIN_ERROR;
(function (MOBILE_LOGIN_ERROR) {
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_OK"] = 0] = "MOBILE_LOGIN_OK";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_MSDK_ERROR"] = 1] = "MOBILE_LOGIN_MSDK_ERROR";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_KICK_PLAYER"] = 2] = "MOBILE_LOGIN_KICK_PLAYER";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_SERVER_LIMIT"] = 3] = "MOBILE_LOGIN_SERVER_LIMIT";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_EMPTY_OPENID"] = 4] = "MOBILE_LOGIN_EMPTY_OPENID";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_LOW_VERSION"] = 5] = "MOBILE_LOGIN_LOW_VERSION";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_SERVER_MAINTAIN"] = 6] = "MOBILE_LOGIN_SERVER_MAINTAIN";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_SEESION_ERROR"] = 7] = "MOBILE_LOGIN_SEESION_ERROR";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_BANNED"] = 8] = "MOBILE_LOGIN_BANNED";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_HIGH_VERSION"] = 9] = "MOBILE_LOGIN_HIGH_VERSION";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_NOT_ACTIVITY"] = 10] = "MOBILE_LOGIN_NOT_ACTIVITY";
    MOBILE_LOGIN_ERROR[MOBILE_LOGIN_ERROR["MOBILE_LOGIN_ERROR_ACTIVATIONCODE"] = 11] = "MOBILE_LOGIN_ERROR_ACTIVATIONCODE";
})(MOBILE_LOGIN_ERROR || (MOBILE_LOGIN_ERROR = {}));
;
var MOBILE_LOGOUT_ERROR;
(function (MOBILE_LOGOUT_ERROR) {
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_NOERROR"] = 0] = "MOBILE_LOGOUT_NOERROR";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_USER_LOGOUT"] = 1] = "MOBILE_LOGOUT_USER_LOGOUT";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_TIMEOUT"] = 2] = "MOBILE_LOGOUT_TIMEOUT";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_MULTI_LGOIN"] = 3] = "MOBILE_LOGOUT_MULTI_LGOIN";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_SERVER_KICK"] = 4] = "MOBILE_LOGOUT_SERVER_KICK";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_NOT_LOGIN"] = 5] = "MOBILE_LOGOUT_NOT_LOGIN";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_SERVER_LIMIT"] = 6] = "MOBILE_LOGOUT_SERVER_LIMIT";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_SHUTDOWN_KICK"] = 7] = "MOBILE_LOGOUT_SHUTDOWN_KICK";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_MATCH_GAMEOVER"] = 8] = "MOBILE_LOGOUT_MATCH_GAMEOVER";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_LOGIN_BAN"] = 9] = "MOBILE_LOGOUT_LOGIN_BAN";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_DEL_ROLE"] = 10] = "MOBILE_LOGOUT_DEL_ROLE";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_IDIP_KICK"] = 11] = "MOBILE_LOGOUT_IDIP_KICK";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_IDIP_ZERO_PROFIT"] = 12] = "MOBILE_LOGOUT_IDIP_ZERO_PROFIT";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_TOKEN_EXPIRE"] = 13] = "MOBILE_LOGOUT_TOKEN_EXPIRE";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_LOADDATA"] = 14] = "MOBILE_LOGOUT_LOADDATA";
    MOBILE_LOGOUT_ERROR[MOBILE_LOGOUT_ERROR["MOBILE_LOGOUT_CLIENT_DEFINE"] = 10000] = "MOBILE_LOGOUT_CLIENT_DEFINE";
})(MOBILE_LOGOUT_ERROR || (MOBILE_LOGOUT_ERROR = {}));
;
var ROLE_RESULT_CODE;
(function (ROLE_RESULT_CODE) {
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_TRUE"] = 0] = "ROLE_TRUE";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_SUCCESS"] = 0] = "ROLE_SUCCESS";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_FALSE"] = 1] = "ROLE_FALSE";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_FAILED"] = 1] = "ROLE_FAILED";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_PERSIST_ERROR"] = 2] = "ROLE_PERSIST_ERROR";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_NULL_OBJECT"] = 3] = "ROLE_ERROR_NULL_OBJECT";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_NULL_PSTID"] = 4] = "ROLE_ERROR_NULL_PSTID";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_ALREADY_HAVE_ROLE"] = 5] = "ROLE_ERROR_ALREADY_HAVE_ROLE";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_SEX"] = 6] = "ROLE_ERROR_SEX";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_NOT_ROLE"] = 7] = "ROLE_ERROR_NOT_ROLE";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_DUPLICATE_NICK"] = 8] = "ROLE_ERROR_DUPLICATE_NICK";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_DIRTY_NICK"] = 9] = "ROLE_ERROR_DIRTY_NICK";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_LONG_NICK"] = 10] = "ROLE_ERROR_LONG_NICK";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_NOT_OPENID_ACCOUNTID"] = 11] = "ROLE_ERROR_NOT_OPENID_ACCOUNTID";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_ACCOUNT_HAVE_ROLE"] = 12] = "ROLE_ERROR_ACCOUNT_HAVE_ROLE";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_SERVER_MAINTAIN"] = 13] = "ROLE_ERROR_SERVER_MAINTAIN";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_MSDK_ERROR"] = 14] = "ROLE_ERROR_MSDK_ERROR";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ALREADY_LOGIN"] = 15] = "ROLE_ALREADY_LOGIN";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_MAX_REGISTER"] = 16] = "ROLE_ERROR_MAX_REGISTER";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_SERVERID"] = 17] = "ROLE_ERROR_SERVERID";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_NULL_RANDOMNICK"] = 18] = "ROLE_ERROR_NULL_RANDOMNICK";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_NOT_ENOUGH_DIAMOND"] = 19] = "ROLE_ERROR_NOT_ENOUGH_DIAMOND";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_REGISTER_FLOWCONTROL"] = 20] = "ROLE_ERROR_REGISTER_FLOWCONTROL";
    ROLE_RESULT_CODE[ROLE_RESULT_CODE["ROLE_ERROR_BANNED_LOGIN"] = 1000] = "ROLE_ERROR_BANNED_LOGIN";
})(ROLE_RESULT_CODE || (ROLE_RESULT_CODE = {}));
;
var RequestMobileLogin = (function (_super) {
    __extends(RequestMobileLogin, _super);
    function RequestMobileLogin() {
        var _this = _super.call(this) || this;
        _this.login_info = new Msdk.LoginRet();
        _this.client_info = new ClientInfo();
        _this.session = new Int64(0);
        return _this;
    }
    Object.defineProperty(RequestMobileLogin.prototype, "CLSID", {
        get: function () {
            return MessageDef.Request_MobileLogin;
        },
        enumerable: true,
        configurable: true
    });
    return RequestMobileLogin;
}(RequestMessage));
__decorate([
    field(1)
], RequestMobileLogin.prototype, "login_info", void 0);
__decorate([
    field(2)
], RequestMobileLogin.prototype, "client_info", void 0);
__decorate([
    field(3)
], RequestMobileLogin.prototype, "session", void 0);
RequestMobileLogin = __decorate([
    protobuf
], RequestMobileLogin);
__reflect(RequestMobileLogin.prototype, "RequestMobileLogin");
var ReplyMobileLogin = (function (_super) {
    __extends(ReplyMobileLogin, _super);
    function ReplyMobileLogin() {
        var _this = _super.call(this) || this;
        _this.m_session_id = new Int64(0, 0);
        _this.m_n_ret = 0;
        _this.m_server_time = new Int64(0, 0);
        _this.m_version_status = "";
        _this.m_update_type = 0;
        return _this;
    }
    Object.defineProperty(ReplyMobileLogin.prototype, "CLSID", {
        get: function () {
            return MessageDef.Reply_MobileLoginResult;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyMobileLogin;
}(ReplyMessage));
__decorate([
    field(1)
], ReplyMobileLogin.prototype, "m_session_id", void 0);
__decorate([
    field(2)
], ReplyMobileLogin.prototype, "m_n_ret", void 0);
__decorate([
    field(3)
], ReplyMobileLogin.prototype, "m_server_time", void 0);
__decorate([
    field(4)
], ReplyMobileLogin.prototype, "m_version_status", void 0);
__decorate([
    field(5)
], ReplyMobileLogin.prototype, "m_update_type", void 0);
ReplyMobileLogin = __decorate([
    protobuf
], ReplyMobileLogin);
__reflect(ReplyMobileLogin.prototype, "ReplyMobileLogin");
var RequestMobileLogout = (function (_super) {
    __extends(RequestMobileLogout, _super);
    function RequestMobileLogout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RequestMobileLogout.prototype, "CLSID", {
        get: function () {
            return MessageDef.Request_MobileLogout;
        },
        enumerable: true,
        configurable: true
    });
    return RequestMobileLogout;
}(RequestMessage));
__reflect(RequestMobileLogout.prototype, "RequestMobileLogout");
var ReplyMobileLogout = (function (_super) {
    __extends(ReplyMobileLogout, _super);
    function ReplyMobileLogout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ReplyMobileLogout.prototype, "CLSID", {
        get: function () {
            return MessageDef.Reply_MobileLogoutResult;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyMobileLogout;
}(ReplyMessage));
__reflect(ReplyMobileLogout.prototype, "ReplyMobileLogout");
var MobileCharInfo = (function () {
    function MobileCharInfo() {
        this.pstid = new Int64(0);
    }
    return MobileCharInfo;
}());
__decorate([
    field(1)
], MobileCharInfo.prototype, "pstid", void 0);
MobileCharInfo = __decorate([
    protobuf
], MobileCharInfo);
__reflect(MobileCharInfo.prototype, "MobileCharInfo");
;
var RequestApplyMatch = (function (_super) {
    __extends(RequestApplyMatch, _super);
    function RequestApplyMatch() {
        var _this = _super.call(this) || this;
        _this.m_cancel = false;
        _this.m_level_id = 0;
        return _this;
    }
    Object.defineProperty(RequestApplyMatch.prototype, "CLSID", {
        get: function () {
            return MessageDef.RequestApplyMatch;
        },
        enumerable: true,
        configurable: true
    });
    return RequestApplyMatch;
}(RequestMessage));
__decorate([
    field(1)
], RequestApplyMatch.prototype, "m_cancel", void 0);
__decorate([
    field(2)
], RequestApplyMatch.prototype, "m_level_id", void 0);
RequestApplyMatch = __decorate([
    protobuf
], RequestApplyMatch);
__reflect(RequestApplyMatch.prototype, "RequestApplyMatch");
;
var ReplyApplyMatch = (function (_super) {
    __extends(ReplyApplyMatch, _super);
    function ReplyApplyMatch() {
        var _this = _super.call(this) || this;
        _this.ret = 0;
        return _this;
    }
    Object.defineProperty(ReplyApplyMatch.prototype, "CLSID", {
        get: function () {
            return MessageDef.ReplyApplyMatch;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyApplyMatch;
}(ReplyMessage));
__decorate([
    field(1)
], ReplyApplyMatch.prototype, "ret", void 0);
ReplyApplyMatch = __decorate([
    protobuf
], ReplyApplyMatch);
__reflect(ReplyApplyMatch.prototype, "ReplyApplyMatch");
;
var PushApplyInfo = (function (_super) {
    __extends(PushApplyInfo, _super);
    function PushApplyInfo() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        return _this;
    }
    Object.defineProperty(PushApplyInfo.prototype, "CLSID", {
        get: function () {
            return MessageDef.PushApplyInfo;
        },
        enumerable: true,
        configurable: true
    });
    return PushApplyInfo;
}(ServerPushMessage));
__decorate([
    field(1)
], PushApplyInfo.prototype, "count", void 0);
PushApplyInfo = __decorate([
    protobuf
], PushApplyInfo);
__reflect(PushApplyInfo.prototype, "PushApplyInfo");
;
//# sourceMappingURL=BasicMessages.js.map