class FixPoint
{
	private data : long;

	public constructor(num : float = 0)
	{
		this.data = Math.round(num * 1000);
	}

	public get Number() : float
	{
		return this.data / 1000;
	}

	public Add(fp : FixPoint | float) : FixPoint
	{
		if(typeof fp == "number")
		{
			this.data += Math.round(fp * 1000);
		}
		else
		{
			this.data += fp.data;
		}
		return this;
	}

	public Sub(fp : FixPoint | float) : FixPoint
	{
		if(typeof fp == "number")
		{
			this.data -= Math.round(fp * 1000);
		}
		else
		{
			this.data -= fp.data;
		}
		return this;
	}

	public Mul(fp : FixPoint | float) : FixPoint
	{
		if(typeof fp == "number")
		{
			this.data *= Math.round(fp * 1000);
		}
		else
		{
			this.data *= fp.data;
		}
		return this;
	}

	public Div(fp : FixPoint | float) : FixPoint
	{
		if(typeof fp == "number")
		{
			this.data /= Math.round(fp * 1000);
		}
		else
		{
			this.data = Math.round(this.data / fp.data);
		}
		return this;
	}

	public Mod(fp : FixPoint | float) : FixPoint
	{
		if(typeof fp == "number")
		{
			this.data %= Math.round(fp * 1000);
		}
		else
		{
			this.data %= fp.data;
		}
		return this;
	}

}