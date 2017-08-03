var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleCommandHandler = (function () {
    function BubbleCommandHandler(logic_world) {
        this.m_logic_world = logic_world;
    }
    BubbleCommandHandler.prototype.Handle = function (command) {
        switch (command.Type) {
            case BubbleCommandType.Operation:
                {
                    this.HandleOperation(command);
                    break;
                }
            default:
                break;
        }
        return false;
    };
    BubbleCommandHandler.prototype.HandleOperation = function (command) {
        var cmd = command;
        var entity = this.m_logic_world.GetEntityManager().GetObject(cmd.m_entity_id);
        if (entity === undefined)
            return;
        var actor = entity.GetComponent(ActorCmpt);
        if (entity === undefined)
            return;
        var op = new Operation();
        op.opType = cmd.m_opType;
        op.x = cmd.m_opX;
        op.y = cmd.m_opY;
        //egret.log("HandleOperation, x:" + op.x + ", y:" + op.y);
        actor.HandleOperation(op);
    };
    return BubbleCommandHandler;
}());
__reflect(BubbleCommandHandler.prototype, "BubbleCommandHandler", ["ICommandHandler"]);
//# sourceMappingURL=BubbleCommandHandler.js.map