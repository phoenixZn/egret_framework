/// <reference path="../../../network/Protobuf.ts"/>

enum BubbleCommandType
{
    Operation = 20,
}

@command
@protobuf
class OperationCommand extends Command
{
    @field(1)
    public m_entity_id : int = 0;
    @field(2)
    public m_opType : int = 0;
    @field(3,"double")
    public m_opX : int = 0;
    @field(4,"double")
    public m_opY : int = 0;

    public Reset()
    {
        this.m_entity_id = 0;
        this.m_opType = 0;
        this.m_opX = 0;
        this.m_opY = 0;
    }   

    public get Type(): short
	{
		return BubbleCommandType.Operation;
	}
}
