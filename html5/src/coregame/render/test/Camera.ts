/**
 *
 * @author 
 *
 */
class Camera
{
    mScene: Scene;

    private mX: number;
    private mY: number;
    private mRect: egret.Rectangle;
    public constructor(scene: Scene)
    {
        this.mScene = scene;
        this.x = 0;
        this.y = 0;
    }


    get x(): number
    {
        return this.mX;
    }

    set x(newX: number)
    {
        if (this.mY != newX)
        {
            this.mX = newX;
            if (this.mScene)
            {
                this.mScene.x = -this.mX;
                this.mScene.clip(this.mX, this.mY);
            }
        }

    }

    get y(): number
    {
        return this.mY;
    }

    set y(newY: number)
    {
        if (this.mY != newY)
        {
            this.mY = newY;
            if (this.mScene)
            {
                this.mScene.y = -this.mY;
                this.mScene.clip(this.mX, this.mY);
            }
        }
    }
}
