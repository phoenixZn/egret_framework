class ViewComponent extends GameComponent<RenderWorld>
{
	private m_view: egret3d.View3D;

	public InitializeComponent()
	{
		let stage3d = GameGlobal.Stage3D;

		this.m_view = new egret3d.View3D(0, 0, stage3d.width, stage3d.height);
		stage3d.addView3D(this.m_view);	
	}

	public Destruct()
    {
		let stage3d = GameGlobal.Stage3D;
		stage3d.removeView3D(this.m_view);
    }

	public set Scene(scene: egret3d.Scene3D)
	{
		this.m_view.scene = scene;
	}

	public get Scene(): egret3d.Scene3D
	{
		return this.m_view.scene;
	}

	public set Camera(camera: egret3d.Camera3D)
	{
		this.m_view.camera3D = camera;
	}

	public get Camera(): egret3d.Camera3D
	{
		return this.m_view.camera3D;
	}

}