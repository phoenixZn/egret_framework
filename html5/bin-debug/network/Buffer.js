////////////////////////////////////////
// Buffer.ts
// extend egret.ByteArray, implement writeInt64
// @author zrongzrong@gmail.com
// Creation 2015-09-14
////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NetBuffer = (function (_super) {
    __extends(NetBuffer, _super);
    function NetBuffer(buffer) {
        var _this = _super.call(this, buffer) || this;
        _this.endian = egret.Endian.LITTLE_ENDIAN;
        return _this;
    }
    NetBuffer.prototype.readUnsignedInt64 = function (raw) {
        if (raw === void 0) { raw = true; }
        return this.readInt64(raw);
    };
    NetBuffer.prototype.writeUnsignedInt64 = function (value) {
        this.writeInt64(value);
    };
    NetBuffer.prototype.readInt64 = function (raw) {
        if (raw === void 0) { raw = true; }
        if (!this.validate(NetBuffer.SIZE_OF_INT64))
            return null;
        var buffer = [];
        for (var i = 0; i < NetBuffer.SIZE_OF_INT64; i++) {
            buffer[i] = this.readUnsignedByte();
        }
        var intValue = new Int64(buffer);
        if (raw) {
            return intValue.toNumber();
        }
        return intValue;
    };
    NetBuffer.prototype.writeInt64 = function (value) {
        var intValue;
        if (typeof (value) == 'number') {
            intValue = new Int64(value);
        }
        else {
            intValue = value;
        }
        var buffer = intValue.toBuffer(true);
        for (var i = 0; i < buffer.length; i++) {
            this.writeByte(buffer[i]);
        }
    };
    NetBuffer.prototype.readVarInt = function () {
        var n = 0;
        var shift = 0;
        for (;;) {
            var b = this.readUnsignedByte();
            var v = b & 0x7F;
            n += v << shift;
            shift += 7;
            if ((b & 0x80) == 0)
                break;
        }
        return (n >> 1) ^ (-(n & 1));
    };
    NetBuffer.prototype.writeVarInt = function (value) {
        var v = (value << 1) ^ (value >> 31);
        for (;;) {
            var b = v & 0x07F;
            v = v >>> 7;
            if (v == 0) {
                this.writeByte(b);
                break;
            }
            else {
                b |= 0x80;
                this.writeByte(b);
            }
        }
    };
    NetBuffer.prototype.writeVarInt64 = function (value) {
        var v = new Int64(value.buffer);
        v.shiftLeft(1);
        var w = new Int64(value.buffer);
        w.shiftRight(64, true);
        v.xor(w);
        for (;;) {
            var b = v.lsb() & 0x07F;
            v.shiftRight(7);
            if (v.is_zero()) {
                this.writeByte(b);
                break;
            }
            else {
                b |= 0x80;
                this.writeByte(b);
            }
        }
    };
    NetBuffer.prototype.readVarInt64 = function () {
        var n = new Int64(0, 0);
        var l = 0;
        var h = 0;
        var shift = 0;
        for (;;) {
            var b = this.readUnsignedByte();
            var v = b & 0x7F;
            if (shift < 28) {
                l += v << shift;
            }
            else if (shift > 28) {
                h += v << (shift - 28 - 4);
            }
            else {
                l += ((v & 0x0F) << shift);
                h += ((v & 0xF0) >>> 4);
            }
            shift += 7;
            if ((b & 0x80) == 0)
                break;
        }
        var sl = l >>> 1;
        if (h & 1)
            sl |= 0x80000000;
        var sh = h >>> 1;
        var mh = 0;
        var ml = 0;
        if (l & 1) {
            mh = 0xFFFFFFFF;
            ml = 0xFFFFFFFF;
        }
        h = sh ^ mh;
        l = sl ^ ml;
        n.setValue(h, l);
        return n;
    };
    return NetBuffer;
}(egret.ByteArray));
NetBuffer.SIZE_OF_INT64 = 8;
NetBuffer.SIZE_OF_UINT64 = 8;
__reflect(NetBuffer.prototype, "NetBuffer");
//# sourceMappingURL=Buffer.js.map