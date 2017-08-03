
//Test
class ActorRenderCmpt extends RenderEntityComponent
{
    protected m_role: egret3d.Role;
	protected m_joystick: Joystick;
	protected m_isLocal: boolean;

	protected m_pos_cmpt: PositionComponent = null;
	protected m_move_cmpt: ActorMoveCtrlCmpt = null;

	private m_camera_offset : egret3d.Vector3D = new egret3d.Vector3D(0,0,0);
	private m_camera : egret3d.Camera3D;

	private m_ge: egret3d.CubeGeometry;
	public PostInitializeComponent() 
	{
		super.PostInitializeComponent();

		this.m_joystick = this.GetRenderWorld().m_joystick;
		this.m_role = this.GetRenderWorld().Loader.GetCacheRole("test_01");
		this.m_role.globalZ = 4600;
		
		this.m_isLocal = this.Owner.GetCreationContext().m_custom_datas.has("IsLocal");

		let view_cmp = this.GetRenderWorld().GetComponent(ViewComponent);
		view_cmp.Scene.addChild(this.m_role);

		this.m_pos_cmpt = this.LogicEntity.GetComponent(PositionComponent);
		this.m_move_cmpt = this.LogicEntity.GetComponent(ActorMoveCtrlCmpt);
		this.m_pos_cmpt.Pos.x = this.m_role.x;
		this.m_pos_cmpt.Pos.y = this.m_role.y;
		this.m_pos_cmpt.Pos.z = this.m_role.z;


		var dirLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(0.3, -1.2, 0.1));
        dirLight.diffuse = 0x0f0fff;
		dirLight.intensity = 1;
        this.lights.addLight(dirLight);
		///创建纹理材质
        var mat = new egret3d.TextureMaterial();
        ///创建模型基类
        var ge: egret3d.CubeGeometry = new egret3d.CubeGeometry(30,30,30);
        ///生成mesh
        this.model = new egret3d.Mesh(ge, mat);
        this.model.material.lightGroup = this.lights;
		this.model.rotationY = 45;
        this.model.x = this.m_role.x + 100;
		this.model.y = this.m_role.y;
		this.model.z = this.m_role.z;
        ///插入model
        view_cmp.Scene.addChild(this.model);


		if(this.m_isLocal)
		{
			this.m_camera = this.GetRenderWorld().GetComponent(ViewComponent).Camera;
			this.m_camera_offset.x = this.m_camera.x - this.m_role.x;
			this.m_camera_offset.y = this.m_camera.y - this.m_role.y;
			this.m_camera_offset.z = this.m_camera.z - this.m_role.z;

			// this.m_camera_offset = this.m_camera.position;
			// this.m_camera_offset.decrementBy(this.m_role.position);
		}

		this.m_role.skeletonAnimation.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        this.m_role.skeletonAnimation.addEventListener(egret3d.AnimationEvent3D.CYCLE, this.onAnimationCycle, this);
	}

	protected onAnimationComplete(e: egret3d.LoaderEvent3D) 
	{
        if (this.m_role.skeletonAnimation.state.currentAnimName == BubbleConst.Ani_Move)
		{
			this.m_role.skeletonAnimation.play(BubbleConst.Ani_Move, 1, true);
		}
    }

    protected onAnimationCycle(e: egret3d.LoaderEvent3D) {
        this.model.scale.x += 0.1;
		this.model.rotationY += 5;
    }


	protected OnDestruct() : void
    {
		this.m_joystick = null;
    }

    public Update()
	{
		//临时这么写
		if (!this.m_move_cmpt.IsStop())
		{
			this.m_role.skeletonAnimation.play(BubbleConst.Ani_Move);
			this.m_role.skeletonAnimation.loopTime = this.m_role.skeletonAnimation.animTime;
			this.m_role.z = this.m_pos_cmpt.Pos.z;
			this.m_role.x = this.m_pos_cmpt.Pos.x;
			this.m_role.lookAt( this.m_role.position, this.m_role.position.add(this.m_move_cmpt.GetMoveDir()) );
			if(this.m_isLocal)
			{
				this.m_camera.z = this.m_role.z + this.m_camera_offset.z;
				this.m_camera.x = this.m_role.x + this.m_camera_offset.x;
			}
			
			this.model.x = this.m_role.x + 100;
			this.model.y = this.m_role.y;
			this.model.z = this.m_role.z;
			
		}
		else
		{
			this.m_role.skeletonAnimation.play(BubbleConst.Ani_Idle);
		}

	}

	private model: egret3d.Mesh;
	private lights: egret3d.LightGroup = new egret3d.LightGroup();
	protected createCube(scene3D : egret3d.Scene3D) 
	{

        ///创建纹理材质
        var mat = new egret3d.TextureMaterial();
        ///创建模型基类
        var ge: egret3d.CubeGeometry = new egret3d.CubeGeometry(100,30,300);
        ///生成mesh
        this.model = new egret3d.Mesh(ge,mat);
        this.model.material.lightGroup = this.lights;
        this.model.y = -100;
        ///插入model
        scene3D.addChild(this.model);
    }

}