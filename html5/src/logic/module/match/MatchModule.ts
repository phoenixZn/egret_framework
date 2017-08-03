class MatchModule extends GameModule
{
    private m_core_game: CoreGame;
    private m_latency: int = 0;

    public Init()
    {
        this.CallCenter.Listen(MessageDef.InGame_StartLoading, this.OnStartLoading, this);
        this.CallCenter.Listen(MessageDef.InGame_StartGame, this.OnStartGame, this);
        this.CallCenter.Listen(MessageDef.InGame_SyncCommands, this.OnSyncCommands, this);
        this.CallCenter.Listen(MessageDef.InGame_GameOver, this.OnGameOver, this);
        this.CallCenter.Listen(MessageDef.InGame_Ping, this.OnPing, this);
        this.CallCenter.Listen(MessageDef.InGame_HeartBeat, this.OnHeartBeat, this);
    }

    public async ApplyMatch(level_id: int = 0): Promise<int>
    {
        let msg = new RequestApplyMatch();
        msg.m_level_id = level_id;
        let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyApplyMatch;
        if (!res)
            throw "expecting ReplyApplyMatch";

        // ping
        let msg_ping = new InGamePing();
        msg_ping.send_time = egret.getTimer();
        this.CallCenter.SendMessageOnly(msg_ping);

        egret.log("request start " + egret.getTimer());

        return res.ret;
    }

    public async OnStartLoading(msg: InGameStartLoading)
    {
        egret.log("start loading " + egret.getTimer());

        GameGlobal.CoreGame = this.m_core_game = new CoreGame();

        //CoreGme初始化信息
        let info : CoreGameInitInfo = new CoreGameInitInfo();
        info.world_seed = msg.world_seed;
        info.level_id = msg.level_id;
        info.player_pstids = msg.player_pstids;
        info.player_openids = msg.player_openids;

        this.m_core_game.Init(info);
        await this.m_core_game.Prepare();
        await Sleep(100);

        egret.log("loading complete " + egret.getTimer());
        let msg_complete: InGameLoadingComplete = new InGameLoadingComplete();
        this.CallCenter.SendMessageOnly(msg_complete);
    }
    public OnStartGame(msg: InGameStartGame)
    {
        egret.log("start game " + egret.getTimer());
        this.m_core_game.Start(this.m_latency);
    }
    public OnSyncCommands(msg: InGameSyncCommands)
    {
        msg.FromBuff();
        this.m_core_game.Sync.HandleCommnads(msg.turn, msg.commands);
    }
    public OnGameOver(msg: InGameGameOver)
    {

    }
    public OnPing(msg: InGamePing)
    {
        this.m_latency = egret.getTimer() - msg.send_time;
        egret.log("InGamePing, latency=" + this.m_latency + "ms " + egret.getTimer());
    }
    public OnHeartBeat(msg: InGameHeartBeat)
    {
        let latency = (egret.getTimer() - msg.send_time)/2;
        egret.log("InGameHeartBeat, latency=" + latency + "ms");
    }
};
