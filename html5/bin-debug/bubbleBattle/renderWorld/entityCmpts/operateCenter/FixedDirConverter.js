var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dir8;
(function (Dir8) {
    Dir8[Dir8["Right"] = 0] = "Right";
    Dir8[Dir8["Right_Up"] = 1] = "Right_Up";
    Dir8[Dir8["Up"] = 2] = "Up";
    Dir8[Dir8["Left_Up"] = 3] = "Left_Up";
    Dir8[Dir8["Left"] = 4] = "Left";
    Dir8[Dir8["Left_Down"] = 5] = "Left_Down";
    Dir8[Dir8["Down"] = 6] = "Down";
    Dir8[Dir8["Right_Down"] = 7] = "Right_Down";
})(Dir8 || (Dir8 = {}));
var Dir8Converter = (function () {
    function Dir8Converter() {
    }
    Dir8Converter.GetDirIndex = function (dir) {
        if (dir.x == 0 && dir.y == 0)
            return -1;
        var angle = Math.atan2(-dir.y, dir.x) * 180 / Math.PI;
        return this.GetAngleIndex(angle);
    };
    Dir8Converter.GetDirName = function (dir) {
        var dir_index = this.GetDirIndex(dir);
        if (dir_index == -1)
            return "null";
        return this.Dir_Name_List[dir_index];
    };
    Dir8Converter.GetAngleIndex = function (angle) {
        var dir_index = (Math.ceil((angle + 22.5) / 45) - 1) % 8;
        return dir_index;
    };
    Dir8Converter.GetAngleName = function (angle) {
        var dir_index = this.GetAngleIndex(angle);
        if (dir_index == -1)
            return "null";
        return this.Dir_Name_List[dir_index];
    };
    return Dir8Converter;
}());
Dir8Converter.Dir_Name_List = ["right", "right_up", "up", "left_up", "left", "left_down", "down", "right_down"];
__reflect(Dir8Converter.prototype, "Dir8Converter");
//# sourceMappingURL=FixedDirConverter.js.map