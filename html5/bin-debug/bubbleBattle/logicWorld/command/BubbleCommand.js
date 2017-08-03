/// <reference path="../../../network/Protobuf.ts"/>
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
var BubbleCommandType;
(function (BubbleCommandType) {
    BubbleCommandType[BubbleCommandType["Operation"] = 20] = "Operation";
})(BubbleCommandType || (BubbleCommandType = {}));
var OperationCommand = (function (_super) {
    __extends(OperationCommand, _super);
    function OperationCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_entity_id = 0;
        _this.m_opType = 0;
        _this.m_opX = 0;
        _this.m_opY = 0;
        return _this;
    }
    OperationCommand.prototype.Reset = function () {
        this.m_entity_id = 0;
        this.m_opType = 0;
        this.m_opX = 0;
        this.m_opY = 0;
    };
    Object.defineProperty(OperationCommand.prototype, "Type", {
        get: function () {
            return BubbleCommandType.Operation;
        },
        enumerable: true,
        configurable: true
    });
    return OperationCommand;
}(Command));
__decorate([
    field(1)
], OperationCommand.prototype, "m_entity_id", void 0);
__decorate([
    field(2)
], OperationCommand.prototype, "m_opType", void 0);
__decorate([
    field(3, "double")
], OperationCommand.prototype, "m_opX", void 0);
__decorate([
    field(4, "double")
], OperationCommand.prototype, "m_opY", void 0);
OperationCommand = __decorate([
    command,
    protobuf
], OperationCommand);
__reflect(OperationCommand.prototype, "OperationCommand");
//# sourceMappingURL=BubbleCommand.js.map