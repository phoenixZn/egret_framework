class ResourceLoader
{
	private m_cache: Map<string, any> = new Map<string, any>();

	public async LoadScene(name: string): Promise<egret3d.Scene3D>
	{
		return await RES.getResAsync("scene/" + name + "/scene.e3dPack");
	}

	public async CacheRole(name: string): Promise<egret3d.Role>
	{
		let role: egret3d.Role = await RES.getResAsync("actor/" + name + "/character.e3dPack");
		if(role != null)
		{
			this.m_cache.set("role_" + name, role);
		}
		return role;
	}

	public GetCacheRole(name: string) : egret3d.Role
	{
		let role: egret3d.Role = this.m_cache.get("role_" + name);
		return role.clone();
	}

	public async CreateRole(name: string): Promise<egret3d.Role>
	{
		let role: egret3d.Role = this.m_cache.get("role_" + name);
		if(role == null)
		{
			role = await this.CacheRole(name);
		}
		else
		{
			role = role.clone();
		}
		return role;
	}

	public async CreateEffect(name: string)
	{

	}

	public Clear()
	{
		this.m_cache = new Map<string, any>(); 
	}
}