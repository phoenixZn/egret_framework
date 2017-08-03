////////////////////////////////////////
// Buffer.ts
// extend egret.ByteArray, implement writeInt64
// @author zrongzrong@gmail.com
// Creation 2015-09-14
////////////////////////////////////////

class NetBuffer extends egret.ByteArray
{
    private static SIZE_OF_INT64:number = 8;
    private static SIZE_OF_UINT64:number = 8;

    constructor(buffer?:ArrayBuffer)
    {
        super(buffer);
        this.endian = egret.Endian.LITTLE_ENDIAN;
    }

    public readUnsignedInt64(raw=true):any {
        return this.readInt64(raw);
    }

    public writeUnsignedInt64(value:any):void {
        this.writeInt64(value);
    }

    public readInt64(raw=true):any {
        if (!this.validate(NetBuffer.SIZE_OF_INT64)) return null;
        var buffer:Array<number> = [];
        for(var i:number=0; i<NetBuffer.SIZE_OF_INT64; i++)
        {
            buffer[i] = this.readUnsignedByte();
        }
        var intValue:Int64 = new Int64(buffer);
        if(raw)
        {
            return intValue.toNumber();
        }
        return intValue;
    }

    public writeInt64(value:any):void {
        var intValue:Int64;
        if(typeof(value) == 'number')
        {
            intValue = new Int64(value);
        }
        else
        {
            intValue = value;
        }
        var buffer:Array<number> = intValue.toBuffer(true);
        for(var i:number=0; i<buffer.length; i++)
        {
            this.writeByte(buffer[i]);
        }
    }

    public readVarInt(): int
    {
        let n: long = 0;
        let shift: int = 0;
        for (; ;) {
            let b: char = this.readUnsignedByte();
            let v: char = b & 0x7F;
            n += v << shift;
            shift += 7;
            if ((b & 0x80) == 0)
                break;
        }
        return (n >> 1) ^ (-(n & 1));
    }

    public writeVarInt(value: number): void
    {
        let v = (value << 1) ^ (value >> 31);
        for (; ;) {
            let b = v & 0x07F;
            v = v >>> 7;
            if (v == 0) {
                this.writeByte(b);
                break;
            }
            else {
                b |= 0x80;
                this.writeByte(b);
            }
        }
    }

    public writeVarInt64( value : Int64 ): void
    {
        let v = new Int64(value.buffer);
        v.shiftLeft(1);
        let w = new Int64(value.buffer);
        w.shiftRight(64,true);
        v.xor(w);
        for (; ;) {
            let b = v.lsb() & 0x07F;
            v.shiftRight(7);
            if (v.is_zero()) {
                this.writeByte(b);
                break;
            }
            else {
                b |= 0x80;
                this.writeByte(b);
            }
        }
    }

    public readVarInt64(): Int64
    {
        let n: Int64 = new Int64(0,0);
        let l: int = 0;
        let h: int = 0;
        let shift: int = 0;
        for (; ;) {
            let b: char = this.readUnsignedByte();
            let v: char = b & 0x7F;
            if (shift < 28) {
                l += v << shift;
            }
            else if (shift > 28)
            {
                h += v << (shift - 28 - 4);
            }
            else
            {
                l += ((v & 0x0F) << shift);
                h += ((v & 0xF0) >>> 4);
            }
            shift += 7;
            if ((b & 0x80) == 0)
                break;
        }
        let sl = l >>> 1;
        if (h & 1) sl |= 0x80000000;
        let sh = h >>> 1;
        let mh = 0;
        let ml = 0;
        if (l & 1)
        {
            mh = 0xFFFFFFFF;
            ml = 0xFFFFFFFF;
        }
        h = sh ^ mh;
        l = sl ^ ml;
        n.setValue(h,l);
        return n;
    }
}