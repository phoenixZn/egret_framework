enum UIName
{
	Login,
	Match,
	Ingame,
}

class UIFactory
{
	private m_ui_creators : Map<UIName, any> = new Map<UIName, any>();

	public Init()
	{
		this.m_ui_creators.set(UIName.Login, LoginPage);
		this.m_ui_creators.set(UIName.Match, MatchPage);
	}

	public Create(name : UIName) : UIBase
	{
		let cls = this.m_ui_creators.get(name);
		if(cls != null)
		{
			return new cls;
		}
		return null;
	}
}