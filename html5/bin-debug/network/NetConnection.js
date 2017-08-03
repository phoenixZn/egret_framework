var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConnectStatus;
(function (ConnectStatus) {
    ConnectStatus[ConnectStatus["None"] = 0] = "None";
    ConnectStatus[ConnectStatus["Connecting"] = 1] = "Connecting";
    ConnectStatus[ConnectStatus["Connected"] = 2] = "Connected";
    ConnectStatus[ConnectStatus["Failed"] = 3] = "Failed";
    ConnectStatus[ConnectStatus["Closed"] = 4] = "Closed";
})(ConnectStatus || (ConnectStatus = {}));
;
var PingCycle = 30 * 1000;
var MaxNoPackTick = 120 * 1000;
var ConnectTimeout = 1000;
var NetConnection = (function () {
    function NetConnection(dispatcher) {
        this.m_send_offset = 0;
        this.m_ping = -1;
        this.m_last_pack_tick = 0;
        this.m_last_conn_tick = 0;
        this.m_packet_receving = null;
        this.m_timer = null;
        this.m_packets_buff = new Array();
        this.m_packets_send = new Array();
        this.m_socket = new egret.WebSocket;
        this.m_socket.type = egret.WebSocket.TYPE_BINARY;
        this.m_socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.m_socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.m_socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.m_socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.m_dispatcher = dispatcher;
        this.m_status = ConnectStatus.None;
    }
    Object.defineProperty(NetConnection.prototype, "Status", {
        get: function () {
            return this.m_status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetConnection.prototype, "IsConnected", {
        // INetConnection
        get: function () {
            return this.m_status == ConnectStatus.Connected;
        },
        enumerable: true,
        configurable: true
    });
    NetConnection.prototype.CloseConnection = function () {
        this.m_socket.close();
    };
    NetConnection.prototype.SendMessage = function (msg) {
        var pack = this.AllocPacket(false);
        pack.bodyBuffer.writeShort(msg.CLSID);
        msg.ToStream(pack.bodyBuffer);
        this.SendPacket(pack);
    };
    NetConnection.prototype.Ping = function () {
        return this.m_ping;
    };
    NetConnection.prototype.IsConnectTimeout = function () {
        if (this.m_status == ConnectStatus.Connecting) {
            if (egret.getTimer() - this.m_last_conn_tick > ConnectTimeout) {
                return true;
            }
        }
        return false;
    };
    NetConnection.prototype.Connect = function (ip, port, proxy) {
        if (this.m_status != ConnectStatus.None)
            return;
        this.RefreshTick();
        this.RefreshConnTick();
        var url = proxy.length > 0 ? (proxy + "?addr=" + ip + "&port=" + port) : null;
        this.m_status = ConnectStatus.Connecting;
        if (url)
            this.m_socket.connectByUrl(url);
        else
            this.m_socket.connect(ip, port);
    };
    NetConnection.prototype.AllocPacket = function (is_inner) {
        if (this.m_packets_buff.length > 0) {
            var p = this.m_packets_buff.shift();
            p.IsInner = is_inner;
            p.clear();
            return p;
        }
        return new NetPacket(is_inner);
    };
    NetConnection.prototype.DeallocPacket = function (p) {
        this.m_packets_buff.push(p);
    };
    NetConnection.prototype.RefreshTick = function () {
        this.m_last_pack_tick = egret.getTimer();
    };
    NetConnection.prototype.RefreshConnTick = function () {
        this.m_last_conn_tick = egret.getTimer();
    };
    NetConnection.prototype.ActivatePing = function () {
        this.m_timer = new egret.Timer(PingCycle);
        this.m_timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.m_timer.start();
    };
    NetConnection.prototype.SendPacket = function (pack) {
        pack.encode();
        this.m_packets_send.push(pack);
        if (this.m_packets_send.length == 1)
            this.PostSend();
    };
    NetConnection.prototype.PostSend = function () {
        if (this.m_packets_send.length != 0) {
            var p = this.m_packets_send.shift();
            this.m_socket.writeBytes(p.headBuffer);
            this.m_socket.writeBytes(p.bodyBuffer);
            this.m_socket.flush();
            this.DeallocPacket(p);
            this.PostSend();
        }
    };
    NetConnection.prototype.onReceiveMessage = function (e) {
        // 从socket中读数据
        var bytes = new NetBuffer();
        this.m_socket.readBytes(bytes);
        var offset = 0;
        while (bytes.bytesAvailable > 0) {
            // 分配packet
            if (!this.m_packet_receving)
                this.m_packet_receving = this.AllocPacket(false);
            // 如果是新的packet，先读header
            if (this.m_packet_receving.m_head_transfered == 0) {
                bytes.readBytes(this.m_packet_receving.headBuffer, 0, 4);
                this.m_packet_receving.decode();
                this.m_packet_receving.m_head_transfered += 4;
                offset += 4;
            }
            // 继续读body
            var left = this.m_packet_receving.payloadLength - this.m_packet_receving.m_body_transfered;
            var len = Math.min(left, bytes.bytesAvailable);
            if (len > 0) {
                this.m_packet_receving.m_body_transfered += len;
                bytes.readBytes(this.m_packet_receving.bodyBuffer, this.m_packet_receving.bodyBuffer.position, len);
                offset += len;
            }
            // 检查packet是否读完
            if (this.m_packet_receving.isCompleted) {
                this.RefreshTick();
                if (this.m_packet_receving.IsInner) {
                    this.HandleInnerCommand(this.m_packet_receving);
                }
                else {
                    var event_1 = new NetEvent(NetEventType.IncomingMessage, this);
                    event_1.message = read_msg(this.m_packet_receving.bodyBuffer);
                    if (event_1)
                        this.m_dispatcher.PostEvent(event_1);
                }
                this.DeallocPacket(this.m_packet_receving);
                this.m_packet_receving = null;
            }
        }
    };
    NetConnection.prototype.onSocketOpen = function () {
        this.ActivatePing();
        this.m_status = ConnectStatus.Connected;
        this.m_dispatcher.PostEvent(new NetEvent(NetEventType.ConnectionEstablish, this));
    };
    NetConnection.prototype.onSocketClose = function () {
        if (this.m_status == ConnectStatus.Connecting) {
            this.m_status = ConnectStatus.Failed;
            this.m_socket = null;
            this.m_dispatcher.PostEvent(new NetEvent(NetEventType.ConnectFail, this));
            this.m_timer.stop();
        }
        else if (this.m_status == ConnectStatus.Connected) {
            this.m_status = ConnectStatus.Closed;
            this.m_socket = null;
            this.m_dispatcher.PostEvent(new NetEvent(NetEventType.ConnectionClose, this));
            this.m_timer.stop();
        }
    };
    NetConnection.prototype.onSocketError = function () {
        this.CloseConnection();
    };
    NetConnection.prototype.HandleInnerCommand = function (packet) {
        var cmd = new inner_command();
        cmd.FromStream(packet.bodyBuffer);
        if (cmd.command == InnerCommand.NET_PONG) {
            this.m_ping = egret.getTimer() - cmd.param32_0;
        }
    };
    NetConnection.prototype.onTimer = function (event) {
        var tick = egret.getTimer();
        if (tick - this.m_last_pack_tick > MaxNoPackTick) {
            this.CloseConnection();
            return;
        }
        var ping = new inner_command();
        ping.command = InnerCommand.NET_PING;
        ping.param32_0 = tick;
        ping.param32_1 = this.m_ping;
        var packet = this.AllocPacket(true);
        ping.ToStream(packet.bodyBuffer);
        this.SendPacket(packet);
    };
    return NetConnection;
}());
__reflect(NetConnection.prototype, "NetConnection", ["INetConnection"]);
//# sourceMappingURL=NetConnection.js.map