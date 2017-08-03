var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleRenderMessageProcessor = (function () {
    function BubbleRenderMessageProcessor(render_world) {
        this.m_render_world = render_world;
        this.m_logic_world = render_world.GetLogicWorld();
        this.m_render_entity_manager = render_world.m_render_entity_manager;
    }
    BubbleRenderMessageProcessor.prototype.Destruct = function () {
        this.m_render_world = null;
        this.m_logic_world = null;
        this.m_render_entity_manager = null;
    };
    BubbleRenderMessageProcessor.prototype.Process = function (msg) {
        switch (msg.Type) {
            case RenderMessageType.CreateEntity:
                this.ProcessRenderMessage_CreateEntity(msg.EntityID);
                break;
            case RenderMessageType.DestroyEntity:
                this.ProcessRenderMessage_DestroyEntity(msg.EntityID);
                break;
            default:
                break;
        }
    };
    BubbleRenderMessageProcessor.prototype.ProcessRenderMessage_CreateEntity = function (entity_id) {
        var entity = this.m_logic_world.GetEntityManager().GetObject(entity_id);
        if (entity === undefined)
            return;
        this.m_render_entity_manager.CreateObject(entity.GetCreationContext());
    };
    BubbleRenderMessageProcessor.prototype.ProcessRenderMessage_DestroyEntity = function (entity_id) {
        this.m_render_entity_manager.DestroyObject(entity_id);
    };
    return BubbleRenderMessageProcessor;
}());
__reflect(BubbleRenderMessageProcessor.prototype, "BubbleRenderMessageProcessor", ["IRenderMessageProcessor"]);
//# sourceMappingURL=BubbleRenderMessageProcessor.js.map