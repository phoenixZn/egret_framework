
class BombRenderCmpt extends RenderEntityComponent
{
	protected m_pos_cmpt: PositionComponent = null;

	public PostInitializeComponent() 
	{
		super.PostInitializeComponent();

		this.m_pos_cmpt = this.LogicEntity.GetComponent(PositionComponent);
        let view_cmp = this.GetRenderWorld().GetComponent(ViewComponent);

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
        this.model.position = this.m_pos_cmpt.Pos;
        ///插入model
        view_cmp.Scene.addChild(this.model);
	}


	protected OnDestruct() : void
    {
    }

    public Update()
	{
        this.model.scale.x += 0.1;
		//this.model.rotationY += 5;
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