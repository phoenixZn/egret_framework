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
var CoreGameMessage = (function (_super) {
    __extends(CoreGameMessage, _super);
    function CoreGameMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player_pstid = new Int64(-1);
        return _this;
    }
    return CoreGameMessage;
}(InGameMessage));
__decorate([
    field(1)
], CoreGameMessage.prototype, "player_pstid", void 0);
CoreGameMessage = __decorate([
    protobuf
], CoreGameMessage);
__reflect(CoreGameMessage.prototype, "CoreGameMessage");
var InGameStartLoading = (function (_super) {
    __extends(InGameStartLoading, _super);
    function InGameStartLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.world_seed = 0;
        _this.level_id = 0;
        _this.player_pstids = new Array();
        _this.player_openids = new Map();
        return _this;
    }
    Object.defineProperty(InGameStartLoading.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_StartLoading;
        },
        enumerable: true,
        configurable: true
    });
    InGameStartLoading.prototype.toString = function () {
        var str = "InGameStartLoading:";
        str += "\n  player_pstid=" + this.player_pstid.toOctetString();
        str += "\n  world_seed=" + this.world_seed;
        str += "\n  level_id=" + this.level_id;
        str += "\n  player_pstid=";
        this.player_pstids.forEach(function (v) {
            str += "(";
            str += v.toOctetString();
            str += ")";
        });
        str += "\n  player_openids=";
        this.player_openids.forEach(function (v, k) {
            str += "(";
            str += k.toOctetString();
            str += ",";
            str += v;
            str += ")";
        });
        return str;
    };
    return InGameStartLoading;
}(CoreGameMessage));
__decorate([
    field(1)
], InGameStartLoading.prototype, "world_seed", void 0);
__decorate([
    field(2)
], InGameStartLoading.prototype, "level_id", void 0);
__decorate([
    field(3, "array", "long")
], InGameStartLoading.prototype, "player_pstids", void 0);
__decorate([
    field(4, "map", "long", "string")
], InGameStartLoading.prototype, "player_openids", void 0);
InGameStartLoading = __decorate([
    protobuf
], InGameStartLoading);
__reflect(InGameStartLoading.prototype, "InGameStartLoading");
var InGameLoadingComplete = (function (_super) {
    __extends(InGameLoadingComplete, _super);
    function InGameLoadingComplete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InGameLoadingComplete.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_LoadingComplete;
        },
        enumerable: true,
        configurable: true
    });
    return InGameLoadingComplete;
}(CoreGameMessage));
InGameLoadingComplete = __decorate([
    protobuf
], InGameLoadingComplete);
__reflect(InGameLoadingComplete.prototype, "InGameLoadingComplete");
var InGameStartGame = (function (_super) {
    __extends(InGameStartGame, _super);
    function InGameStartGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.latency = 0;
        return _this;
    }
    Object.defineProperty(InGameStartGame.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_StartGame;
        },
        enumerable: true,
        configurable: true
    });
    return InGameStartGame;
}(CoreGameMessage));
__decorate([
    field(1)
], InGameStartGame.prototype, "latency", void 0);
InGameStartGame = __decorate([
    protobuf
], InGameStartGame);
__reflect(InGameStartGame.prototype, "InGameStartGame");
var InGameSyncCommands = (function (_super) {
    __extends(InGameSyncCommands, _super);
    function InGameSyncCommands() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buff = new NetBuffer();
        _this.turn = 0;
        _this.commands = new Array();
        return _this;
    }
    Object.defineProperty(InGameSyncCommands.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_SyncCommands;
        },
        enumerable: true,
        configurable: true
    });
    InGameSyncCommands.prototype.ToBuff = function () {
        for (var _i = 0, _a = this.commands; _i < _a.length; _i++) {
            var cmd = _a[_i];
            this.buff.writeShort(cmd.Type);
            save_object_field(cmd, null, this.buff);
        }
    };
    InGameSyncCommands.prototype.FromBuff = function () {
        var type = 0;
        try {
            while (this.buff.bytesAvailable > 0) {
                type = this.buff.readShort();
                var cmd = Command.Create(type);
                read_object_field(this.buff, 0, null, cmd);
                this.commands.push(cmd);
            }
        }
        catch (e) {
            egret.log("error on FromBuff");
        }
        // egret.log("FromBuff, cmd count=" + this.commands.length);
        // for (let cmd of this.commands) {
        //     let op = cmd as OperationCommand;
        //     egret.log("FromBuff, x:" + op.m_opX + ", y:" + op.m_opY);
        // }
    };
    InGameSyncCommands.prototype.toString = function () {
        var str = "InGameSyncCommands:";
        str += "\n  turn=" + this.turn;
        str += "\n  bytes=" + this.buff.length;
        str += "\b  cmd=";
        this.commands.forEach(function (v) {
            str += "(";
            str += v.Type;
            str += ")";
        });
        return str;
    };
    return InGameSyncCommands;
}(CoreGameMessage));
__decorate([
    field(1)
], InGameSyncCommands.prototype, "buff", void 0);
__decorate([
    field(2)
], InGameSyncCommands.prototype, "turn", void 0);
InGameSyncCommands = __decorate([
    protobuf
], InGameSyncCommands);
__reflect(InGameSyncCommands.prototype, "InGameSyncCommands");
var InGameGameOver = (function (_super) {
    __extends(InGameGameOver, _super);
    function InGameGameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.crc = new Int64(0);
        return _this;
    }
    Object.defineProperty(InGameGameOver.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_GameOver;
        },
        enumerable: true,
        configurable: true
    });
    return InGameGameOver;
}(CoreGameMessage));
__decorate([
    field(1)
], InGameGameOver.prototype, "crc", void 0);
InGameGameOver = __decorate([
    protobuf
], InGameGameOver);
__reflect(InGameGameOver.prototype, "InGameGameOver");
var InGamePing = (function (_super) {
    __extends(InGamePing, _super);
    function InGamePing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.send_time = 0;
        return _this;
    }
    Object.defineProperty(InGamePing.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_Ping;
        },
        enumerable: true,
        configurable: true
    });
    return InGamePing;
}(CoreGameMessage));
__decorate([
    field(1)
], InGamePing.prototype, "send_time", void 0);
InGamePing = __decorate([
    protobuf
], InGamePing);
__reflect(InGamePing.prototype, "InGamePing");
var InGameHeartBeat = (function (_super) {
    __extends(InGameHeartBeat, _super);
    function InGameHeartBeat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.send_time = 0;
        return _this;
    }
    Object.defineProperty(InGameHeartBeat.prototype, "CLSID", {
        get: function () {
            return MessageDef.InGame_HeartBeat;
        },
        enumerable: true,
        configurable: true
    });
    return InGameHeartBeat;
}(CoreGameMessage));
__decorate([
    field(1)
], InGameHeartBeat.prototype, "send_time", void 0);
InGameHeartBeat = __decorate([
    protobuf
], InGameHeartBeat);
__reflect(InGameHeartBeat.prototype, "InGameHeartBeat");
//# sourceMappingURL=MatchMessage.js.map