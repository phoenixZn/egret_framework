class MessageFactory
{
	private static m_msg_creators : Map<short, any> = new Map<MessageDef, any>();

	public static Add(clsid: short, func: Function)
	{
		let f = MessageFactory.m_msg_creators.get(clsid);
		if (f && f != func)
			throw "duplicate message " + clsid;

		MessageFactory.m_msg_creators.set(clsid, func);
	}

	public static Create(clsid: short) : NetMessage
	{
		let cls = this.m_msg_creators.get(clsid);
		if(cls != null)
		{
			return new cls;
		}
		return null;
	}
}