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
var CallCenterResult;
(function (CallCenterResult) {
    CallCenterResult[CallCenterResult["Normal"] = 0] = "Normal";
    CallCenterResult[CallCenterResult["ConnectionClosed"] = -1] = "ConnectionClosed";
    CallCenterResult[CallCenterResult["TimeOut"] = -2] = "TimeOut";
    CallCenterResult[CallCenterResult["OtherErr"] = -3] = "OtherErr";
})(CallCenterResult || (CallCenterResult = {}));
var ReplyInfo = (function () {
    function ReplyInfo() {
    }
    Object.defineProperty(ReplyInfo.prototype, "Succ", {
        get: function () {
            return this.err == CallCenterResult.Normal;
        },
        enumerable: true,
        configurable: true
    });
    return ReplyInfo;
}());
__reflect(ReplyInfo.prototype, "ReplyInfo");
var RequestInfo = (function () {
    function RequestInfo() {
        this.start_time = egret.getTimer();
        this.send_count = 0;
    }
    RequestInfo.prototype.OnSend = function () {
        this.send_count++;
        this.send_time = egret.getTimer();
    };
    return RequestInfo;
}());
__reflect(RequestInfo.prototype, "RequestInfo");
var CallCenter = (function (_super) {
    __extends(CallCenter, _super);
    function CallCenter() {
        var _this = _super.call(this) || this;
        _this.m_serial = 100;
        _this.m_ack = 0;
        _this.m_requests = new Array();
        _this.m_netintf = new NetInterface(_this);
        _this.m_recv_count = 0;
        _this.m_send_count = 0;
        _this.m_last_tick = egret.getTimer();
        return _this;
    }
    ;
    CallCenter.prototype.OnConnectFail = function (conn) {
        this.m_conn = null;
    };
    CallCenter.prototype.OnConnectEstablish = function (conn) {
        for (var _i = 0, _a = this.m_requests; _i < _a.length; _i++) {
            var i = _a[_i];
            this.SendMessage(i.req);
        }
    };
    CallCenter.prototype.OnConnectClose = function (conn) {
        this.m_conn = null;
    };
    CallCenter.prototype.OnMessage = function (conn, msg) {
        var mobile_msg = msg;
        if (mobile_msg == null) {
            return;
        }
        var seq = mobile_msg.Head.seq_or_ack;
        if (seq > 0 && seq != this.m_ack + 1) {
            egret.log("msg not on demand: serial=", mobile_msg.Head.serial, ", type=", msg, ", seq=", seq, ", ack=", this.m_ack);
            return;
        }
        else if (seq > 0) {
            this.m_ack = seq;
        }
        if (mobile_msg instanceof InGameMessage) {
            this.HandleInGameMessage(mobile_msg);
        }
        else if (mobile_msg instanceof ReplyMessage) {
            this.HandleReplyMessage(mobile_msg);
        }
        else if (mobile_msg instanceof ServerPushMessage) {
            this.HandleServerPushMessage(mobile_msg);
        }
    };
    CallCenter.prototype.HandleInGameMessage = function (msg) {
        this.Trigger(msg.CLSID, msg);
        if (msg.CLSID == MessageDef.InGame_SyncCommands) {
            var sync_msg = msg;
            this.m_recv_count += sync_msg.buff.length;
        }
    };
    CallCenter.prototype.HandleReplyMessage = function (msg) {
        var serial = msg.Head.serial;
        egret.log("HandleReply: serial=" + serial + ", type=" + msg);
        var info = this.RemoveRequest(msg);
        if (info != null) {
            info.reply_callback(CallCenterResult.Normal, msg);
        }
    };
    CallCenter.prototype.HandleServerPushMessage = function (msg) {
        this.Trigger(msg.CLSID, msg);
    };
    CallCenter.prototype.RemoveRequest = function (msg) {
        var serial = msg.Head.serial;
        for (var i = 0; i < this.m_requests.length; i++) {
            if (this.m_requests[i].serial == serial) {
                var info = this.m_requests.splice(i, 1)[0];
                return info;
            }
        }
        return null;
    };
    CallCenter.prototype.Connect = function () {
        if (this.m_conn == null) {
            this.m_conn = this.m_netintf.Connect(this.m_ip, this.m_port, this.m_proxy);
        }
    };
    CallCenter.prototype.Disconnect = function () {
        if (this.m_conn != null) {
            this.m_conn.CloseConnection();
        }
    };
    Object.defineProperty(CallCenter.prototype, "Connected", {
        get: function () {
            return this.m_conn != null && this.m_conn.IsConnected;
        },
        enumerable: true,
        configurable: true
    });
    CallCenter.prototype.SendMessage = function (msg) {
        if (this.Connected) {
            this.m_conn.SendMessage(msg);
            if (msg.CLSID == MessageDef.InGame_SyncCommands) {
                var sync_msg = msg;
                this.m_send_count += sync_msg.buff.length;
            }
        }
        else {
            this.Connect();
        }
    };
    CallCenter.prototype.SendMessageOnly = function (msg) {
        this.SendMessage(msg);
    };
    CallCenter.prototype.SetAddress = function (ip, port, proxy) {
        this.m_ip = ip;
        this.m_port = port;
        this.m_proxy = proxy;
    };
    CallCenter.prototype.Request = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve) {
                    var info = new RequestInfo();
                    info.req = req;
                    info.reply_callback = function (err, rep) {
                        var res = new ReplyInfo();
                        res.err = err;
                        res.msg = rep;
                        resolve(res);
                    };
                    _this.SendRequest(info);
                });
                return [2 /*return*/, promise];
            });
        });
    };
    CallCenter.prototype.SendRequest = function (info) {
        info.serial = this.GenerateSerial();
        info.req.Head.serial = info.serial;
        this.m_requests.push(info);
        this.SendMessage(info.req);
    };
    CallCenter.prototype.GenerateSerial = function () {
        var serial = this.m_serial++;
        if (this.m_serial == 0x7fffffff) {
            this.m_serial = 100;
        }
        return serial;
    };
    CallCenter.prototype.Update = function () {
        this.m_netintf.ProcessEvents();
        this.CheckTimeout();
        var now = egret.getTimer();
        if (now - this.m_last_tick > 1000) {
            this.m_last_tick = now;
        }
    };
    CallCenter.prototype.CheckTimeout = function () {
    };
    return CallCenter;
}(EventCenter));
__reflect(CallCenter.prototype, "CallCenter", ["IEventNotifier"]);
//# sourceMappingURL=CallCenter.js.map