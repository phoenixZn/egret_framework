var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventListener = (function () {
    function EventListener(func, thisobj, param) {
        this.func = func;
        this.thisobj = thisobj;
        this.param = param;
    }
    EventListener.prototype.Exec = function (event) {
        this.func.apply(this.thisobj, [event, this.param]);
    };
    return EventListener;
}());
__reflect(EventListener.prototype, "EventListener");
;
var EventListeners = (function () {
    function EventListeners() {
        this.listeners = new Array();
        this.listeners_once = new Array();
    }
    EventListeners.prototype.Add = function (func, thisobj, param, once) {
        if (once)
            this.listeners_once.push(new EventListener(func, thisobj, param));
        else
            this.listeners.push(new EventListener(func, thisobj, param));
    };
    EventListeners.prototype.Exec = function (event) {
        for (var _i = 0, _a = this.listeners_once; _i < _a.length; _i++) {
            var i = _a[_i];
            i.Exec(event);
        }
        for (var _b = 0, _c = this.listeners; _b < _c.length; _b++) {
            var i = _c[_b];
            i.Exec(event);
        }
        this.listeners_once = new Array();
    };
    return EventListeners;
}());
__reflect(EventListeners.prototype, "EventListeners");
;
var EventCenter = (function () {
    function EventCenter() {
        this.listeners = new Map();
    }
    EventCenter.prototype.Listen = function (id, func, thisobj, param) {
        if (!this.listeners.get(id))
            this.listeners.set(id, new EventListeners);
        this.listeners.get(id).Add(func, thisobj, param, false);
    };
    EventCenter.prototype.ListenOnce = function (id, func, thisobj, param) {
        if (!this.listeners.get(id))
            this.listeners.set(id, new EventListeners);
        this.listeners.get(id).Add(func, thisobj, param, true);
    };
    EventCenter.prototype.Trigger = function (id, event) {
        if (this.listeners.get(id))
            this.listeners.get(id).Exec(event);
    };
    EventCenter.prototype.Update = function () {
    };
    return EventCenter;
}());
__reflect(EventCenter.prototype, "EventCenter");
;
//# sourceMappingURL=EventCenter.js.map