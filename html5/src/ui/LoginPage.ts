class LoginPage extends UIBase
{
	public constructor()
	{
		super();
	}

	public username: eui.EditableText;
	public ip: eui.EditableText;
	public login_btn: eui.Button;

	protected partAdded(partName: string, instance: any): void
	{
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void
	{
		super.childrenCreated();
		this.login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.username.$setText("player_" + Math.round(Math.random()*10000));
	}

	protected async onClick()
	{
		let res = 0;

		// 读帐号
		GameGlobal.GameLogic.Account = this.username.$getText();
		egret.log("username is " + GameGlobal.GameLogic.Account);

		GameGlobal.AudioManager.PlayBGM();

		// 连接bulletin
		let bulletin = GameGlobal.GameLogic.ModuleManager.GetModule(BulletinModule);
		let login = GameGlobal.GameLogic.ModuleManager.GetModule(LoginModule);
		if (bulletin && login) {
			egret.log("logging in to " + this.ip.$getText());
			bulletin.SetAddress(this.ip.$getText(), 8111, "ws://172.17.100.111:9501");
			// egret.log("about to perform protobuf test");
			// res = await bulletin.TestProtobuf();
			// egret.log("protobuf test returns " + res);
			egret.log("about to login to bulletin");
			res = await bulletin.Login();
			egret.log("login to bulletin returns " + res );
			if (res == 0) {
				egret.log("about to get server info");
				res = await bulletin.GetServerInfo();
				egret.log("get server info returns " + res);
				res = await bulletin.GetDefaultServerInfo();
				egret.log("get default server info returns " + res);

				let server = bulletin.DefaultServer;
				login.SetAddress(server.ip,server.port,"ws://172.17.100.111:9501")
				egret.log("about to login to game");
				res = await login.Login();
				egret.log("login to game returns " + res);
				while (res == 2) {
					await new Promise((resolve)=>{setTimeout(resolve, 1000)});
					egret.log("about to login to game again");
					res = await login.Login();
					egret.log("login to game returns " + res);
				}
				if (res == 0) {
					egret.log("about to role login to game");
					res = await login.RoleLogin();
					egret.log("role login to game returns " + res + ", pstid=" + login.Pstid().toOctetString());
				}
			}
		}
		else {
			egret.log("bulletin/login is null");
		}
		
		if(res == 0)
		{
			GameGlobal.UIManager.SwitchUI(UIName.Match)
		}
		else
		{
			let panel = new eui.Panel();
			panel.title = "登陆失败";
			panel.horizontalCenter = 0;
			panel.verticalCenter = 0;
			this.addChild(panel);
		}
	}
}