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
var BulletinModule = (function (_super) {
    __extends(BulletinModule, _super);
    function BulletinModule() {
        var _this = _super.call(this) || this;
        _this.m_server_list = null;
        _this.m_default_server = null;
        return _this;
    }
    Object.defineProperty(BulletinModule.prototype, "DefaultServer", {
        get: function () {
            return this.m_default_server;
        },
        enumerable: true,
        configurable: true
    });
    BulletinModule.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestMobileLogin();
                        msg.login_info.open_id = GameGlobal.GameLogic.Account;
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "exepcting ReplyMobileLogin";
                        return [2 /*return*/, res.m_n_ret];
                }
            });
        });
    };
    BulletinModule.prototype.GetServerInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestGetServerInfo();
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "expecting ReplyGetServerInfo";
                        this.m_server_list = res.server_list;
                        return [2 /*return*/, res.ret];
                }
            });
        });
    };
    BulletinModule.prototype.GetDefaultServerInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestGetDefaultServerInfo();
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "expecting ReplyGetDefaultServerInfo";
                        this.m_default_server = res.default_server;
                        return [2 /*return*/, res.ret];
                }
            });
        });
    };
    BulletinModule.prototype.TestProtobuf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, reply, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = new RequestProtobufTestData();
                        msg.prepare();
                        return [4 /*yield*/, this.SendMessage(msg)];
                    case 1:
                        reply = _a.sent();
                        if (!reply.Succ)
                            return [2 /*return*/, reply.err];
                        res = reply.msg;
                        if (!res)
                            throw "expecting ReplyProtobufTestData";
                        egret.log(res);
                        if (!res.valid())
                            return [2 /*return*/, 10086];
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    return BulletinModule;
}(GameModule));
__reflect(BulletinModule.prototype, "BulletinModule");
//# sourceMappingURL=BulletinModule.js.map