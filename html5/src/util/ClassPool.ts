interface IRecyleable
{
	Destroy() : void;
}

class ClassPool<T extends IRecyleable>
{
	private m_spare_list : Array<T> = new Array<T>();

	public constructor()
	{
	}

	public Alloc(t : {new(): T; }) : T
	{
		if(this.m_spare_list.length > 0)
		{
			return this.m_spare_list.pop();
		}
		return new t();
	}

	public Dealloc(t: T)
	{
		t.Destroy();
		this.m_spare_list.push(t);
	}
}