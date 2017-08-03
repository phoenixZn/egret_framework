type byte = number;
type char = number;
type uchar = number;
type short = number;
type ushort = number;
type int = number;
type uint = number;
type long = number;
type ulong = number;
type float = number;
type double = number;

class GameConst
{
	public static readonly LogicFrameLength : float = 33;
	public static readonly LogicFrameRate : int = 1000/GameConst.LogicFrameLength;

	public static readonly RequestTTL = 15 * 1000;
}
