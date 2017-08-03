interface ICoreGameFactory
{
    GetObjectTypeData(id : int) : ObjectTypeData;
    GetObjectProtoData(id : int) : ObjectProtoData;

    CreateLogicWorld() : LogicWorld;
    CreateRenderWorld() : RenderWorld;

    RegisterComponents() : void;
    RegisterCommands() : void;
    RegisterRenderMessages() : void;
    CreateWorldCreationContext(init_info : CoreGameInitInfo) : WorldCreationContext;
}

class CoreGameInitInfo
{
    world_seed: int = 0;
    level_id: int = 0;
    player_pstids: Array<Int64> = new Array<Int64>();
    player_openids: Map<Int64, string> = new Map<Int64, string>();
}