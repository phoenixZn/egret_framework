class BubbleCommandHandler implements ICommandHandler
{
    m_logic_world : LogicWorld;

    public constructor(logic_world : LogicWorld)
    {
        this.m_logic_world = logic_world;
    }


    public Handle(command : Command) : boolean
    {
        switch (command.Type)
        {
            case BubbleCommandType.Operation:
                {
                    this.HandleOperation(command);
                    break;
                }
            default:
                break;
        }
        return false;
    }

    HandleOperation(command : Command) : void
    {
        let cmd : OperationCommand = <OperationCommand>command;
        let entity : Entity = this.m_logic_world.GetEntityManager().GetObject(cmd.m_entity_id);
        if (entity === undefined)
            return;

        var actor = entity.GetComponent<ActorCmpt>(ActorCmpt);
        if (actor === undefined)
            return;
        let op:Operation = new Operation();
        op.opType = cmd.m_opType;
        op.x = cmd.m_opX;
        op.y = cmd.m_opY;
        //egret.log("HandleOperation, x:" + op.x + ", y:" + op.y);
        actor.HandleOperation(op);
    }


}