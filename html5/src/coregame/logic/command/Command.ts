enum CommandType
{
}

interface ICommandHandler
{
	Handle(command : Command) : boolean;
}

class Command
{
	private static m_creators: Map<int, any> = new Map<int, any>();
	
	public static Create(type: short): Command
	{
		let cls = Command.m_creators.get(type);
		if(cls != null)
		{
			return new cls;
		}
		return null;
	}

	public static Add(type: short, func: Function)
	{
		let f = Command.m_creators.get(type);
		if (f && f != func)
			throw "duplicate commnand " + type;
		Command.m_creators.set(type, func);
	}

	public constructor()
	{
	}

	public get Type(): short
	{
		return 0;
	}
}

function command(target: Function)
{
	Command.Add(target.prototype.Type, target);
}
