class MatchPage extends UIBase
{
	public constructor()
	{
		super();
	}

	apply: eui.Button;
	start: eui.Button;
	count: eui.Label;

	protected partAdded(partName: string, instance: any): void
	{
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void
	{
		super.childrenCreated();
		this.apply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onApply, this);
		this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
		GameGlobal.GameLogic.Game.Listen(MessageDef.PushApplyInfo,this.onApplyInfo,this);
		this.start.enabled = false;
	}

	protected async onApply()
	{
		let match = GameGlobal.GameLogic.ModuleManager.GetModule(MatchModule);
		if (match) {
			this.apply.enabled = false;
			this.start.enabled = true;
			let res = await match.ApplyMatch();
			egret.log("apply match returns " + res);
		}
	}

	protected async onStart()
	{
		let match = GameGlobal.GameLogic.ModuleManager.GetModule(MatchModule);
		if (match) {
			let res = await match.ApplyMatch();
			egret.log("start match returns " + res);
			GameGlobal.UIManager.HideAll();
		}
	}

	protected onApplyInfo(msg: PushApplyInfo)
	{
		if (msg)
			this.count.text = msg.count.toString();
	}
};
