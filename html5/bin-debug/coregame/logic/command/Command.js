var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommandType;
(function (CommandType) {
})(CommandType || (CommandType = {}));
var Command = (function () {
    function Command() {
    }
    Command.Create = function (type) {
        var cls = Command.m_creators.get(type);
        if (cls != null) {
            return new cls;
        }
        return null;
    };
    Command.Add = function (type, func) {
        var f = Command.m_creators.get(type);
        if (f && f != func)
            throw "duplicate commnand " + type;
        Command.m_creators.set(type, func);
    };
    Object.defineProperty(Command.prototype, "Type", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return Command;
}());
Command.m_creators = new Map();
__reflect(Command.prototype, "Command");
function command(target) {
    Command.Add(target.prototype.Type, target);
}
//# sourceMappingURL=Command.js.map