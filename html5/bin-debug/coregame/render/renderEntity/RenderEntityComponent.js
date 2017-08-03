var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RenderEntityComponent = (function (_super) {
    __extends(RenderEntityComponent, _super);
    function RenderEntityComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_logicEntity = null;
        return _this;
    }
    RenderEntityComponent.prototype.GetOwnerPlayerID = function () {
        return 0;
    };
    Object.defineProperty(RenderEntityComponent.prototype, "LogicEntityID", {
        get: function () {
            return this.m_owner.LogicEntityID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderEntityComponent.prototype, "LogicEntity", {
        get: function () {
            return this.m_owner.LogicEntity;
        },
        enumerable: true,
        configurable: true
    });
    RenderEntityComponent.prototype.GetLogicWorld = function () {
        return this.m_owner.GetLogicWorld();
    };
    RenderEntityComponent.prototype.GetRenderWorld = function () {
        return this.m_owner.GetRenderWorld();
    };
    RenderEntityComponent.prototype.PostInitializeComponent = function () {
        _super.prototype.PostInitializeComponent.call(this);
        // IRenderNeedUpdateEveryFrame iupdate = this instanceof IRenderNeedUpdateEveryFrame;
        // if (iupdate != null)
        //     GetRenderWorld().GetComponent<RenderWorldEveryFrameUpdater>().Register(iupdate);
    };
    RenderEntityComponent.prototype.Destruct = function () {
        // IRenderNeedUpdateEveryFrame iupdate = this as IRenderNeedUpdateEveryFrame;
        // if (iupdate != null)
        //     GetRenderWorld().GetComponent<RenderWorldEveryFrameUpdater>().Unregister(iupdate);
        this.OnDestruct();
    };
    RenderEntityComponent.prototype.OnDestruct = function () {
    };
    return RenderEntityComponent;
}(GameComponent));
__reflect(RenderEntityComponent.prototype, "RenderEntityComponent");
//# sourceMappingURL=RenderEntityComponent.js.map