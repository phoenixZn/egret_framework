var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetEventType;
(function (NetEventType) {
    NetEventType[NetEventType["ConnectFail"] = 0] = "ConnectFail";
    NetEventType[NetEventType["ConnectionEstablish"] = 1] = "ConnectionEstablish";
    NetEventType[NetEventType["ConnectionClose"] = 2] = "ConnectionClose";
    NetEventType[NetEventType["IncomingMessage"] = 3] = "IncomingMessage";
})(NetEventType || (NetEventType = {}));
var NetEvent = (function () {
    function NetEvent(type, conn) {
        this.type = type;
        this.conn = conn;
    }
    return NetEvent;
}());
__reflect(NetEvent.prototype, "NetEvent");
var NetInterface = (function () {
    function NetInterface(note) {
        this.m_event_list = new Array();
        this.m_note = note;
    }
    NetInterface.prototype.Connect = function (addr, port, proxy) {
        var conn = new NetConnection(this);
        conn.Connect(addr, port, proxy);
        return conn;
    };
    NetInterface.prototype.ProcessEvents = function () {
        if (this.m_event_list.length == 0) {
            return;
        }
        for (var _i = 0, _a = this.m_event_list; _i < _a.length; _i++) {
            var ev = _a[_i];
            this.ProcessEvent(ev);
        }
        this.m_event_list = new Array();
    };
    NetInterface.prototype.ProcessEvent = function (ev) {
        if (ev.type == NetEventType.IncomingMessage) {
            this.m_note.OnMessage(ev.conn, ev.message);
        }
        else if (ev.type == NetEventType.ConnectFail) {
            this.m_note.OnConnectFail(ev.conn);
        }
        else if (ev.type == NetEventType.ConnectionClose) {
            this.m_note.OnConnectClose(ev.conn);
        }
        else if (ev.type == NetEventType.ConnectionEstablish) {
            this.m_note.OnConnectEstablish(ev.conn);
        }
    };
    NetInterface.prototype.PostEvent = function (ev) {
        this.m_event_list.push(ev);
    };
    return NetInterface;
}());
__reflect(NetInterface.prototype, "NetInterface", ["IEventDispatcher"]);
//# sourceMappingURL=NetInterface.js.map