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
/// <reference path="../../network/Protobuf.ts"/>
/// <reference path="MessageDef.ts"/>
var ProtobufTestObjectBase = (function () {
    function ProtobufTestObjectBase() {
        this.i = 0;
        this.s = "default";
        this.ai64 = new Array();
    }
    return ProtobufTestObjectBase;
}());
__decorate([
    field(1)
], ProtobufTestObjectBase.prototype, "i", void 0);
__decorate([
    field(2)
], ProtobufTestObjectBase.prototype, "s", void 0);
__decorate([
    field(3, "array", "long")
], ProtobufTestObjectBase.prototype, "ai64", void 0);
ProtobufTestObjectBase = __decorate([
    protobuf
], ProtobufTestObjectBase);
__reflect(ProtobufTestObjectBase.prototype, "ProtobufTestObjectBase");
;
var ProtobufTestObject = (function (_super) {
    __extends(ProtobufTestObject, _super);
    function ProtobufTestObject() {
        var _this = _super.call(this) || this;
        _this.mis = new Map();
        return _this;
    }
    ProtobufTestObject.prototype.prepare = function () {
        this.i = 1;
        this.s = "string2";
        this.ai64.push(new Int64(3));
        this.ai64.push(new Int64(4));
        this.mis.set(new Int64(5), "string5");
        this.mis.set(new Int64(6), "string6");
    };
    ProtobufTestObject.prototype.valid = function () {
        if (this.i != 1)
            return false;
        if (this.s != "string2")
            return false;
        if (this.ai64.length != 2)
            return false;
        var i64 = new Int64(3);
        if (!this.ai64[0].equals(i64))
            return false;
        i64.setValue(4);
        if (!this.ai64[1].equals(i64))
            return false;
        if (this.mis.size != 2)
            return false;
        var res = 0;
        this.mis.forEach(function (v, k) {
            i64.setValue(5);
            if (v == "string5" && k.equals(i64))
                res |= 1;
            i64.setValue(6);
            if (v == "string6" && k.equals(i64))
                res |= 2;
        });
        return res == 3;
    };
    return ProtobufTestObject;
}(ProtobufTestObjectBase));
__decorate([
    field(101, "map", "long", "string")
], ProtobufTestObject.prototype, "mis", void 0);
ProtobufTestObject = __decorate([
    protobuf
], ProtobufTestObject);
__reflect(ProtobufTestObject.prototype, "ProtobufTestObject");
;
var RequestProtobufTestData = (function (_super) {
    __extends(RequestProtobufTestData, _super);
    function RequestProtobufTestData() {
        var _this = _super.call(this) || this;
        _this.b = false;
        _this.c = 0;
        _this.s = 0;
        _this.i = 0;
        _this.i64 = new Int64(0);
        _this.f = 0;
        _this.lf = 0;
        _this.str = "default";
        _this.ab = new Array();
        _this.ac = new Array();
        _this.as = new Array();
        _this.ai = new Array();
        _this.ai64 = new Array();
        _this.ais = new Array();
        _this.af = new Array();
        _this.alf = new Array();
        _this.si = new Set();
        _this.si64 = new Set();
        _this.ss = new Set();
        _this.msi = new Map();
        _this.msi64 = new Map();
        _this.mss = new Map();
        _this.obj = new ProtobufTestObject();
        _this.ao = new Array();
        _this.buffer = new NetBuffer();
        _this.aai = new Array();
        _this.msmsi = new Map();
        return _this;
    }
    Object.defineProperty(RequestProtobufTestData.prototype, "CLSID", {
        get: function () {
            return 20000;
        },
        enumerable: true,
        configurable: true
    });
    RequestProtobufTestData.prototype.prepare = function () {
        this.b = true;
        this.c = 2;
        this.s = 3;
        this.i = 4;
        this.i64.setValue(0x42400000, 0x00452a0e);
        this.f = 6.7;
        this.lf = 8.9;
        this.str = "test_message";
        this.ab.push(true);
        this.ab.push(false);
        this.ab.push(true);
        this.ac.push(1);
        this.ac.push(2);
        this.ac.push(3);
        this.as.push(1);
        this.as.push(2);
        this.as.push(3);
        this.ai.push(10);
        this.ai.push(11);
        this.ai.push(12);
        this.ai64.push(new Int64(13));
        this.ai64.push(new Int64(14));
        this.ai64.push(new Int64(15));
        this.ais.push("string1");
        this.ais.push("string2");
        this.ais.push("string3");
        this.af.push(1.0);
        this.af.push(2.0);
        this.af.push(3.0);
        this.alf.push(1.1);
        this.alf.push(2.2);
        this.alf.push(3.3);
        this.si.add(16);
        this.si.add(17);
        this.si.add(18);
        this.si64.add(new Int64(19));
        this.si64.add(new Int64(20));
        this.si64.add(new Int64(21));
        this.ss.add("string1");
        this.ss.add("string2");
        this.ss.add("string3");
        this.msi.set("string1", 1);
        this.msi.set("string2", 2);
        this.msi.set("string3", 3);
        this.msi64.set("string1", new Int64(1));
        this.msi64.set("string2", new Int64(2));
        this.msi64.set("string3", new Int64(3));
        this.mss.set("string1", "1");
        this.mss.set("string2", "2");
        this.mss.set("string3", "3");
        this.obj.prepare();
        this.ao.push(this.obj);
        this.ao.push(this.obj);
        this.buffer.writeInt(1024);
        this.buffer.writeVarInt(1024);
        this.aai.push(new Array());
        this.aai.push(new Array());
        this.aai[0].push(10);
        this.aai[0].push(11);
        this.aai[1].push(20);
        this.aai[1].push(21);
        this.msmsi.set("key1", new Map());
        this.msmsi.set("key2", new Map());
        this.msmsi.get("key1").set("key11", 11);
        this.msmsi.get("key1").set("key12", 12);
        this.msmsi.get("key2").set("key21", 21);
        this.msmsi.get("key2").set("key22", 22);
    };
    return RequestProtobufTestData;
}(RequestMessage));
__decorate([
    field(1)
], RequestProtobufTestData.prototype, "b", void 0);
__decorate([
    field(2, "char")
], RequestProtobufTestData.prototype, "c", void 0);
__decorate([
    field(3, "short")
], RequestProtobufTestData.prototype, "s", void 0);
__decorate([
    field(4)
], RequestProtobufTestData.prototype, "i", void 0);
__decorate([
    field(5)
], RequestProtobufTestData.prototype, "i64", void 0);
__decorate([
    field(6, "float")
], RequestProtobufTestData.prototype, "f", void 0);
__decorate([
    field(7, "double")
], RequestProtobufTestData.prototype, "lf", void 0);
__decorate([
    field(8)
], RequestProtobufTestData.prototype, "str", void 0);
__decorate([
    field(9, "array", "bool")
], RequestProtobufTestData.prototype, "ab", void 0);
__decorate([
    field(10, "array", "char")
], RequestProtobufTestData.prototype, "ac", void 0);
__decorate([
    field(11, "array", "short")
], RequestProtobufTestData.prototype, "as", void 0);
__decorate([
    field(12, "array", "int")
], RequestProtobufTestData.prototype, "ai", void 0);
__decorate([
    field(13, "array", "long")
], RequestProtobufTestData.prototype, "ai64", void 0);
__decorate([
    field(14, "array", "string")
], RequestProtobufTestData.prototype, "ais", void 0);
__decorate([
    field(15, "array", "float")
], RequestProtobufTestData.prototype, "af", void 0);
__decorate([
    field(16, "array", "double")
], RequestProtobufTestData.prototype, "alf", void 0);
__decorate([
    field(19, "set", "int")
], RequestProtobufTestData.prototype, "si", void 0);
__decorate([
    field(20, "set", "long")
], RequestProtobufTestData.prototype, "si64", void 0);
__decorate([
    field(21, "set", "string")
], RequestProtobufTestData.prototype, "ss", void 0);
__decorate([
    field(26, "map", "string", "int")
], RequestProtobufTestData.prototype, "msi", void 0);
__decorate([
    field(27, "map", "string", "long")
], RequestProtobufTestData.prototype, "msi64", void 0);
__decorate([
    field(28, "map", "string", "string")
], RequestProtobufTestData.prototype, "mss", void 0);
__decorate([
    field(33)
], RequestProtobufTestData.prototype, "obj", void 0);
__decorate([
    field(34, "array", ProtobufTestObject)
], RequestProtobufTestData.prototype, "ao", void 0);
__decorate([
    field(40)
], RequestProtobufTestData.prototype, "buffer", void 0);
__decorate([
    field(50, "array", "array", "int")
], RequestProtobufTestData.prototype, "aai", void 0);
__decorate([
    field(51, "map", 'string', "map", "string", "int")
], RequestProtobufTestData.prototype, "msmsi", void 0);
RequestProtobufTestData = __decorate([
    protobuf
], RequestProtobufTestData);
__reflect(RequestProtobufTestData.prototype, "RequestProtobufTestData");
var ReplyProtobufTestData = (function (_super) {
    __extends(ReplyProtobufTestData, _super);
    function ReplyProtobufTestData() {
        var _this = _super.call(this) || this;
        _this.b = false;
        _this.c = 0;
        _this.s = 0;
        _this.i = 0;
        _this.i64 = new Int64(0);
        _this.f = 0;
        _this.lf = 0;
        _this.str = "default";
        _this.ab = new Array();
        _this.ac = new Array();
        _this.as = new Array();
        _this.ai = new Array();
        _this.ai64 = new Array();
        _this.ais = new Array();
        _this.af = new Array();
        _this.alf = new Array();
        _this.si = new Set();
        _this.si64 = new Set();
        _this.ss = new Set();
        _this.msi = new Map();
        _this.msi64 = new Map();
        _this.mss = new Map();
        _this.obj = new ProtobufTestObject();
        _this.ao = new Array();
        _this.buffer = new NetBuffer();
        _this.aai = new Array();
        _this.msmsi = new Map();
        return _this;
    }
    Object.defineProperty(ReplyProtobufTestData.prototype, "CLSID", {
        get: function () {
            return 20001;
        },
        enumerable: true,
        configurable: true
    });
    ReplyProtobufTestData.prototype.valid = function () {
        if (this.b != true)
            return false;
        if (this.c != 2)
            return false;
        if (this.s != 3)
            return false;
        if (this.i != 4)
            return false;
        var i64 = new Int64(0);
        i64.setValue(0x42400000, 0x00452a0e);
        if (!this.i64.equals(i64))
            return false;
        if (Math.abs(this.f - 6.7) > 0.01)
            return false;
        if (Math.abs(this.lf - 8.9) > 0.01)
            return false;
        if (this.str != "test_message")
            return false;
        if (this.ab.length != 3)
            return false;
        if (this.ab[0] != true)
            return false;
        if (this.ab[1] != false)
            return false;
        if (this.ab[2] != true)
            return false;
        if (this.ac.length != 3)
            return false;
        if (this.ac[0] != 1)
            return false;
        if (this.ac[1] != 2)
            return false;
        if (this.ac[2] != 3)
            return false;
        if (this.as.length != 3)
            return false;
        if (this.as[0] != 1)
            return false;
        if (this.as[1] != 2)
            return false;
        if (this.as[2] != 3)
            return false;
        if (this.ai.length != 3)
            return false;
        if (this.ai[0] != 10)
            return false;
        if (this.ai[1] != 11)
            return false;
        if (this.ai[2] != 12)
            return false;
        if (this.ai64.length != 3)
            return false;
        i64.setValue(13);
        if (!this.ai64[0].equals(i64))
            return false;
        i64.setValue(14);
        if (!this.ai64[1].equals(i64))
            return false;
        i64.setValue(15);
        if (!this.ai64[2].equals(i64))
            return false;
        if (this.ais.length != 3)
            return false;
        if (this.ais[0] != "string1")
            return false;
        if (this.ais[1] != "string2")
            return false;
        if (this.ais[2] != "string3")
            return false;
        if (this.af.length != 3)
            return false;
        if (this.af[0] != 1.0)
            return false;
        if (this.af[1] != 2.0)
            return false;
        if (this.af[2] != 3.0)
            return false;
        if (this.alf.length != 3)
            return false;
        if (this.alf[0] != 1.1)
            return false;
        if (this.alf[1] != 2.2)
            return false;
        if (this.alf[2] != 3.3)
            return false;
        if (this.si.size != 3)
            return false;
        if (!this.si.has(16))
            return false;
        if (!this.si.has(17))
            return false;
        if (!this.si.has(18))
            return false;
        if (this.si64.size != 3)
            return false;
        var res = 0;
        this.si64.forEach(function (v) {
            i64.setValue(19);
            if (v.equals(i64))
                res |= 1;
            i64.setValue(20);
            if (v.equals(i64))
                res |= 2;
            i64.setValue(21);
            if (v.equals(i64))
                res |= 4;
        });
        if (res != 7)
            return false;
        if (this.ss.size != 3)
            return false;
        if (!this.ss.has("string1"))
            return false;
        if (!this.ss.has("string2"))
            return false;
        if (!this.ss.has("string3"))
            return false;
        if (this.msi.size != 3)
            return false;
        if (this.msi.get("string1") != 1)
            return false;
        if (this.msi.get("string2") != 2)
            return false;
        if (this.msi.get("string3") != 3)
            return false;
        if (this.msi64.size != 3)
            return false;
        i64.setValue(1);
        if (!this.msi64.get("string1").equals(i64))
            return false;
        i64.setValue(2);
        if (!this.msi64.get("string2").equals(i64))
            return false;
        i64.setValue(3);
        if (!this.msi64.get("string3").equals(i64))
            return false;
        if (this.mss.size != 3)
            return false;
        if (this.mss.get("string1") != "1")
            return false;
        if (this.mss.get("string2") != "2")
            return false;
        if (this.mss.get("string3") != "3")
            return false;
        if (!this.obj.valid())
            return false;
        if (this.ao.length != 2)
            return false;
        if (!this.ao[0].valid())
            return false;
        if (!this.ao[1].valid())
            return false;
        if (this.buffer.length != 6)
            return false;
        if (this.buffer.readInt() != 1024)
            return false;
        if (this.buffer.readVarInt() != 1024)
            return false;
        if (this.buffer.bytesAvailable != 0)
            return false;
        if (this.aai.length != 2)
            return false;
        if (this.aai[0].length != 2)
            return false;
        if (this.aai[1].length != 2)
            return false;
        if (this.aai[0][0] != 10)
            return false;
        if (this.aai[0][1] != 11)
            return false;
        if (this.aai[1][0] != 20)
            return false;
        if (this.aai[1][1] != 21)
            return false;
        if (this.msmsi.size != 2)
            return false;
        if (!this.msmsi.get("key1"))
            return false;
        if (!this.msmsi.get("key2"))
            return false;
        if (this.msmsi.get("key1").get("key11") != 11)
            return false;
        if (this.msmsi.get("key1").get("key12") != 12)
            return false;
        if (this.msmsi.get("key2").get("key21") != 21)
            return false;
        if (this.msmsi.get("key2").get("key22") != 22)
            return false;
        return true;
    };
    return ReplyProtobufTestData;
}(ReplyMessage));
__decorate([
    field(1)
], ReplyProtobufTestData.prototype, "b", void 0);
__decorate([
    field(2, "char")
], ReplyProtobufTestData.prototype, "c", void 0);
__decorate([
    field(3, "short")
], ReplyProtobufTestData.prototype, "s", void 0);
__decorate([
    field(4)
], ReplyProtobufTestData.prototype, "i", void 0);
__decorate([
    field(5)
], ReplyProtobufTestData.prototype, "i64", void 0);
__decorate([
    field(6, "float")
], ReplyProtobufTestData.prototype, "f", void 0);
__decorate([
    field(7, "double")
], ReplyProtobufTestData.prototype, "lf", void 0);
__decorate([
    field(8)
], ReplyProtobufTestData.prototype, "str", void 0);
__decorate([
    field(9, "array", "bool")
], ReplyProtobufTestData.prototype, "ab", void 0);
__decorate([
    field(10, "array", "char")
], ReplyProtobufTestData.prototype, "ac", void 0);
__decorate([
    field(11, "array", "short")
], ReplyProtobufTestData.prototype, "as", void 0);
__decorate([
    field(12, "array", "int")
], ReplyProtobufTestData.prototype, "ai", void 0);
__decorate([
    field(13, "array", "long")
], ReplyProtobufTestData.prototype, "ai64", void 0);
__decorate([
    field(14, "array", "string")
], ReplyProtobufTestData.prototype, "ais", void 0);
__decorate([
    field(15, "array", "float")
], ReplyProtobufTestData.prototype, "af", void 0);
__decorate([
    field(16, "array", "double")
], ReplyProtobufTestData.prototype, "alf", void 0);
__decorate([
    field(19, "set", "int")
], ReplyProtobufTestData.prototype, "si", void 0);
__decorate([
    field(20, "set", "long")
], ReplyProtobufTestData.prototype, "si64", void 0);
__decorate([
    field(21, "set", "string")
], ReplyProtobufTestData.prototype, "ss", void 0);
__decorate([
    field(26, "map", "string", "int")
], ReplyProtobufTestData.prototype, "msi", void 0);
__decorate([
    field(27, "map", "string", "long")
], ReplyProtobufTestData.prototype, "msi64", void 0);
__decorate([
    field(28, "map", "string", "string")
], ReplyProtobufTestData.prototype, "mss", void 0);
__decorate([
    field(33)
], ReplyProtobufTestData.prototype, "obj", void 0);
__decorate([
    field(34, "array", ProtobufTestObject)
], ReplyProtobufTestData.prototype, "ao", void 0);
__decorate([
    field(40)
], ReplyProtobufTestData.prototype, "buffer", void 0);
__decorate([
    field(50, "array", "array", "int")
], ReplyProtobufTestData.prototype, "aai", void 0);
__decorate([
    field(51, "map", 'string', "map", "string", "int")
], ReplyProtobufTestData.prototype, "msmsi", void 0);
ReplyProtobufTestData = __decorate([
    protobuf
], ReplyProtobufTestData);
__reflect(ReplyProtobufTestData.prototype, "ReplyProtobufTestData");
//# sourceMappingURL=ProbutTestMessage.js.map