class Scene extends egret.DisplayObjectContainer
{
	public constructor()
	{
		super();
	}

    blocks:egret.DisplayObjectContainer[] = [];

	public Init()
	{
 		let texture_grass:egret.Texture = RES.getRes("grass_png");
        let texture_flower: egret.Texture = RES.getRes("flower_png");
		if(!texture_grass || !texture_flower)
		{
			console.log("load scene faied");
			return;			
		}
        let cellWidth:number = 32;
        let cellHeight:number = 32;
        let blockWidth:number = 1024;
        let blockHeight:number = 1024;
        let sceneWidth = 960 * 5;
        let sceneHeight = 640 *5;
        let block_rows = sceneHeight/blockHeight; //行数
        let bolck_cols = sceneWidth/blockWidth;  //列数
        let rows = blockHeight / cellHeight;
        let cols = blockWidth / cellWidth; 

        for(var x = 0;x<bolck_cols;x++)
        {
            for(var y=0;y<block_rows;y++)
            {

                let block = new egret.DisplayObjectContainer();
                block.width = blockWidth;
                block.height = blockHeight;
                block.x = x * blockWidth;
                block.y = y * blockHeight;
             
                for(var i = 0;i<cols;i++)
                {
                    for(var j =0;j<rows;j++)
                    {
                        let grass = new egret.Bitmap();
                        grass.texture = texture_grass;
                        grass.width = cellWidth;
                        grass.height = cellHeight;
                        grass.x = i * cellWidth;
                        grass.y = j * cellHeight;
                        block.addChild(grass);
                        let num = this.randomNum(0,10);
                        if(num >= 9)
                        {
                            let flower = new egret.Bitmap();
                            flower.texture = texture_flower;
                            flower.width = cellWidth;
                            flower.height = cellHeight;
                            flower.x = i * cellWidth;
                            flower.y = j * cellHeight;
                            block.addChild(flower);
                        }
                    }
                }
                block.cacheAsBitmap = true;
                block.visible = false;
                this.blocks.push(block);
            }
        }

		this.width = sceneWidth;
		this.height = sceneHeight;
		console.log("scene init");
	}

    public clip(cameraX:number,cameraY:number)
    {
        let stageWidth = GameGlobal.Stage.stageWidth;
        let stageHeight = GameGlobal.Stage.stageHeight;
        //设裁剪窗口为 以摄像机坐标为左上角,舞台宽高为宽高的矩形.
        //场景中所有于裁剪窗口相交的都会显示出来,不相交的则隐藏.
        let windowRect = egret.Rectangle.create();
        windowRect.x = cameraX;
        windowRect.y = cameraY;
        windowRect.width = stageWidth;
        windowRect.height = stageHeight;
        let blockRect = egret.Rectangle.create();
        for(var i = 0, l = this.blocks.length; i < l; i++) {
            let block = this.blocks[i];
            let x = block.x;
            let y = block.y;
            let width = block.width;
            let height = block.height;
            blockRect.x = x;
            blockRect.y = y;
            blockRect.width = width;
            blockRect.height = height;
            block.visible = blockRect.intersects(windowRect);
            if(block.visible)
            {
                if(block.parent == null)
                {
                    this.addChildAt(block,0);
                }
            }else
            {
                if(block.parent != null)
                {
                    this.removeChild(block);
                }
            }
        }
        egret.Rectangle.release(windowRect);
        egret.Rectangle.release(blockRect);
    }

    private randomNum(min: number,max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}