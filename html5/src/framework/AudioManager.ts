class AudioManager
{
	private m_bgm : egret.SoundChannel;
	private m_bmg_sound: egret.Sound;

	public constructor()
	{
	}

	public Init()
	{
	}

	public async LoadBGM(path : string)
	{
		this.m_bmg_sound = await RES.getResAsync(path);
	}

	//背景音乐 资源无需预加载
	public PlayBGM()
	{
		this.m_bgm = this.m_bmg_sound.play(0, -1);
	}

	//播放音效 资源需预加载
	public PlaySound(path: string)
	{
		let sound: egret.Sound = RES.getRes(path);
		sound.play(0, 1);		
	}
}