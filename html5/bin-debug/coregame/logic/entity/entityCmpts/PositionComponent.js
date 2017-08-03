var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PositionComponent = (function (_super) {
    __extends(PositionComponent, _super);
    function PositionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_pos = new egret3d.Vector3D();
        return _this;
    }
    Object.defineProperty(PositionComponent.prototype, "Pos", {
        get: function () {
            return this.m_pos;
        },
        set: function (pos) {
            this.m_pos = pos;
        },
        enumerable: true,
        configurable: true
    });
    PositionComponent.prototype.PostInitializeComponent = function () {
        _super.prototype.PostInitializeComponent.call(this);
    };
    PositionComponent.prototype.OnDestruct = function () {
    };
    return PositionComponent;
}(EntityComponent));
__reflect(PositionComponent.prototype, "PositionComponent");
//# sourceMappingURL=PositionComponent.js.map