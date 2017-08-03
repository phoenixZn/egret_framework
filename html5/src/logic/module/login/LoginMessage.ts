// TypeScript file
@protobuf
class RequestMobileRoleLogin extends RequestMessage
{
	public get CLSID(): short
    {
        return MessageDef.Request_MobileRoleLogin;
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
class ReplyMobileRoleLoginResult extends ReplyMessage
{
	public get CLSID(): short
    {
        return MessageDef.Reply_MobileRoleLoginResult;
    }

    @field(1)
    ret: int;
    @field(2)
    char_info : MobileCharInfo;

    public constructor()
    {
        super();
        this.ret = -1;
        this.char_info = new MobileCharInfo();
    }
};