var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Camera = (function () {
    function Camera(scene) {
        this.mScene = scene;
        this.x = 0;
        this.y = 0;
    }
    Object.defineProperty(Camera.prototype, "x", {
        get: function () {
            return this.mX;
        },
        set: function (newX) {
            if (this.mY != newX) {
                this.mX = newX;
                if (this.mScene) {
                    this.mScene.x = -this.mX;
                    this.mScene.clip(this.mX, this.mY);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "y", {
        get: function () {
            return this.mY;
        },
        set: function (newY) {
            if (this.mY != newY) {
                this.mY = newY;
                if (this.mScene) {
                    this.mScene.y = -this.mY;
                    this.mScene.clip(this.mX, this.mY);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}());
__reflect(Camera.prototype, "Camera");
//# sourceMappingURL=Camera.js.map