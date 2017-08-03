var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NetMessage = (function () {
    function NetMessage() {
    }
    return NetMessage;
}());
__reflect(NetMessage.prototype, "NetMessage");
var ReqRepHead = (function () {
    function ReqRepHead() {
        this.serial = 0;
        this.seq_or_ack = 0;
    }
    ReqRepHead.prototype.FromStream = function (stream) {
        this.serial = stream.readInt();
        this.seq_or_ack = stream.readInt();
    };
    ReqRepHead.prototype.ToStream = function (stream) {
        stream.writeInt(this.serial);
        stream.writeInt(this.seq_or_ack);
    };
    return ReqRepHead;
}());
__reflect(ReqRepHead.prototype, "ReqRepHead");
var ReqRepMessage = (function (_super) {
    __extends(ReqRepMessage, _super);
    function ReqRepMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_head = new ReqRepHead();
        return _this;
    }
    Object.defineProperty(ReqRepMessage.prototype, "Head", {
        get: function () {
            return this.m_head;
        },
        enumerable: true,
        configurable: true
    });
    ReqRepMessage.prototype.FromStream = function (stream) {
        this.m_head.FromStream(stream);
        from_stream(this, stream, this.m_head.serial);
    };
    ReqRepMessage.prototype.ToStream = function (stream) {
        this.m_head.ToStream(stream);
        to_stream(this, stream, this.m_head.serial);
    };
    Object.defineProperty(ReqRepMessage.prototype, "ENCRYPT", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return ReqRepMessage;
}(NetMessage));
__reflect(ReqRepMessage.prototype, "ReqRepMessage");
var RequestMessage = (function (_super) {
    __extends(RequestMessage, _super);
    function RequestMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestMessage;
}(ReqRepMessage));
__reflect(RequestMessage.prototype, "RequestMessage");
var ReplyMessage = (function (_super) {
    __extends(ReplyMessage, _super);
    function ReplyMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReplyMessage;
}(ReqRepMessage));
__reflect(ReplyMessage.prototype, "ReplyMessage");
var ServerPushMessage = (function (_super) {
    __extends(ServerPushMessage, _super);
    function ServerPushMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerPushMessage;
}(ReqRepMessage));
__reflect(ServerPushMessage.prototype, "ServerPushMessage");
var InGameMessage = (function (_super) {
    __extends(InGameMessage, _super);
    function InGameMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InGameMessage.prototype, "ENCRYPT", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return InGameMessage;
}(ReqRepMessage));
__reflect(InGameMessage.prototype, "InGameMessage");
//# sourceMappingURL=NetMessage.js.map