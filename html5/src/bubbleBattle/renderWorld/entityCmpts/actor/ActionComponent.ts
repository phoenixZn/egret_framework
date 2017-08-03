class ActionComponent
{
	private m_ani: egret3d.SkeletonAnimation;
	private m_name: string;

	public Play(action: string)
	{
		this.m_ani.play(this.m_name + "_" + action + ".eam");
	}
}


class EventDispatcherExample extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        var dispatcher:CustomDispatcher = new CustomDispatcher();
        dispatcher.addEventListener(CustomDispatcher.ACTION, this.onAction, this);
        dispatcher.doAction();
    }

    private onAction(event:egret.Event):void {
        egret.log("onAction");
    }
}

class CustomDispatcher extends egret.EventDispatcher {
    public static ACTION:string = "action";

    public doAction():void {
        this.dispatchEventWith(CustomDispatcher.ACTION);
    }
}