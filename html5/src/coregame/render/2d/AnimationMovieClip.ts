class AnimationMovieClip extends egret.DisplayObjectContainer
{
	private m_mc_map : {[key : string] : egret.MovieClip} = {};
	private m_curr_mc : egret.MovieClip;
	private m_curr_action : string;

	public constructor()
	{
		super();
	}

	public LoadAnimation(json : string, textrue : string)
	{
		let data = RES.getRes(json);
		let txtr = RES.getRes(textrue);
		let fac = new egret.MovieClipDataFactory( data, txtr );
		let mcdata = fac.mcDataSet["mc"];
		for(let key in mcdata)
		{
			let val : egret.MovieClip =  new egret.MovieClip(fac.generateMovieClipData(key));
			let labels = mcdata[key]["labels"];
			for(let action of labels)
			{
				this.m_mc_map[action["name"]] = val;
			}
		}
	}

	public Play(action : string, loop : boolean)
	{
		if(action == this.m_curr_action)
		{
			return;
		}
		let mc : egret.MovieClip = this.m_mc_map[action];
		if(mc != null)
		{
			if(mc != this.m_curr_mc && this.m_curr_mc != null)
			{ 
				this.removeChild(this.m_curr_mc);
				this.m_curr_mc = null;
			}
			if(this.m_curr_mc == null)
			{
				this.m_curr_mc = mc;
				console.log(this.m_curr_mc);
				this.addChild(this.m_curr_mc);
			}
			mc.gotoAndPlay(action, loop ? -1 : 1);
			this.m_curr_action = action;
		}
	}

}