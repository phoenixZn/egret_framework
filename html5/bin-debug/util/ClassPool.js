var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ClassPool = (function () {
    function ClassPool() {
        this.m_spare_list = new Array();
    }
    ClassPool.prototype.Alloc = function (t) {
        if (this.m_spare_list.length > 0) {
            return this.m_spare_list.pop();
        }
        return new t();
    };
    ClassPool.prototype.Dealloc = function (t) {
        t.Destroy();
        this.m_spare_list.push(t);
    };
    return ClassPool;
}());
__reflect(ClassPool.prototype, "ClassPool");
//# sourceMappingURL=ClassPool.js.map