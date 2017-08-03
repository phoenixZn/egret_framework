class BulletinModule extends GameModule
{
    private m_server_list : Array<MobileServerInfo>;
    private m_default_server : MobileServerInfo;

    public constructor()
    {
        super();
        this.m_server_list = null;
        this.m_default_server = null;
    }

    public get DefaultServer()
    {
        return this.m_default_server;
    }

    public async Login() : Promise<int>
    {
        let msg = new RequestMobileLogin();
		msg.login_info.open_id = GameGlobal.GameLogic.Account;
		let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyMobileLogin;
        if (!res)
            throw "exepcting ReplyMobileLogin";

        return res.m_n_ret;
    }

    public async GetServerInfo(): Promise<int>
    {
        let msg = new RequestGetServerInfo();
        let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyGetServerInfo;
        if (!res)
            throw "expecting ReplyGetServerInfo";
        this.m_server_list = res.server_list;

        return res.ret;
    }

    public async GetDefaultServerInfo() : Promise<int>
    {
        let msg = new RequestGetDefaultServerInfo();
        let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyGetDefaultServerInfo;
        if (!res)
            throw "expecting ReplyGetDefaultServerInfo";

        this.m_default_server = res.default_server;

        return res.ret;
    }

    public async TestProtobuf(): Promise<int>
    {
        let msg = new RequestProtobufTestData();
        msg.prepare();
        let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyProtobufTestData;
        if (!res)
            throw "expecting ReplyProtobufTestData";

        egret.log(res);
        if (!res.valid())
            return 10086;

        return 0;
    }
}