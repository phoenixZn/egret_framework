namespace Msdk
{
  @protobuf
  export abstract class CallbackRet
  {
    @field(1)
    public flag: int = -1;
    @field(2)
    public desc: string = "";
    @field(3)
    public platform: int = 0;
  };

  @protobuf
  export class TokenRet
  {
    @field(1)
    public type: int = 0;
    @field(2)
    public value: string = "";
    @field(3)
    public expiration: Int64 = new Int64(0, 0);
  };

  @protobuf
  export class LoginRet extends CallbackRet
  {
    @field(10)
    public open_id: string = "";
    @field(11)
    public user_id: string = "";
    @field(12)
    public pf: string = "";
    @field(13)
    public pf_key: string = "";
    @field(14,"array","TokenRet")
    public token: Array<TokenRet> = new Array<TokenRet>();
  };

}
