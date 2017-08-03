class BubbleRenderWorld extends RenderWorld
{
    public constructor()
    {
        super();
    }

    public Init(logic_world : LogicWorld, cmdSync : ICommnadSync)
	{
        super.Init(logic_world, cmdSync);
	}

    public async Prepare()
	{
        await super.Prepare();
	}

	public Start()
    {
        super.Start();
    }
}