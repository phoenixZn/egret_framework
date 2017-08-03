// TypeScript file

class Joystick extends egret.Sprite implements IJoystack
{
    public constructor()
    {
        super();
    }

    //控制面板区
    private control_bg: egret.Shape;
    //控制点
    private control_ball: egret.Shape;

    private bg_size = 150; 

    private control_point : egret.Point = new egret.Point();
    private control_angle : number = 0;

    private m_curr_touch_id: int = -1;

    public get Point() : egret.Point
    {
        return this.control_point;
    }

    public get Angle() : number
    {
        return this.control_angle;
    }

    public Init()
    {
        console.log("joystick init.");

        this.width = this.height = this.bg_size * 2;

        this.control_bg = new egret.Shape();
        this.control_bg.graphics.beginFill(0xffffff, 0.2);
        this.control_bg.graphics.drawCircle(0, 0, this.bg_size);
        this.control_bg.graphics.endFill();

        this.control_ball = new egret.Shape();
        this.control_ball.graphics.beginFill(0xff0011, 0.5);
        this.control_ball.graphics.drawCircle(0, 0, 50);
        this.control_ball.graphics.endFill();

        this.addChild(this.control_bg);
        this.addChild(this.control_ball);

        //this.touchEnabled = true;
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegin, this);
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMove, this);
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnd, this);
        GameGlobal.Stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.OnTouchEnd, this);
    }

    public OnTouchBegin(event: egret.TouchEvent)
    {
        if(this.control_bg.hitTestPoint(event.stageX, event.stageY))
        {
            this.m_curr_touch_id = event.touchPointID;
        }
    }

    public OnTouchMove(event: egret.TouchEvent)
    {
        if(this.m_curr_touch_id == event.touchPointID)
        {
            this.control_point.x = event.stageX - this.x;
            this.control_point.y = event.stageY - this.y;

            this.control_ball.x = this.control_point.x;
            this.control_ball.y = this.control_point.y;

            this.control_point.normalize(1);

            if(this.control_ball.x * this.control_ball.x + this.control_ball.y * this.control_ball.y > this.bg_size * this.bg_size)
            {
                this.control_ball.x = this.control_point.x * this.bg_size;
                this.control_ball.y = this.control_point.y * this.bg_size;            
            }
            
            this.control_angle = Math.atan2(-this.control_point.y, this.control_point.x) * 180 / Math.PI;
            if(this.control_angle < 0)
            {
                this.control_angle += 360;
            }

            //console.log(this.control_x, " ", this.control_y, " ", this.control_angle);
        }
    }

    public OnTouchEnd(event: egret.TouchEvent)
    {
        if(this.m_curr_touch_id == event.touchPointID)
        {
            this.control_ball.x = this.control_bg.x;
            this.control_ball.y = this.control_bg.y;

            this.control_point.x = this.control_point.y = 0;
            this.m_curr_touch_id = -1;
        }
    }

    //IJoystack
    public CurDir(): egret.Point
    {
        return this.control_point; 
    }
}
