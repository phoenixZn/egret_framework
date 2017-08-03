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
var MobileServerInfo = (function () {
    function MobileServerInfo() {
        this.id = 0;
        this.status = 0;
        this.type = 0;
        this.name = "";
        this.ip = "";
        this.port = 0;
        this.zone_id = 0;
    }
    return MobileServerInfo;
}());
__decorate([
    field(1)
], MobileServerInfo.prototype, "id", void 0);
__decorate([
    field(2)
], MobileServerInfo.prototype, "status", void 0);
__decorate([
    field(3)
], MobileServerInfo.prototype, "type", void 0);
__decorate([
    field(4)
], MobileServerInfo.prototype, "name", void 0);
__decorate([
    field(5)
], MobileServerInfo.prototype, "ip", void 0);
__decorate([
    field(6)
], MobileServerInfo.prototype, "port", void 0);
__decorate([
    field(7)
], MobileServerInfo.prototype, "zone_id", void 0);
MobileServerInfo = __decorate([
    protobuf
], MobileServerInfo);
__reflect(MobileServerInfo.prototype, "MobileServerInfo");
;
var MobileBulletinInfo = (function () {
    function MobileBulletinInfo() {
        this.id = 0;
        this.title = "";
        this.content = "";
        this.timestr = "";
        this.user = "";
        this.rule = "";
    }
    return MobileBulletinInfo;
}());
__decorate([
    field(1)
], MobileBulletinInfo.prototype, "id", void 0);
__decorate([
    field(2)
], MobileBulletinInfo.prototype, "title", void 0);
__decorate([
    field(3)
], MobileBulletinInfo.prototype, "content", void 0);
__decorate([
    field(4)
], MobileBulletinInfo.prototype, "timestr", void 0);
__decorate([
    field(5)
], MobileBulletinInfo.prototype, "user", void 0);
__decorate([
    field(6)
], MobileBulletinInfo.prototype, "rule", void 0);
MobileBulletinInfo = __decorate([
    protobuf
], MobileBulletinInfo);
__reflect(MobileBulletinInfo.prototype, "MobileBulletinInfo");
;
var LocalPushInfo = (function () {
    function LocalPushInfo() {
        this.day_interval = 0;
        this.start = new Int64(0);
        this.title = "";
        this.content = "";
    }
    return LocalPushInfo;
}());
__decorate([
    field(1)
], LocalPushInfo.prototype, "day_interval", void 0);
__decorate([
    field(2)
], LocalPushInfo.prototype, "start", void 0);
__decorate([
    field(3)
], LocalPushInfo.prototype, "title", void 0);
__decorate([
    field(4)
], LocalPushInfo.prototype, "content", void 0);
LocalPushInfo = __decorate([
    protobuf
], LocalPushInfo);
__reflect(LocalPushInfo.prototype, "LocalPushInfo");
;
var RequestGetServerInfo = (function (_super) {
    __extends(RequestGetServerInfo, _super);
    function RequestGetServerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RequestGetServerInfo.prototype, "CLSID", {
        get: function () {
            return MessageDef.Request_GetServerInfo;
        },
        enumerable: true,
        configurable: true
    });
    return RequestGetServerInfo;
}(RequestMessage));
RequestGetServerInfo = __decorate([
    protobuf
], RequestGetServerInfo);
__reflect(RequestGetServerInfo.prototype, "RequestGetServerInfo");
;
var ReplyGetServerInfo = (function (_super) {
    __extends(ReplyGetServerInfo, _super);
    function ReplyGetServerInfo() {
        var _this = _super.call(this) || this;
        _this.ret = 0;
        _this.server_list = new Array();
        _this.haverole_server_list = new Array();
        _this.recently_login_list = new Array();
        return _this;
    }
    Object.defineProperty(ReplyGetServerInfo.prototype, "CLSID", {
        get: function () {
            return MessageDef.Reply_GetServerInfo;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyGetServerInfo;
}(ReplyMessage));
__decorate([
    field(1)
], ReplyGetServerInfo.prototype, "ret", void 0);
__decorate([
    field(2, "array", MobileServerInfo)
], ReplyGetServerInfo.prototype, "server_list", void 0);
__decorate([
    field(3, "array", "int")
], ReplyGetServerInfo.prototype, "haverole_server_list", void 0);
__decorate([
    field(4, "array", "int")
], ReplyGetServerInfo.prototype, "recently_login_list", void 0);
ReplyGetServerInfo = __decorate([
    protobuf
], ReplyGetServerInfo);
__reflect(ReplyGetServerInfo.prototype, "ReplyGetServerInfo");
;
var RequestGetDefaultServerInfo = (function (_super) {
    __extends(RequestGetDefaultServerInfo, _super);
    function RequestGetDefaultServerInfo() {
        var _this = _super.call(this) || this;
        _this.server_id = -1;
        return _this;
    }
    Object.defineProperty(RequestGetDefaultServerInfo.prototype, "CLSID", {
        get: function () {
            return MessageDef.Request_GetDefaultServerInfo;
        },
        enumerable: true,
        configurable: true
    });
    return RequestGetDefaultServerInfo;
}(RequestMessage));
__decorate([
    field(1)
], RequestGetDefaultServerInfo.prototype, "server_id", void 0);
RequestGetDefaultServerInfo = __decorate([
    protobuf
], RequestGetDefaultServerInfo);
__reflect(RequestGetDefaultServerInfo.prototype, "RequestGetDefaultServerInfo");
;
var ReplyGetDefaultServerInfo = (function (_super) {
    __extends(ReplyGetDefaultServerInfo, _super);
    function ReplyGetDefaultServerInfo() {
        var _this = _super.call(this) || this;
        _this.ret = 0;
        _this.bulletin_info = new Array();
        _this.default_server = new MobileServerInfo();
        _this.local_push_info_list = new Array();
        return _this;
    }
    Object.defineProperty(ReplyGetDefaultServerInfo.prototype, "CLSID", {
        get: function () {
            return MessageDef.Reply_GetDefaultServerInfo;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyGetDefaultServerInfo;
}(ReplyMessage));
__decorate([
    field(1)
], ReplyGetDefaultServerInfo.prototype, "ret", void 0);
__decorate([
    field(2, "array", MobileBulletinInfo)
], ReplyGetDefaultServerInfo.prototype, "bulletin_info", void 0);
__decorate([
    field(3)
], ReplyGetDefaultServerInfo.prototype, "default_server", void 0);
__decorate([
    field(4, "array", LocalPushInfo)
], ReplyGetDefaultServerInfo.prototype, "local_push_info_list", void 0);
ReplyGetDefaultServerInfo = __decorate([
    protobuf
], ReplyGetDefaultServerInfo);
__reflect(ReplyGetDefaultServerInfo.prototype, "ReplyGetDefaultServerInfo");
;
//# sourceMappingURL=BulletinMessage.js.map