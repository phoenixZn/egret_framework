@protobuf
abstract class CoreGameMessage extends InGameMessage
{
    @field(1)
    player_pstid: Int64 = new Int64(-1);
}

@protobuf
class InGameStartLoading extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_StartLoading; 
    }

    @field(1)
    world_seed: int = 0;
    @field(2)
    level_id: int = 0;
    @field(3, "array", "long")
    player_pstids: Array<Int64> = new Array<Int64>();
    @field(4, "map", "long", "string")
    player_openids: Map<Int64, string> = new Map<Int64, string>();

    public toString()
    {
        let str = "InGameStartLoading:";
        str += "\n  player_pstid=" + this.player_pstid.toOctetString()
        str += "\n  world_seed=" + this.world_seed;
        str += "\n  level_id=" + this.level_id;
        str += "\n  player_pstid=";
        this.player_pstids.forEach((v) =>
        {
            str += "(";
            str += v.toOctetString();
            str += ")";
        });
        str += "\n  player_openids=";
        this.player_openids.forEach((v,k) =>
        {
            str += "(";
            str += k.toOctetString()
            str += ",";
            str += v;
            str += ")";
        });

        return str;
    }
}

@protobuf
class InGameLoadingComplete extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_LoadingComplete; 
    }
}

@protobuf
class InGameStartGame extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_StartGame; 
    }
    @field(1)
    latency: int = 0;
}

@protobuf
class InGameSyncCommands extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_SyncCommands; 
    }
    
    @field(1)
    buff: NetBuffer = new NetBuffer();
    @field(2)
    turn: int = 0;

    commands: Array<Command> = new Array<Command>();

    public ToBuff()
    {
        for (let cmd of this.commands)
        {
            this.buff.writeShort(cmd.Type);
            save_object_field(cmd, null, this.buff);
        }
    }

    public FromBuff()
    {
        let type: short = 0;
        try
        {
            while (this.buff.bytesAvailable > 0)
            {
                type = this.buff.readShort();
                let cmd: Command = Command.Create(type);
                read_object_field(this.buff, 0, null, cmd);
                this.commands.push(cmd);
            }
        }
        catch (e)
        {
            egret.log("error on FromBuff");
        }

        // egret.log("FromBuff, cmd count=" + this.commands.length);
        // for (let cmd of this.commands) {
        //     let op = cmd as OperationCommand;
        //     egret.log("FromBuff, x:" + op.m_opX + ", y:" + op.m_opY);
        // }
    }

    public toString()
    {
        let str = "InGameSyncCommands:";
        str += "\n  turn=" + this.turn;
        str += "\n  bytes=" + this.buff.length;
        str += "\b  cmd=";
        this.commands.forEach((v) =>
        {
            str += "(";
            str += v.Type;
            str += ")";
        });
        return str;
    }
}

@protobuf
class InGameGameOver extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_GameOver; 
    }
    @field(1)
    crc: Int64 = new Int64(0);
}

@protobuf
class InGamePing extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_Ping; 
    }
    @field(1)
    send_time: int = 0;
}

@protobuf
class InGameHeartBeat extends CoreGameMessage
{
    public get CLSID() 
    { 
        return MessageDef.InGame_HeartBeat; 
    }

    @field(1)
    send_time: int = 0;
}
