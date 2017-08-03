var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderMessageType;
(function (RenderMessageType) {
    RenderMessageType[RenderMessageType["Invalid"] = 0] = "Invalid";
    RenderMessageType[RenderMessageType["CreateEntity"] = 1] = "CreateEntity";
    RenderMessageType[RenderMessageType["DestroyEntity"] = 2] = "DestroyEntity";
})(RenderMessageType || (RenderMessageType = {}));
var RenderMessage = (function () {
    function RenderMessage(type, entity_id) {
        this.m_entity_id = -1;
        this.m_type = RenderMessageType.Invalid;
        this.m_type = type;
        this.m_entity_id = entity_id;
    }
    Object.defineProperty(RenderMessage.prototype, "Type", {
        get: function () {
            return this.m_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderMessage.prototype, "EntityID", {
        get: function () {
            return this.m_entity_id;
        },
        enumerable: true,
        configurable: true
    });
    return RenderMessage;
}());
__reflect(RenderMessage.prototype, "RenderMessage");
var SimpleRenderMessage = (function (_super) {
    __extends(SimpleRenderMessage, _super);
    function SimpleRenderMessage(type, entity_id, simple_data) {
        if (simple_data === void 0) { simple_data = 0; }
        var _this = _super.call(this, type, entity_id) || this;
        _this.m_simple_data = 0;
        _this.m_simple_data = simple_data;
        return _this;
    }
    return SimpleRenderMessage;
}(RenderMessage));
__reflect(SimpleRenderMessage.prototype, "SimpleRenderMessage");
//# sourceMappingURL=RenderMessage.js.map