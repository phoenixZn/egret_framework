class WorldCreationContext extends ObjectCreationContext
{
    public m_level_id : int = -1;
    public m_game_mode : int = -1;
    public m_world_seed : int = -1;
    public m_pstid2proxyid : Map<long, int> = new Map<long, int>();
    public m_proxyid2pstid : Map<int, long> = new Map<int, long>();

    public m_entities : Array<ObjectCreationContext> = new Array<ObjectCreationContext>();
}