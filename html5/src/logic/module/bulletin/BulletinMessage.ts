// TypeScript file
@protobuf
class MobileServerInfo
{
    @field(1)
    id: int;
    @field(2)
    status: int;
    @field(3)
    type: int;
    @field(4)
    name: string;
    @field(5)
    ip: string;
    @field(6)
    port: int;
    @field(7)
    zone_id: int;

    public constructor()
    {
        this.id = 0;
        this.status = 0;
        this.type = 0;
        this.name = "";
        this.ip = "";
        this.port = 0;
        this.zone_id = 0;
    }
};

@protobuf
class MobileBulletinInfo
{
    @field(1)
    id: int;
    @field(2)
    title: string;
    @field(3)
    content: string;
    @field(4)
    timestr: string;
    @field(5)
    user: string;
    @field(6)
    rule: string;

    public constructor()
    {
        this.id = 0;
        this.title = "";
        this.content = "";
        this.timestr = "";
        this.user = "";
        this.rule = "";
    }
};

@protobuf
class LocalPushInfo
{
    @field(1)
    day_interval: int;
    @field(2)
    start: Int64;
    @field(3)
    title: string;
    @field(4)
    content: string;

    public constructor()
    {
        this.day_interval = 0;
        this.start = new Int64(0);
        this.title = "";
        this.content = "";
    }
};

@protobuf
class RequestGetServerInfo extends RequestMessage
{
	public get CLSID(): short
	{
		return MessageDef.Request_GetServerInfo;
	}
};

@protobuf
class ReplyGetServerInfo extends ReplyMessage
{
	public get CLSID(): short
	{
        return MessageDef.Reply_GetServerInfo;
    }

    @field(1)
    ret: int;
    @field(2,"array",MobileServerInfo)
    server_list: Array<MobileServerInfo>;
    @field(3,"array","int")
    haverole_server_list: Array<int>;
    @field(4,"array","int")
    recently_login_list: Array<int>;

    public constructor()
    {
        super();
        this.ret = 0;
        this.server_list = new Array<MobileServerInfo>();
        this.haverole_server_list = new Array<int>();
        this.recently_login_list = new Array<int>();
    }
};

@protobuf
class RequestGetDefaultServerInfo extends RequestMessage
{
	public get CLSID(): short
    {
        return MessageDef.Request_GetDefaultServerInfo;
    }

    @field(1)
    server_id: int;

    public constructor()
    {
        super();
        this.server_id = -1;
    }
};

@protobuf
class ReplyGetDefaultServerInfo extends ReplyMessage
{
	public get CLSID(): short
	{
		return MessageDef.Reply_GetDefaultServerInfo;
	}

    @field(1)
    ret: int;
    @field(2,"array",MobileBulletinInfo)
    bulletin_info: Array<MobileBulletinInfo>;
    @field(3)
    default_server: MobileServerInfo;
    @field(4,"array",LocalPushInfo)
    local_push_info_list: Array<LocalPushInfo>

    public constructor()
    {
        super();
        this.ret = 0;
        this.bulletin_info = new Array<MobileBulletinInfo>();
        this.default_server = new MobileServerInfo();
        this.local_push_info_list = new Array<LocalPushInfo>();
    }
};
