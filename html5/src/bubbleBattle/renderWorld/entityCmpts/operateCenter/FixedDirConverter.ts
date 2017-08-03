enum Dir8
{
    Right = 0,
    Right_Up,
    Up,
    Left_Up,
    Left,
    Left_Down,
    Down,
    Right_Down,
}

class Dir8Converter
{
    static Dir_Name_List : string[] = ["right", "right_up", "up", "left_up", "left", "left_down", "down", "right_down"];

    static GetDirIndex(dir : egret.Point) : int
    {
        if(dir.x == 0 && dir.y == 0)
            return -1;
        let angle : float = Math.atan2(-dir.y, dir.x) * 180 / Math.PI;
        return this.GetAngleIndex(angle);
    }

    static GetDirName(dir : egret.Point) : string
    {
        let dir_index = this.GetDirIndex(dir);
        if(dir_index == -1)
            return "null";
        return this.Dir_Name_List[dir_index];
    }


    static GetAngleIndex(angle : float) : int
    {
        let dir_index = (Math.ceil((angle + 22.5) / 45) - 1) % 8;
        return dir_index;
    }

    static GetAngleName(angle : float) : string
    {
        let dir_index = this.GetAngleIndex(angle);
        if(dir_index == -1)
            return "null";
        return this.Dir_Name_List[dir_index];
    }

}