var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super.call(this) || this;
        _this.m_ani = new AnimationMovieClip;
        _this.m_speed = 10;
        _this.dir_list = ["right", "right_up", "up", "left_up", "left", "left_down", "down", "right_down"];
        return _this;
    }
    Actor.prototype.Init = function (joystick) {
        console.log("actor init.");
        this.m_joystick = joystick;
        this.m_ani.LoadAnimation("420_json", "420_png");
        this.addChild(this.m_ani);
        this.m_ani.Play("idle_left", true);
    };
    Actor.prototype.Update = function () {
        var angle = this.m_joystick.Angle;
        var pt = this.m_joystick.Point;
        var is_moving = pt.length != 0;
        var action_group = is_moving ? "run_" : "idle_";
        var index = (Math.ceil((angle + 22.5) / 45) - 1) % 8;
        var dir = this.dir_list[index];
        this.m_ani.Play(action_group + dir, true);
        if (is_moving) {
            this.x += pt.x * this.m_speed;
            this.y += pt.y * this.m_speed;
            var camera = GameGlobal.Stage3D.view3Ds[0].camera3D;
            camera.z -= pt.y * 10;
            camera.x += pt.x * 10;
        }
    };
    return Actor;
}(egret.DisplayObjectContainer));
__reflect(Actor.prototype, "Actor");
//# sourceMappingURL=Actor.js.map