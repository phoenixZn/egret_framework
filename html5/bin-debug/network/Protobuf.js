var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtobufType;
(function (ProtobufType) {
    ProtobufType[ProtobufType["unknown"] = 0] = "unknown";
    ProtobufType[ProtobufType["bool"] = 1] = "bool";
    ProtobufType[ProtobufType["char"] = 2] = "char";
    ProtobufType[ProtobufType["short"] = 3] = "short";
    ProtobufType[ProtobufType["int"] = 4] = "int";
    ProtobufType[ProtobufType["long"] = 5] = "long";
    ProtobufType[ProtobufType["float"] = 6] = "float";
    ProtobufType[ProtobufType["double"] = 7] = "double";
    ProtobufType[ProtobufType["string"] = 8] = "string";
    ProtobufType[ProtobufType["array"] = 9] = "array";
    ProtobufType[ProtobufType["map"] = 10] = "map";
    ProtobufType[ProtobufType["set"] = 11] = "set";
    ProtobufType[ProtobufType["object"] = 12] = "object";
    ProtobufType[ProtobufType["buffer"] = 13] = "buffer";
})(ProtobufType || (ProtobufType = {}));
;
function get_protobuf_type(type) {
    switch (type) {
        case "bool": return ProtobufType.bool;
        case "char": return ProtobufType.char;
        case "short": return ProtobufType.short;
        case "int": return ProtobufType.int;
        case "long": return ProtobufType.long;
        case "float": return ProtobufType.float;
        case "double": return ProtobufType.double;
        case "string": return ProtobufType.string;
        case "array": return ProtobufType.array;
        case "map": return ProtobufType.map;
        case "set": return ProtobufType.set;
        case "object": return ProtobufType.object;
        case "buffer": return ProtobufType.buffer;
    }
    return ProtobufType.object;
}
function get_protobuf_type_string(type) {
    switch (type) {
        case ProtobufType.bool: return "bool";
        case ProtobufType.char: return "char";
        case ProtobufType.short: return "short";
        case ProtobufType.int: return "int";
        case ProtobufType.long: return "long";
        case ProtobufType.float: return "float";
        case ProtobufType.double: return "double";
        case ProtobufType.string: return "string";
        case ProtobufType.array: return "array";
        case ProtobufType.map: return "map";
        case ProtobufType.set: return "set";
        case ProtobufType.object: return "object";
        case ProtobufType.buffer: return "buffer";
    }
    throw "unrecognized type " + type;
}
var ProtobufWireType;
(function (ProtobufWireType) {
    ProtobufWireType[ProtobufWireType["length_delimit"] = 0] = "length_delimit";
    ProtobufWireType[ProtobufWireType["varint"] = 1] = "varint";
    ProtobufWireType[ProtobufWireType["data32"] = 2] = "data32";
    ProtobufWireType[ProtobufWireType["data64"] = 3] = "data64";
})(ProtobufWireType || (ProtobufWireType = {}));
;
function get_wire_type(type) {
    switch (type) {
        case "bool": return ProtobufWireType.varint;
        case "char": return ProtobufWireType.varint;
        case "short": return ProtobufWireType.varint;
        case "int": return ProtobufWireType.varint;
        case "long": return ProtobufWireType.varint;
        case "float": return ProtobufWireType.data32;
        case "double": return ProtobufWireType.data64;
        case "string": return ProtobufWireType.length_delimit;
        case "array": return ProtobufWireType.length_delimit;
        case "list": return ProtobufWireType.length_delimit;
        case "map": return ProtobufWireType.length_delimit;
        case "set": return ProtobufWireType.length_delimit;
        case "object": return ProtobufWireType.length_delimit;
        case "buffer": return ProtobufWireType.length_delimit;
    }
    return ProtobufWireType.length_delimit;
}
function get_wire_type_string(type) {
    switch (type) {
        case ProtobufWireType.length_delimit: return "length_delimit";
        case ProtobufWireType.varint: return "varint";
        case ProtobufWireType.data32: return "data32";
        case ProtobufWireType.data64: return "data64";
    }
    throw "unrecognized type " + type + " in get_wire_type_string";
}
var InheritFlag = 0xFEFE;
var FieldInfo = (function () {
    function FieldInfo(index, name, types, parent) {
        if (parent === void 0) { parent = null; }
        this.index = index;
        if (typeof name == "string") {
            this.name = name;
        }
        else {
            this.name = "object";
        }
        this.func = null;
        if (types && types.length > 0) {
            this.type = get_protobuf_type(types[0]);
            this.wtype = get_wire_type(types[0]);
            if (this.type == ProtobufType.object)
                this.func = types[0];
            types.splice(0, 1);
            if (this.type == ProtobufType.array || this.type == ProtobufType.set) {
                if (types.length < 1)
                    throw "more types needed";
                this.key = new FieldInfo(-1, types[0], types);
            }
            else if (this.type == ProtobufType.map) {
                if (types.length < 2)
                    throw "more types needed";
                this.key = new FieldInfo(-1, types[0], types, this);
                this.value = new FieldInfo(-1, types[0], types);
            }
            else {
                if (types.length > 0 && parent == null)
                    throw "too many types";
            }
        }
    }
    return FieldInfo;
}());
__reflect(FieldInfo.prototype, "FieldInfo");
;
var Fields = (function () {
    function Fields(func) {
        this.func = func;
        this.by_name = new Map();
        this.by_index = new Map();
    }
    return Fields;
}());
__reflect(Fields.prototype, "Fields");
;
var protobuf_field_info = new Map();
var building_field_info = null;
var object_index = 1;
var protobuf_initialized = false;
function protobuf_init() {
    if (protobuf_initialized)
        return;
    protobuf_field_info.forEach(function (v, k) {
        var fields = v;
        var func = fields.func;
        var pt = func.prototype;
        while (pt && pt.__class__) {
            if (pt.constructor && pt.constructor.protobuf_index && pt.constructor != func) {
                func["protobuf_base"] = pt.constructor;
                break;
            }
            pt = pt.__proto__;
        }
        if (func.prototype) {
            var clsid = func.prototype.CLSID;
            if (clsid)
                MessageFactory.Add(clsid, func);
        }
    });
    protobuf_initialized = true;
    egret.log(protobuf_field_info);
}
function get_object_func(obj) {
    return obj.constructor;
}
function get_object_base_func(func) {
    return func["protobuf_base"];
}
function get_protobuf_index(object) {
    var clsid = null;
    if (typeof object == "function")
        clsid = object.prototype.CLSID;
    else
        clsid = object.CLSID;
    if (clsid) {
        return clsid.toString();
    }
    var index = object.constructor["protobuf_index"];
    if (index)
        return object.constructor["protobuf_index"];
    index = object.__proto__.constructor.name;
    if (object.prototype)
        index = object.prototype.constructor.name;
    return index;
}
function save_protobuf_class(name, func) {
    var p = Object.create(null);
    if (parseInt(name).toString() == name) {
        p.value = name;
    }
    else {
        p.value = object_index.toString() + name;
        object_index++;
    }
    Object.defineProperty(func, "protobuf_index", p);
    if (!building_field_info) {
        building_field_info = new Fields(func);
    }
    protobuf_field_info.set(p.value, building_field_info);
    building_field_info = null;
    egret.log("adding " + p.value + " to metadata");
}
function save_protobuf_property(object, prop, index, types) {
    if (!building_field_info) {
        building_field_info = new Fields(object.constructor);
    }
    var info_by_name = building_field_info.by_name.get(prop);
    var info_by_index = building_field_info.by_index.get(index);
    if (!info_by_name || !info_by_index) {
        var fi = new FieldInfo(index, prop, types);
        if (!info_by_name) {
            building_field_info.by_name.set(prop, fi);
        }
        if (!info_by_index) {
            building_field_info.by_index.set(index, fi);
        }
        egret.log("caching " + index + "." + prop);
    }
}
function get_protobuf_property(func, prop) {
    var index = func["protobuf_index"];
    if (!protobuf_field_info.get(index))
        return null;
    return protobuf_field_info.get(index).by_name.get(prop);
}
// 获取对象的类型名字
function get_object_type(object) {
    if (!object)
        return null;
    var type = typeof object;
    if (type == "object")
        type = object.constructor.name;
    if (type == "undefined")
        throw "";
    return type;
}
// 类装饰器
function protobuf(target) {
    save_protobuf_class(get_protobuf_index(target), target);
}
// 属性装饰器
function field(index) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    return function (target, name) {
        save_protobuf_property(target, name, index, types);
    };
}
// 显示对象每个字段的内容，调试用
function show_fields(obj, indent) {
    if (indent === void 0) { indent = ""; }
    console.log(indent + "fields of " + get_object_type(obj));
    indent += "  ";
    if (!obj)
        return;
    var name = get_protobuf_index(obj);
    for (var prop in obj) {
        if (typeof obj[prop] == "function")
            continue;
        var class_info = protobuf_field_info.get(name);
        if (class_info && class_info.by_name.get(prop)) {
            var type = get_object_type(obj[prop]);
            if (type == "Int64") {
                console.log(indent + prop + " " + type + " " + class_info.by_name.get(prop).index + " " + obj[prop].toOctetString());
            }
            else {
                console.log(indent + prop + " " + type + " " + class_info.by_name.get(prop).index + " " + obj[prop]);
            }
            if (typeof obj[prop] == "object") {
                show_fields(obj[prop], indent + "  ");
            }
        }
    }
}
function encrypt(key, buffer, offset, length) {
    var orgpos = buffer.position;
    var end = length - length % 4;
    var pos = offset;
    for (; pos < offset + end; pos += 4) {
        buffer.position = pos;
        var b1 = buffer.readByte();
        var b2 = buffer.readByte();
        var b3 = buffer.readByte();
        var b4 = buffer.readByte();
        b1 ^= (key);
        b2 ^= (key >> 8);
        b3 ^= (key >> 16);
        b4 ^= (key >> 24);
        buffer.position = pos;
        buffer.writeByte(b1);
        buffer.writeByte(b2);
        buffer.writeByte(b3);
        buffer.writeByte(b4);
        key = CRC32.GetCRC32(buffer, pos, 4);
    }
    if (pos < offset + length) {
        buffer.position = pos;
        var b = buffer.readByte();
        b ^= key;
        buffer.position = pos++;
        buffer.writeByte(b);
    }
    if (pos < offset + length) {
        buffer.position = pos;
        var b = buffer.readByte();
        b ^= (key >> 8);
        buffer.position = pos++;
        buffer.writeByte(b);
    }
    if (pos < offset + length) {
        buffer.position = pos;
        var b = buffer.readByte();
        b ^= (key >> 16);
        buffer.position = pos++;
        buffer.writeByte(b);
    }
}
function decrypt(key, buffer, offset, length) {
    var orgpos = buffer.position;
    var end = length - length % 4;
    var pos = offset;
    for (; pos < offset + end; pos += 4) {
        var newkey = CRC32.GetCRC32(buffer, pos, 4);
        buffer.position = pos;
        var b1 = buffer.readByte();
        var b2 = buffer.readByte();
        var b3 = buffer.readByte();
        var b4 = buffer.readByte();
        b1 ^= (key);
        b2 ^= (key >> 8);
        b3 ^= (key >> 16);
        b4 ^= (key >> 24);
        buffer.position = pos;
        buffer.writeByte(b1);
        buffer.writeByte(b2);
        buffer.writeByte(b3);
        buffer.writeByte(b4);
        key = newkey;
    }
    if (pos < offset + length) {
        buffer.position = pos;
        var b = buffer.readByte();
        b ^= key;
        buffer.position = pos++;
        buffer.writeByte(b);
    }
    if (pos < offset + length) {
        buffer.position = pos;
        var b = buffer.readByte();
        b ^= (key >> 8);
        buffer.position = pos++;
        buffer.writeByte(b);
    }
    if (pos < offset + length) {
        buffer.position = pos;
        var b = buffer.readByte();
        b ^= (key >> 16);
        buffer.position = pos++;
        buffer.writeByte(b);
    }
    buffer.position = orgpos;
}
// 把obj的所有字段序列化到buffer中
function to_stream(obj, buffer, key) {
    protobuf_init();
    //egret.log(obj);
    var security_flag = 0xacabdeaf;
    var checksum = 0;
    var start = buffer.position;
    buffer.writeUnsignedInt(security_flag);
    buffer.writeUnsignedInt(0);
    buffer.writeUnsignedInt(0);
    save_object_field(obj, null, buffer);
    var end = buffer.position;
    var buff_start = start + 12;
    var buff_len = end - buff_start;
    if (obj.ENCRYPT) {
        encrypt(key, buffer, buff_start, buff_len);
        checksum = CRC32.GetCRC32(buffer, buff_start, buff_len);
    }
    buffer.position = start + 4;
    buffer.writeUnsignedInt(checksum);
    buffer.writeUnsignedInt(buff_len);
    buffer.position = end;
    return 0;
}
function save_field(obj, fi, buffer) {
    // 允许进行类型推断
    if (!fi.type) {
        switch (typeof obj) {
            case "object":
                {
                    fi.type = ProtobufType.object;
                    fi.wtype = ProtobufWireType.length_delimit;
                    fi.func = obj.constructor;
                    if (fi.func == Int64) {
                        fi.type = ProtobufType.long;
                        fi.wtype = ProtobufWireType.varint;
                    }
                    else if (fi.func == NetBuffer) {
                        fi.type = ProtobufType.buffer;
                        fi.wtype = ProtobufWireType.length_delimit;
                    }
                    break;
                }
            case "string":
                {
                    fi.type = ProtobufType.string;
                    fi.wtype = ProtobufWireType.length_delimit;
                    break;
                }
            case "number":
                {
                    fi.type = ProtobufType.int;
                    fi.wtype = ProtobufWireType.varint;
                    break;
                }
            case "boolean":
                {
                    fi.type = ProtobufType.int;
                    fi.wtype = ProtobufWireType.varint;
                    break;
                }
            case "function":
                {
                    return;
                }
            default: throw "unknown type " + typeof obj + " in save_field";
        }
    }
    // 获取序列化函数
    var func = get_save_funtion(fi.type);
    if (!func)
        return;
    // 序列化
    func(obj, fi, buffer);
}
function get_save_funtion(type) {
    switch (type) {
        case ProtobufType.bool:
        case ProtobufType.char:
        case ProtobufType.short:
        case ProtobufType.int: return save_int_field;
        case ProtobufType.long: return save_long_field;
        case ProtobufType.float: return save_float_field;
        case ProtobufType.double: return save_double_field;
        case ProtobufType.string: return save_string_field;
        case ProtobufType.array: return save_array_field;
        case ProtobufType.map: return save_map_field;
        case ProtobufType.set: return save_set_field;
        case ProtobufType.object: return save_object_field;
        case ProtobufType.buffer: return save_buffer_field;
        default:
            break;
    }
    throw ("cannot find function for " + type);
    //console.log( "cannot find function for " + type );
    //return null;
}
function save_type_desc(type, index, buffer) {
    if (index == -1)
        return;
    buffer.writeShort((index << 3) | type);
    return;
}
function save_int_field(obj, fi, buffer) {
    save_type_desc(fi.wtype, fi.index, buffer);
    var value = obj;
    buffer.writeVarInt(value);
    return;
}
function save_long_field(obj, fi, buffer) {
    save_type_desc(fi.wtype, fi.index, buffer);
    var value = obj;
    buffer.writeVarInt64(value);
    return;
}
function save_float_field(obj, fi, buffer) {
    save_type_desc(fi.wtype, fi.index, buffer);
    var value = obj;
    buffer.writeFloat(value);
    return;
}
function save_double_field(obj, fi, buffer) {
    save_type_desc(fi.wtype, fi.index, buffer);
    var value = obj;
    buffer.writeDouble(value);
    return;
}
function save_string_field(obj, fi, buffer) {
    var value = obj;
    if (value.length == 0)
        return;
    save_type_desc(fi.wtype, fi.index, buffer);
    buffer.writeInt(value.length + 1);
    buffer.writeUTFBytes(value);
    buffer.writeByte(0);
    return;
}
function save_object_field(obj, fi, buffer) {
    if (fi)
        save_type_desc(fi.wtype, fi.index, buffer);
    else
        save_type_desc(ProtobufWireType.length_delimit, -1, buffer);
    // 写入长度
    var pos = buffer.position;
    buffer.writeInt(0);
    // 写入每个属性
    var func = get_object_func(obj);
    while (func) {
        for (var prop in obj) {
            fi = get_protobuf_property(func, prop);
            if (fi) {
                save_field(obj[prop], fi, buffer);
            }
            else {
            }
        }
        if (func["protobuf_base"])
            buffer.writeUnsignedShort(InheritFlag);
        func = func["protobuf_base"];
    }
    // 修正长度
    var new_pos = buffer.position;
    buffer.position = pos;
    buffer.writeInt(new_pos - pos - 4);
    buffer.position = new_pos;
    return;
}
function save_array_field(obj, fi, buffer) {
    var value = obj;
    if (value.length == 0)
        return;
    save_type_desc(fi.wtype, fi.index, buffer);
    var pos = buffer.position;
    buffer.writeInt(0);
    buffer.writeInt(value.length);
    var func = get_save_funtion(fi.key.type);
    for (var i = 0; i < value.length; i++) {
        if (i == 0) {
            buffer.writeByte(fi.key.wtype);
        }
        func(value[i], fi.key, buffer);
    }
    var len = buffer.position - pos - 4;
    var now_pos = buffer.position;
    buffer.position = pos;
    buffer.writeInt(len);
    buffer.position = now_pos;
    return;
}
function save_set_field(obj, fi, buffer) {
    if (obj.size == 0)
        return 0;
    save_type_desc(fi.wtype, fi.index, buffer);
    var func = undefined;
    var pos = buffer.position;
    buffer.writeInt(0);
    buffer.writeInt(obj.size);
    obj.forEach(function (v, k) {
        if (!func) {
            buffer.writeByte(fi.key.wtype);
            func = get_save_funtion(fi.key.type);
        }
        func(v, fi.key, buffer);
    });
    var len = buffer.position - pos - 4;
    var now_pos = buffer.position;
    buffer.position = pos;
    buffer.writeInt(len);
    buffer.position = now_pos;
    return;
}
function save_map_field(obj, fi, buffer) {
    var value = obj;
    if (obj.size == 0)
        return;
    save_type_desc(fi.wtype, fi.index, buffer);
    var func_k = undefined;
    var func_v = undefined;
    var pos = buffer.position;
    buffer.writeInt(0);
    buffer.writeInt(obj.size);
    obj.forEach(function (v, k) {
        if (!func_k) {
            buffer.writeByte(fi.key.wtype);
            buffer.writeByte(fi.value.wtype);
            func_k = get_save_funtion(fi.key.type);
            func_v = get_save_funtion(fi.value.type);
        }
        func_k(k, fi.key, buffer);
        func_v(v, fi.value, buffer);
    });
    var len = buffer.position - pos - 4;
    var now_pos = buffer.position;
    buffer.position = pos;
    buffer.writeInt(len);
    buffer.position = now_pos;
    return;
}
function save_buffer_field(obj, fi, buffer) {
    var value = obj;
    if (value.length == 0)
        return;
    save_type_desc(fi.wtype, fi.index, buffer);
    buffer.writeInt(value.length);
    buffer.writeBytes(value);
    return;
}
function read_msg(buffer) {
    var clsid = buffer.readShort();
    var obj = MessageFactory.Create(clsid);
    if (obj) {
        try {
            obj.FromStream(buffer);
        }
        catch (e) {
            egret.log("failed to parse message " + clsid);
        }
    }
    else {
        egret.log("unknown message " + clsid);
    }
    return obj;
}
function from_stream(obj, buffer, key) {
    protobuf_init();
    var security_flag = buffer.readInt();
    var checksum = buffer.readInt();
    var buff_length = buffer.readInt();
    if (obj.ENCRYPT) {
        var crc = CRC32.GetCRC32(buffer, buffer.position, buff_length);
        if (checksum != crc) {
            throw "checksum error";
        }
        decrypt(key, buffer, buffer.position, buff_length);
    }
    // 反序列化
    var f = new FieldInfo(-1, "", [obj.constructor]);
    obj = read_object_field(buffer, ProtobufWireType.length_delimit, f, obj);
}
function read_field(buffer, wt, fi, object) {
    // 允许进行类型推断
    if (!fi.type) {
        switch (typeof object) {
            case "object":
                {
                    fi.type = ProtobufType.object;
                    fi.wtype = ProtobufWireType.length_delimit;
                    fi.func = object.constructor;
                    if (fi.func == Int64) {
                        fi.type = ProtobufType.long;
                        fi.wtype = ProtobufWireType.varint;
                    }
                    else if (fi.func == NetBuffer) {
                        fi.type = ProtobufType.buffer;
                        fi.wtype = ProtobufWireType.length_delimit;
                    }
                    break;
                }
            case "string":
                {
                    fi.type = ProtobufType.string;
                    fi.wtype = ProtobufWireType.length_delimit;
                    break;
                }
            case "number":
                {
                    fi.type = ProtobufType.int;
                    fi.wtype = ProtobufWireType.varint;
                    break;
                }
            case "boolean":
                {
                    fi.type = ProtobufType.int;
                    fi.wtype = ProtobufWireType.varint;
                    break;
                }
            default:
                {
                    throw "unknown type " + typeof object + " in read_field";
                }
        }
    }
    // 反序列化
    var func = get_read_function(fi.type);
    if (func) {
        return func(buffer, wt, fi, object);
    }
    return undefined;
}
function get_read_function(type) {
    switch (type) {
        case ProtobufType.bool:
        case ProtobufType.char:
        case ProtobufType.short:
        case ProtobufType.int: return read_int_field;
        case ProtobufType.long: return read_long_field;
        case ProtobufType.float: return read_float_field;
        case ProtobufType.double: return read_double_field;
        case ProtobufType.string: return read_string_field;
        case ProtobufType.array: return read_array_field;
        case ProtobufType.map: return read_map_field;
        case ProtobufType.set: return read_set_field;
        case ProtobufType.object: return read_object_field;
        case ProtobufType.buffer: return read_buffer_field;
    }
    throw "cannot get read function";
}
function read_int_field(buffer, wt, fi, target) {
    return buffer.readVarInt();
}
function read_long_field(buffer, wt, fi, target) {
    return buffer.readVarInt64();
}
function read_float_field(buffer, wt, info, target) {
    return buffer.readFloat();
}
function read_double_field(buffer, wt, info, target) {
    return buffer.readDouble();
}
function read_string_field(buffer, wt, fi, target) {
    var l = buffer.readInt();
    return buffer.readUTFBytes(l);
}
function read_object_field(inbuffer, wt, fi, target) {
    // 读长度
    var len = inbuffer.readInt();
    if (len == 0)
        return target;
    if (len > inbuffer.bytesAvailable)
        throw "len bigger than buffer";
    var buffer = new NetBuffer();
    inbuffer.readBytes(buffer, 0, len);
    // 创建对象
    var obj = target;
    var func = fi ? fi.func : (target ? target.constructor : null);
    if (!obj && func) {
        obj = new func;
    }
    // 反序列化
    var readed = 0;
    var typename = func["protobuf_index"]; // ? func["protobuf_index"] : get_protobuf_index(obj);
    while (buffer.bytesAvailable >= len - readed && readed < len) {
        var avail_bytes = buffer.bytesAvailable;
        var desc = buffer.readUnsignedShort();
        if (desc != InheritFlag) {
            var type = desc & 0x07;
            var index = desc >> 3;
            var fields = protobuf_field_info.get(typename);
            if (!fields)
                return obj;
            var cfi = fields.by_index.get(index);
            if (!cfi)
                return obj;
            var name_1 = cfi.name;
            if (!name_1)
                return obj;
            obj[name_1] = read_field(buffer, wt, cfi, obj[name_1]);
        }
        else {
            func = func["protobuf_base"];
            typename = func["protobuf_index"];
        }
        readed += avail_bytes - buffer.bytesAvailable;
    }
    return obj;
}
function read_array_field(inbuffer, wt, fi, target) {
    var len = inbuffer.readInt();
    if (len > inbuffer.bytesAvailable)
        throw "len bigger than buffer";
    var buffer = new NetBuffer();
    inbuffer.readBytes(buffer, 0, len);
    var array_len = buffer.readInt();
    if (array_len == 0)
        return target;
    var type = buffer.readByte();
    var func = get_read_function(get_protobuf_type(fi.key.name));
    var obj = target;
    for (var i = 0; i < array_len; i++) {
        var temp = func(buffer, type, fi.key, null);
        if (i == 0 && !obj) {
            obj = new Array();
        }
        obj[i] = temp;
    }
    return obj;
}
function read_set_field(inbuffer, wt, fi, target) {
    var len = inbuffer.readInt();
    if (len > inbuffer.bytesAvailable)
        throw "len bigger than buffer";
    var buffer = new NetBuffer();
    inbuffer.readBytes(buffer, 0, len);
    var size = buffer.readInt();
    if (size == 0)
        return target;
    var etype = buffer.readByte();
    var func = get_read_function(get_protobuf_type(fi.key.name));
    var obj = target;
    for (var i = 0; i < size; i++) {
        var temp = func(buffer, etype, fi.key, null);
        if (i == 0 && !obj) {
            obj = new Set();
        }
        obj.add(temp);
    }
    return obj;
}
function read_map_field(inbuffer, wt, fi, target) {
    var len = inbuffer.readInt();
    if (len > inbuffer.bytesAvailable)
        throw "len bigger than buffer";
    var buffer = new NetBuffer();
    inbuffer.readBytes(buffer, 0, len);
    var size = buffer.readInt();
    if (size == 0)
        return target;
    var ktype = buffer.readByte();
    var vtype = buffer.readByte();
    var func_k = get_read_function(get_protobuf_type(fi.key.name));
    var func_v = get_read_function(get_protobuf_type(fi.value.name));
    var obj = target;
    for (var i = 0; i < size; i++) {
        var temp_k = func_k(buffer, ktype, fi.key, null);
        var temp_v = func_v(buffer, vtype, fi.value, null);
        if (i == 0 && !obj) {
            obj = new Map();
        }
        obj.set(temp_k, temp_v);
    }
    return obj;
}
function read_buffer_field(buffer, wt, fi, target) {
    var l = buffer.readInt();
    if (l <= 0)
        return target;
    if (!target)
        target = new NetBuffer;
    buffer.readBytes(target, 0, l);
    return target;
}
//# sourceMappingURL=Protobuf.js.map