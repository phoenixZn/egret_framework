var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InnerCommand;
(function (InnerCommand) {
    InnerCommand[InnerCommand["NET_PING"] = 1] = "NET_PING";
    InnerCommand[InnerCommand["NET_PONG"] = 2] = "NET_PONG";
})(InnerCommand || (InnerCommand = {}));
var inner_command = (function () {
    function inner_command() {
        this.command = 0;
        this.param32_0 = 0;
        this.param32_1 = 0;
        this.param32_2 = 0;
        this.param64 = new Int64(0, 0);
    }
    inner_command.prototype.ToStream = function (outs) {
        outs.writeInt(this.command);
        outs.writeInt(this.param32_0);
        outs.writeInt(this.param32_1);
        outs.writeInt(this.param32_2);
        outs.writeInt64(this.param64);
    };
    inner_command.prototype.FromStream = function (ins) {
        this.command = ins.readInt();
        this.param32_0 = ins.readInt();
        this.param32_1 = ins.readInt();
        this.param32_2 = ins.readInt();
        this.param64 = ins.readInt64();
    };
    return inner_command;
}());
__reflect(inner_command.prototype, "inner_command");
;
var package_header = (function () {
    function package_header(is_inner) {
        this.is_inner = false;
        this.body_length = 0;
        this.is_inner = is_inner;
    }
    package_header.prototype.Load = function (stream) {
        this.body_length = stream.readInt();
        if (this.body_length < 0) {
            this.is_inner = true;
            this.body_length = -this.body_length;
        }
    };
    package_header.prototype.Save = function (stream) {
        var len = this.body_length;
        if (this.is_inner) {
            len = -len;
        }
        stream.writeInt(len);
    };
    return package_header;
}());
__reflect(package_header.prototype, "package_header");
;
var NetPacket = (function () {
    function NetPacket(is_inner) {
        this.m_header = new package_header(is_inner);
        this.m_header_buffer = new NetBuffer();
        this.m_body_buffer = new NetBuffer();
        this.m_head_transfered = 0;
        this.m_body_transfered = 0;
    }
    Object.defineProperty(NetPacket.prototype, "IsInner", {
        get: function () {
            return this.m_header.is_inner;
        },
        set: function (value) {
            this.m_header.is_inner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetPacket.prototype, "headBuffer", {
        get: function () {
            return this.m_header_buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetPacket.prototype, "bodyBuffer", {
        get: function () {
            return this.m_body_buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetPacket.prototype, "payloadLength", {
        get: function () {
            return this.m_header.body_length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetPacket.prototype, "isCompleted", {
        get: function () {
            return this.m_head_transfered > 0 && this.m_body_transfered > 0 && this.m_body_transfered == this.m_header.body_length;
        },
        enumerable: true,
        configurable: true
    });
    NetPacket.prototype.clear = function () {
        this.m_header.body_length = 0;
        this.m_header_buffer.clear();
        this.m_body_buffer.clear();
        this.m_head_transfered = 0;
        this.m_body_transfered = 0;
    };
    NetPacket.prototype.decode = function () {
        this.m_header.Load(this.m_header_buffer);
        return true;
    };
    NetPacket.prototype.encode = function () {
        this.m_header.body_length = this.m_body_buffer.length;
        this.m_header.Save(this.m_header_buffer);
    };
    return NetPacket;
}());
__reflect(NetPacket.prototype, "NetPacket");
;
//# sourceMappingURL=NetPacket.js.map