var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Test
var ActorRenderCmpt = (function (_super) {
    __extends(ActorRenderCmpt, _super);
    function ActorRenderCmpt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_pos_cmpt = null;
        _this.m_move_cmpt = null;
        _this.m_camera_offset = new egret3d.Vector3D(0, 0, 0);
        _this.lights = new egret3d.LightGroup();
        return _this;
    }
    ActorRenderCmpt.prototype.PostInitializeComponent = function () {
        _super.prototype.PostInitializeComponent.call(this);
        this.m_joystick = this.GetRenderWorld().m_joystick;
        this.m_role = this.GetRenderWorld().Loader.GetCacheRole("test_01");
        this.m_role.globalZ = 4600;
        this.m_isLocal = this.Owner.GetCreationContext().m_custom_datas.has("IsLocal");
        var view_cmp = this.GetRenderWorld().GetComponent(ViewComponent);
        view_cmp.Scene.addChild(this.m_role);
        this.m_pos_cmpt = this.LogicEntity.GetComponent(PositionComponent);
        this.m_move_cmpt = this.LogicEntity.GetComponent(ActorMoveCtrlCmpt);
        this.m_pos_cmpt.Pos.x = this.m_role.x;
        this.m_pos_cmpt.Pos.y = this.m_role.y;
        this.m_pos_cmpt.Pos.z = this.m_role.z;
        var dirLight = new egret3d.DirectLight(new egret3d.Vector3D(0.3, -1.2, 0.1));
        dirLight.diffuse = 0x0f0fff;
        dirLight.intensity = 1;
        this.lights.addLight(dirLight);
        ///创建纹理材质
        var mat = new egret3d.TextureMaterial();
        ///创建模型基类
        var ge = new egret3d.CubeGeometry(30, 30, 30);
        ///生成mesh
        this.model = new egret3d.Mesh(ge, mat);
        this.model.material.lightGroup = this.lights;
        this.model.rotationY = 45;
        this.model.x = this.m_role.x + 100;
        this.model.y = this.m_role.y;
        this.model.z = this.m_role.z;
        ///插入model
        view_cmp.Scene.addChild(this.model);
        if (this.m_isLocal) {
            this.m_camera = this.GetRenderWorld().GetComponent(ViewComponent).Camera;
            this.m_camera_offset.x = this.m_camera.x - this.m_role.x;
            this.m_camera_offset.y = this.m_camera.y - this.m_role.y;
            this.m_camera_offset.z = this.m_camera.z - this.m_role.z;
        }
        this.m_role.skeletonAnimation.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        this.m_role.skeletonAnimation.addEventListener(egret3d.AnimationEvent3D.CYCLE, this.onAnimationCycle, this);
    };
    ActorRenderCmpt.prototype.onAnimationComplete = function (e) {
        if (this.m_role.skeletonAnimation.state.currentAnimName == BubbleConst.Ani_Move) {
            this.m_role.skeletonAnimation.play("test_01_qiujin.eam", 1, true);
        }
    };
    ActorRenderCmpt.prototype.onAnimationCycle = function (e) {
        this.model.scale.x += 0.1;
        this.model.rotationY += 5;
    };
    ActorRenderCmpt.prototype.OnDestruct = function () {
        this.m_joystick = null;
    };
    ActorRenderCmpt.prototype.Update = function () {
        //临时这么写
        if (!this.m_move_cmpt.IsStop()) {
            this.m_role.skeletonAnimation.play(BubbleConst.Ani_Move);
            this.m_role.skeletonAnimation.loopTime = this.m_role.skeletonAnimation.animTime;
            this.m_role.z = this.m_pos_cmpt.Pos.z;
            this.m_role.x = this.m_pos_cmpt.Pos.x;
            this.m_role.lookAt(this.m_role.position, this.m_role.position.add(this.m_move_cmpt.GetMoveDir()));
            if (this.m_isLocal) {
                this.m_camera.z = this.m_role.z + this.m_camera_offset.z;
                this.m_camera.x = this.m_role.x + this.m_camera_offset.x;
            }
            this.model.x = this.m_role.x + 100;
            this.model.y = this.m_role.y;
            this.model.z = this.m_role.z;
        }
        else {
            this.m_role.skeletonAnimation.play(BubbleConst.Ani_Idle);
        }
    };
    ActorRenderCmpt.prototype.createCube = function (scene3D) {
        ///创建纹理材质
        var mat = new egret3d.TextureMaterial();
        ///创建模型基类
        var ge = new egret3d.CubeGeometry(100, 30, 300);
        ///生成mesh
        this.model = new egret3d.Mesh(ge, mat);
        this.model.material.lightGroup = this.lights;
        this.model.y = -100;
        ///插入model
        scene3D.addChild(this.model);
    };
    return ActorRenderCmpt;
}(RenderEntityComponent));
__reflect(ActorRenderCmpt.prototype, "ActorRenderCmpt");
//# sourceMappingURL=ActorRenderCmpt.js.map