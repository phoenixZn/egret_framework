class Actor extends egret.DisplayObjectContainer
{
	private m_ani : AnimationMovieClip = new AnimationMovieClip;
	private m_speed : number = 10;

	private m_joystick : Joystick;

	public constructor()
	{
		super();
	}

	public Init(joystick : Joystick)
	{
		console.log("actor init.");

		this.m_joystick = joystick;
		this.m_ani.LoadAnimation("420_json", "420_png");
		this.addChild(this.m_ani);
		this.m_ani.Play("idle_left", true);
	}

	private dir_list : string[] = ["right", "right_up", "up", "left_up", "left", "left_down", "down", "right_down"];
	private last_action : string;

	public Update()
	{
		let angle : number = this.m_joystick.Angle;
		let pt : egret.Point = this.m_joystick.Point;

		let is_moving = pt.length != 0;
		let action_group : string = is_moving ? "run_" : "idle_";
		let index = (Math.ceil((angle + 22.5) / 45) - 1) % 8;
		let dir : string = this.dir_list[index];

		this.m_ani.Play(action_group + dir, true);

		if(is_moving)
		{
			this.x += pt.x * this.m_speed;
			this.y += pt.y * this.m_speed;

			let camera = GameGlobal.Stage3D.view3Ds[0].camera3D;
			camera.z -= pt.y * 10;
			camera.x += pt.x * 10;
		}
	}
}