// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        _this.bg_size = 150;
        _this.control_point = new egret.Point();
        _this.control_angle = 0;
        _this.m_curr_touch_id = -1;
        return _this;
    }
    Object.defineProperty(Joystick.prototype, "Point", {
        get: function () {
            return this.control_point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Joystick.prototype, "Angle", {
        get: function () {
            return this.control_angle;
        },
        enumerable: true,
        configurable: true
    });
    Joystick.prototype.Init = function () {
        console.log("joystick init.");
        this.width = this.height = this.bg_size * 2;
        this.control_bg = new egret.Shape();
        this.control_bg.graphics.beginFill(0xffffff, 0.2);
        this.control_bg.graphics.drawCircle(0, 0, this.bg_size);
        this.control_bg.graphics.endFill();
        this.control_ball = new egret.Shape();
        this.control_ball.graphics.beginFill(0xff0011, 0.5);
        this.control_ball.graphics.drawCircle(0, 0, 50);
        this.control_ball.graphics.endFill();
        this.addChild(this.control_bg);
        this.addChild(this.control_ball);
        //this.touchEnabled = true;
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnTouchEnd, this);
    };
    Joystick.prototype.OnTouchBegin = function (event) {
        if (this.control_bg.hitTestPoint(event.stageX, event.stageY)) {
            this.m_curr_touch_id = event.touchPointID;
        }
    };
    Joystick.prototype.OnTouchMove = function (event) {
        if (this.m_curr_touch_id == event.touchPointID) {
            this.control_point.x = event.stageX - this.x;
            this.control_point.y = event.stageY - this.y;
            this.control_ball.x = this.control_point.x;
            this.control_ball.y = this.control_point.y;
            this.control_point.normalize(1);
            if (this.control_ball.x * this.control_ball.x + this.control_ball.y * this.control_ball.y > this.bg_size * this.bg_size) {
                this.control_ball.x = this.control_point.x * this.bg_size;
                this.control_ball.y = this.control_point.y * this.bg_size;
            }
            this.control_angle = Math.atan2(-this.control_point.y, this.control_point.x) * 180 / Math.PI;
            if (this.control_angle < 0) {
                this.control_angle += 360;
            }
        }
    };
    Joystick.prototype.OnTouchEnd = function (event) {
        if (this.m_curr_touch_id == event.touchPointID) {
            this.control_ball.x = this.control_bg.x;
            this.control_ball.y = this.control_bg.y;
            this.control_point.x = this.control_point.y = 0;
            this.m_curr_touch_id = -1;
        }
    };
    //IJoystack
    Joystick.prototype.CurDir = function () {
        return this.control_point;
    };
    return Joystick;
}(egret.Sprite));
__reflect(Joystick.prototype, "Joystick", ["IJoystack"]);
//# sourceMappingURL=Joystick.js.map