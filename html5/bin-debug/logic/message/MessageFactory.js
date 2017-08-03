var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageFactory = (function () {
    function MessageFactory() {
    }
    MessageFactory.Add = function (clsid, func) {
        var f = MessageFactory.m_msg_creators.get(clsid);
        if (f && f != func)
            throw "duplicate message " + clsid;
        MessageFactory.m_msg_creators.set(clsid, func);
    };
    MessageFactory.Create = function (clsid) {
        var cls = this.m_msg_creators.get(clsid);
        if (cls != null) {
            return new cls;
        }
        return null;
    };
    return MessageFactory;
}());
MessageFactory.m_msg_creators = new Map();
__reflect(MessageFactory.prototype, "MessageFactory");
//# sourceMappingURL=MessageFactory.js.map