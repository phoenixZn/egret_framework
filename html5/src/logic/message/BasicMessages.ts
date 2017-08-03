/// <reference path="../../network/Protobuf.ts"/>
/// <reference path="MessageDef.ts"/>

enum MOBILE_LOGIN_ERROR
{
    MOBILE_LOGIN_OK = 0,
    MOBILE_LOGIN_MSDK_ERROR = 1,			//MSDK验证失败，客户端必须重新授权
    MOBILE_LOGIN_KICK_PLAYER = 2,			//玩家在线,正在踢掉，客户端以session 0默默重连
    MOBILE_LOGIN_SERVER_LIMIT = 3,			//超载，客户端提示用户“服务器超载”，进入重新授权页
    MOBILE_LOGIN_EMPTY_OPENID = 4,			//openid有误，这个不应该出现，进入重新授权页
    MOBILE_LOGIN_LOW_VERSION = 5,			//版本太低，提示强制升级，玩家选择“取消”则退回授权页，选择“确定”则下载新版本。
    MOBILE_LOGIN_SERVER_MAINTAIN = 6,       //服务器维护中，提示客户端，并且进入重新授权页。
    MOBILE_LOGIN_SEESION_ERROR = 7,
    MOBILE_LOGIN_BANNED = 8,                //被封号
    MOBILE_LOGIN_HIGH_VERSION = 9,	        //版本太高，去审核服。
    MOBILE_LOGIN_NOT_ACTIVITY = 10,	        //账号未激活
    MOBILE_LOGIN_ERROR_ACTIVATIONCODE = 11,	//激活码错误
};

enum MOBILE_LOGOUT_ERROR
{
    MOBILE_LOGOUT_NOERROR = 0,
    MOBILE_LOGOUT_USER_LOGOUT = 1,
    MOBILE_LOGOUT_TIMEOUT = 2,
    MOBILE_LOGOUT_MULTI_LGOIN = 3,
    MOBILE_LOGOUT_SERVER_KICK = 4,
    MOBILE_LOGOUT_NOT_LOGIN = 5,
    MOBILE_LOGOUT_SERVER_LIMIT      = 6,
    MOBILE_LOGOUT_SHUTDOWN_KICK     = 7,       // 服务器关闭踢人
    MOBILE_LOGOUT_MATCH_GAMEOVER    = 8,
    MOBILE_LOGOUT_LOGIN_BAN         = 9,        //被IDIP封号，踢下线
    MOBILE_LOGOUT_DEL_ROLE          = 10,       //删号，IDIP操作
	MOBILE_LOGOUT_IDIP_KICK			= 11,       //踢下线，IDIP操作
    MOBILE_LOGOUT_IDIP_ZERO_PROFIT  = 12,       //零收益踢下线，IDIP操作
    MOBILE_LOGOUT_TOKEN_EXPIRE      = 13,       //token失效
    MOBILE_LOGOUT_LOADDATA          = 14,       //加载数据失败，客户端不弹框提示

    MOBILE_LOGOUT_CLIENT_DEFINE     = 10000,
};

enum ROLE_RESULT_CODE
{
    ROLE_TRUE = 0,
    ROLE_SUCCESS = ROLE_TRUE,
    ROLE_FALSE = 1,
    ROLE_FAILED = ROLE_FALSE,

    ROLE_PERSIST_ERROR              = 2,
	ROLE_ERROR_NULL_OBJECT          = 3,
	ROLE_ERROR_NULL_PSTID           = 4,

	ROLE_ERROR_ALREADY_HAVE_ROLE    = 5,
	ROLE_ERROR_SEX                  = 6,
	ROLE_ERROR_NOT_ROLE             = 7,
	ROLE_ERROR_DUPLICATE_NICK       = 8,
	ROLE_ERROR_DIRTY_NICK           = 9,
	ROLE_ERROR_LONG_NICK            = 10,

    ROLE_ERROR_NOT_OPENID_ACCOUNTID = 11,
	ROLE_ERROR_ACCOUNT_HAVE_ROLE	= 12,   //要绑定的账号已经拥有角色
	ROLE_ERROR_SERVER_MAINTAIN		= 13,   //绑定时对应得服务器维护中
	ROLE_ERROR_MSDK_ERROR			= 14,   //校验失败
	ROLE_ALREADY_LOGIN              = 15,   //已经登录了
    ROLE_ERROR_MAX_REGISTER         = 16,   //已达最大注册上限
	ROLE_ERROR_SERVERID             = 17,   //服务器ID不对
	ROLE_ERROR_NULL_RANDOMNICK      = 18,   //已无随即昵称
	ROLE_ERROR_NOT_ENOUGH_DIAMOND   = 19,
    ROLE_ERROR_REGISTER_FLOWCONTROL = 20,   //稍后再试，注册速度太快

    ROLE_ERROR_BANNED_LOGIN = 1000, //已被封号
};

@protobuf
class RequestMobileLogin extends RequestMessage
{
	public get CLSID(): short
	{
		return MessageDef.Request_MobileLogin;
	}

    @field(1)
    public login_info : Msdk.LoginRet;
    @field(2)
    public client_info : ClientInfo;
    @field(3)
    public session : Int64;

    public constructor()
    {
        super();
        this.login_info = new Msdk.LoginRet();
        this.client_info = new ClientInfo();
        this.session = new Int64(0);
    }
}

@protobuf
class ReplyMobileLogin extends ReplyMessage
{
	public get CLSID(): short
	{
		return MessageDef.Reply_MobileLoginResult;
	}

    @field(1)
    m_session_id: Int64;
    @field(2)
    m_n_ret: int;
    @field(3)
    m_server_time: Int64;
    @field(4)
    m_version_status: string;
    @field(5)
    m_update_type: int;

    public constructor()
    {
        super();
        this.m_session_id = new Int64(0, 0);
        this.m_n_ret = 0;
        this.m_server_time = new Int64(0, 0);
        this.m_version_status = "";
        this.m_update_type = 0;
    }
}

class RequestMobileLogout extends RequestMessage
{
	public get CLSID(): short
	{
		return MessageDef.Request_MobileLogout;
	}
}

class ReplyMobileLogout extends ReplyMessage
{
	public get CLSID(): short
	{
		return MessageDef.Reply_MobileLogoutResult;
	}
}

@protobuf
class MobileCharInfo
{
    @field(1)
    pstid: Int64;

    public constructor()
    {
        this.pstid = new Int64(0);
    }
};

@protobuf
class RequestApplyMatch extends RequestMessage
{
    public get CLSID(): short
	{
		return MessageDef.RequestApplyMatch;
	}

    @field(1)
    m_cancel: boolean;
    @field(2)
    m_level_id: int;

    public constructor()
    {
        super();
        this.m_cancel = false;
        this.m_level_id = 0;
    }
};

@protobuf
class ReplyApplyMatch extends ReplyMessage
{
    public get CLSID(): short
    {
        return MessageDef.ReplyApplyMatch;
    }

    @field(1)
    ret: int;

    public constructor()
    {
        super();
        this.ret = 0;
    }
};

@protobuf
class PushApplyInfo extends ServerPushMessage
{
    public get CLSID(): short
    {
        return MessageDef.PushApplyInfo;
    }

    @field(1)
    count: int;

    public constructor()
    {
        super();
        this.count = 0;
    }
};
