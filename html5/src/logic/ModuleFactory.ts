enum ModuleName
{
	Bulletin,
	Login,
	Match,
}

class ModuleFactory
{
	public Init(mng: GameModuleManager)
	{
		mng.AddModule(BulletinModule, ModuleType.Bulletin);
		mng.AddModule(LoginModule, ModuleType.Game);
		mng.AddModule(MatchModule, ModuleType.Game);
	}
}