@protobuf
class ClientInfo
{
    @field(1)
    public platform_anios: int = 0;
    @field(2)
    public client_version: string = "0.0.0.0";
    @field(3)
    public platform_qqwx: int = 0;
    @field(4)
    public server_list_md5: string = "";
    @field(5)
    public device_info: string = "";
    @field(6)
    public fps: int = 0;
    @field(7)
    public internet_type: int = 0;
    @field(8)
    public reg_channel: string = "";
    @field(9)
    public login_channel: string = "";
    @field(10)
    public launch_channel: int = 0;

    @field(11)
    public operatingSystem: string = "";
    @field(12)
    public processorType: string = "";
    @field(13)
    public processorCount: int = 0;
    @field(14)
    public systemMemorySize: int = 0;
    @field(15)
    public graphicsMemorySize: int = 0;
    @field(16)
    public graphicsDeviceName: string = "";
    @field(17)
    public graphicsDeviceVendor: string = "";
    @field(18)
    public graphicsDeviceID: int = 0;
    @field(19)
    public graphicsDeviceVendorID: int = 0;
    @field(20)
    public graphicsDeviceVersion: string = "";
    @field(21)
    public graphicsShaderLevel: int = 0;
    @field(22)
    public supportsShadows: boolean = false;
    @field(23)
    public supportsRenderTextures: boolean = false;
    @field(24)
    public supportsImageEffects: boolean = false;
    @field(25)
    public deviceUniqueIdentifier: string = "";
    @field(26)
    public deviceName: string = "";
    @field(27)
    public deviceModel: string = "";
    @field(28)
    public lodLevel: int = 0;
    @field(29)
    public is_guest: boolean = false;
};

class LoginModule extends GameModule
{
    private charinfo : MobileCharInfo = new MobileCharInfo();

    public async Login(): Promise<int>
    {
        let msg = new RequestMobileLogin();
        msg.login_info.open_id = GameGlobal.GameLogic.Account;
        msg.login_info.desc = GameGlobal.GameLogic.Account;
        let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyMobileLogin;
        if (!res)
            throw "expecting ReplyMobileLogin";

        return res.m_n_ret;
    }

    public async RoleLogin(): Promise<int>
    {
        let msg = new RequestMobileRoleLogin();
        msg.server_id = 1;
        egret.log(msg);
        let reply = await this.SendMessage(msg);
        if (!reply.Succ)
            return reply.err;

        let res = reply.msg as ReplyMobileRoleLoginResult;
        if (!res)
            throw "expecting ReplyMobileRoleLoginResult";

        this.charinfo = res.char_info;

        return res.ret;
    }

    public Pstid() : Int64
    {
        return this.charinfo.pstid;
    }
};
