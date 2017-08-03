var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.blocks = [];
        return _this;
    }
    Scene.prototype.Init = function () {
        var texture_grass = RES.getRes("grass_png");
        var texture_flower = RES.getRes("flower_png");
        if (!texture_grass || !texture_flower) {
            console.log("load scene faied");
            return;
        }
        var cellWidth = 32;
        var cellHeight = 32;
        var blockWidth = 1024;
        var blockHeight = 1024;
        var sceneWidth = 960 * 5;
        var sceneHeight = 640 * 5;
        var block_rows = sceneHeight / blockHeight; //行数
        var bolck_cols = sceneWidth / blockWidth; //列数
        var rows = blockHeight / cellHeight;
        var cols = blockWidth / cellWidth;
        for (var x = 0; x < bolck_cols; x++) {
            for (var y = 0; y < block_rows; y++) {
                var block = new egret.DisplayObjectContainer();
                block.width = blockWidth;
                block.height = blockHeight;
                block.x = x * blockWidth;
                block.y = y * blockHeight;
                for (var i = 0; i < cols; i++) {
                    for (var j = 0; j < rows; j++) {
                        var grass = new egret.Bitmap();
                        grass.texture = texture_grass;
                        grass.width = cellWidth;
                        grass.height = cellHeight;
                        grass.x = i * cellWidth;
                        grass.y = j * cellHeight;
                        block.addChild(grass);
                        var num = this.randomNum(0, 10);
                        if (num >= 9) {
                            var flower = new egret.Bitmap();
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
    };
    Scene.prototype.clip = function (cameraX, cameraY) {
        var stageWidth = GameGlobal.Stage.stageWidth;
        var stageHeight = GameGlobal.Stage.stageHeight;
        //设裁剪窗口为 以摄像机坐标为左上角,舞台宽高为宽高的矩形.
        //场景中所有于裁剪窗口相交的都会显示出来,不相交的则隐藏.
        var windowRect = egret.Rectangle.create();
        windowRect.x = cameraX;
        windowRect.y = cameraY;
        windowRect.width = stageWidth;
        windowRect.height = stageHeight;
        var blockRect = egret.Rectangle.create();
        for (var i = 0, l = this.blocks.length; i < l; i++) {
            var block = this.blocks[i];
            var x = block.x;
            var y = block.y;
            var width = block.width;
            var height = block.height;
            blockRect.x = x;
            blockRect.y = y;
            blockRect.width = width;
            blockRect.height = height;
            block.visible = blockRect.intersects(windowRect);
            if (block.visible) {
                if (block.parent == null) {
                    this.addChildAt(block, 0);
                }
            }
            else {
                if (block.parent != null) {
                    this.removeChild(block);
                }
            }
        }
        egret.Rectangle.release(windowRect);
        egret.Rectangle.release(blockRect);
    };
    Scene.prototype.randomNum = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map