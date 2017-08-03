var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleCoreGameFactory = (function () {
    function BubbleCoreGameFactory() {
    }
    BubbleCoreGameFactory.prototype.GetObjectTypeData = function (id) {
        return this.m_config.GetObjectTypeData(id);
    };
    BubbleCoreGameFactory.prototype.GetObjectProtoData = function (id) {
        return this.m_config.GetObjectProtoData(id);
    };
    BubbleCoreGameFactory.prototype.CreateLogicWorld = function () {
        return new BubbleLogicWorld();
    };
    BubbleCoreGameFactory.prototype.CreateRenderWorld = function () {
        return new BubbleRenderWorld();
    };
    BubbleCoreGameFactory.prototype.RegisterComponents = function () {
        ComponentTypeRegistry.Clear();
        //ComponentRegistry
        var category = CmptSuitableCategory.LogicWorld;
        ComponentTypeRegistry.Register(GameModeComponent, category);
        category = CmptSuitableCategory.LogicEntity;
        ComponentTypeRegistry.Register(PositionComponent, category);
        ComponentTypeRegistry.Register(PlayerComponent, category);
        ComponentTypeRegistry.Register(BlackboardComponent, category);
        ComponentTypeRegistry.Register(ActorCmpt, category);
        ComponentTypeRegistry.Register(ActorMoveCtrlCmpt, category);
        category = CmptSuitableCategory.RenderWorld;
        ComponentTypeRegistry.Register(ViewComponent, category);
        ComponentTypeRegistry.Register(RenderEntityManager, category);
        category = CmptSuitableCategory.RenderEntity;
        ComponentTypeRegistry.Register(ModelComponent, category);
        ComponentTypeRegistry.Register(AnimationComponent, category);
        ComponentTypeRegistry.Register(ActorRenderCmpt, category);
        ComponentTypeRegistry.Register(UILocalCtrlCmpt, category);
        this.m_config = new BubbleObjectConfig();
    };
    BubbleCoreGameFactory.prototype.RegisterCommands = function () {
        //TODO:  Use ResuableObjectPool
    };
    BubbleCoreGameFactory.prototype.RegisterRenderMessages = function () {
        //TODO:  Use ResuableObjectPool
    };
    BubbleCoreGameFactory.prototype.CreateWorldCreationContext = function (init_info) {
        var world_context = new WorldCreationContext();
        var login = GameGlobal.GameLogic.ModuleManager.GetModule(LoginModule);
        for (var _i = 0, _a = init_info.player_pstids; _i < _a.length; _i++) {
            var pstid = _a[_i];
            var isLocal = pstid.equals(login.Pstid());
            if (isLocal) {
                var obj_context = new ObjectCreationContext();
                obj_context.m_type_data = this.GetObjectTypeData(BubbleObjectConfig.LocalActorEntityID);
                obj_context.m_proto_data = this.GetObjectProtoData(BubbleObjectConfig.MusicBoyProtoID);
                obj_context.m_custom_datas.set("ActorName", pstid.toString());
                obj_context.m_custom_datas.set("Pos", new egret3d.Vector3D(0, 0, 0));
                obj_context.m_custom_datas.set("IsLocal", true);
                world_context.m_entities.push(obj_context);
            }
            else {
                var obj_context = new ObjectCreationContext();
                obj_context.m_type_data = this.GetObjectTypeData(BubbleObjectConfig.NetActorEntityID);
                obj_context.m_proto_data = this.GetObjectProtoData(BubbleObjectConfig.MusicBoyProtoID);
                obj_context.m_custom_datas.set("ActorName", pstid.toString());
                obj_context.m_custom_datas.set("Pos", new egret3d.Vector3D(1, 0, 0));
                world_context.m_entities.push(obj_context);
            }
        }
        return world_context;
    };
    return BubbleCoreGameFactory;
}());
__reflect(BubbleCoreGameFactory.prototype, "BubbleCoreGameFactory", ["ICoreGameFactory"]);
//# sourceMappingURL=BubbleCoreGameFactory.js.map