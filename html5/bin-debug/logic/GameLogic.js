var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLogic = (function () {
    function GameLogic() {
        this.m_module_manager = new GameModuleManager();
        this.m_bulletin = new CallCenter();
        this.m_game = new CallCenter();
        this.m_match = new CallCenter();
        this.m_account = "1234";
    }
    GameLogic.prototype.Init = function () {
        this.m_module_manager.Init();
    };
    GameLogic.prototype.Update = function () {
        this.m_bulletin.Update();
        this.m_game.Update();
        this.m_match.Update();
    };
    Object.defineProperty(GameLogic.prototype, "Bulletin", {
        get: function () {
            return this.m_bulletin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLogic.prototype, "Game", {
        get: function () {
            return this.m_game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLogic.prototype, "Match", {
        get: function () {
            return this.m_match;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLogic.prototype, "ModuleManager", {
        get: function () {
            return this.m_module_manager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLogic.prototype, "Account", {
        get: function () {
            return this.m_account;
        },
        set: function (value) {
            this.m_account = value;
        },
        enumerable: true,
        configurable: true
    });
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map