var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewComponent = (function (_super) {
    __extends(ViewComponent, _super);
    function ViewComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewComponent.prototype.InitializeComponent = function () {
        var stage3d = GameGlobal.Stage3D;
        this.m_view = new egret3d.View3D(0, 0, stage3d.width, stage3d.height);
        stage3d.addView3D(this.m_view);
    };
    ViewComponent.prototype.Destruct = function () {
        var stage3d = GameGlobal.Stage3D;
        stage3d.removeView3D(this.m_view);
    };
    Object.defineProperty(ViewComponent.prototype, "Scene", {
        get: function () {
            return this.m_view.scene;
        },
        set: function (scene) {
            this.m_view.scene = scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewComponent.prototype, "Camera", {
        get: function () {
            return this.m_view.camera3D;
        },
        set: function (camera) {
            this.m_view.camera3D = camera;
        },
        enumerable: true,
        configurable: true
    });
    return ViewComponent;
}(GameComponent));
__reflect(ViewComponent.prototype, "ViewComponent");
//# sourceMappingURL=ViewComponent.js.map