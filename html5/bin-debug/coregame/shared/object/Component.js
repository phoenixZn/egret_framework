var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameComponent = (function () {
    function GameComponent() {
        this.m_component_type_id = -1;
        this.m_disable_count = 0;
    }
    Object.defineProperty(GameComponent.prototype, "Owner", {
        get: function () {
            return this.m_owner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameComponent.prototype, "ComponentTypeID", {
        get: function () {
            return this.m_component_type_id;
        },
        enumerable: true,
        configurable: true
    });
    GameComponent.prototype.Destruct = function () {
    };
    GameComponent.prototype.PreInitialize = function (id, owner, variables) {
        this.m_component_type_id = id;
        this.m_owner = owner;
    };
    GameComponent.prototype.InitializeComponent = function () {
    };
    GameComponent.prototype.PostInitializeComponent = function () {
        if (this.m_disable_count == 0)
            this.OnEnable();
        else if (this.m_disable_count > 0)
            this.OnDisable();
    };
    // Enable Disable
    GameComponent.prototype.Enable = function () {
        if (this.m_disable_count > 0) {
            --this.m_disable_count;
            if (this.m_disable_count == 0)
                this.OnEnable();
        }
    };
    GameComponent.prototype.Disable = function () {
        ++this.m_disable_count;
        if (this.m_disable_count == 1)
            this.OnDisable();
    };
    GameComponent.prototype.IsEnable = function () {
        return this.m_disable_count == 0;
    };
    GameComponent.prototype.OnEnable = function () {
    };
    GameComponent.prototype.OnDisable = function () {
    };
    return GameComponent;
}());
__reflect(GameComponent.prototype, "GameComponent");
//# sourceMappingURL=Component.js.map