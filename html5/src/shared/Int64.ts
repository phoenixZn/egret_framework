//     Int64.js
//
//     Copyright (c) 2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/**
 * Support for handling 64-bit int numbers in Javascript (node.js)
 *
 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
 * range of values that can be represented with integer precision to:
 *
 * 2^^53 <= N <= 2^53
 *
 * Int64 objects wrap a node Buffer that holds the 8-bytes of int64 data.  These
 * objects operate directly on the buffer which means that if they are created
 * using an existing buffer then setting the value will modify the Buffer, and
 * vice-versa.
 *
 * Internal Representation
 *
 * The internal buffer format is Big Endian.  I.e. the most-significant byte is
 * at buffer[0], the least-significant at buffer[7].  For the purposes of
 * converting to/from JS native numbers, the value is assumed to be a signed
 * integer stored in 2's complement form.
 *
 * For details about IEEE-754 see:
 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
 */

//
// Int64
//
class Int64
{
    // Useful masks and values for bit twiddling
    public static MASK31:number =  0x7fffffff;
    public static VAL31:number = 0x80000000;
    public static MASK32:number =  0xffffffff;
    public static VAL32:number = 0x100000000;
    public static MAX_INT:number = Math.pow(2, 53);
    public static MIN_INT:number = -Math.pow(2, 53);
    private static _HEX:Array<any> = new Array<any>();

    public buffer:Array<number>;
    public offset:number;

    /**
     * Constructor accepts any of the following argument types:
     *
     * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
     * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
     * new Int64(string)             - Hex string (throws if n is outside int64 range)
     * new Int64(number)             - Number (throws if n is outside int64 range)
     * new Int64(hi, lo)             - Raw bits as two 32-bit values
     */
    public constructor(a1:any, a2?:any)
    {
        this._buildHex();
        if (a1 instanceof Array)
        {
            this.buffer = Array.apply([], a1);
            this.offset = a2 || 0;
        }
        else if (Object.prototype.toString.call(a1) == '[object Uint8Array]')
        {
            // Under Browserify, Buffers can extend Uint8Arrays rather than an
            // instance of Buffer. We could assume the passed in Uint8Array is actually
            // a buffer but that won't handle the case where a raw Uint8Array is passed
            // in. We construct a new Buffer just in case.
            this.buffer = Array.apply([], a1);
            this.offset = a2 || 0;
        }
        else
        {
            this.buffer = this.buffer || [];
            this.offset = 0;
            this.setValue.apply(this, arguments);
        }
    }

    // Map for converting hex octets to strings
    private _buildHex():void
    {
        //Int64._HEX = [];
        for (var i = 0; i < 256; i++) {
          Int64._HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
        }
    }

  /**
   * Do in-place 2's compliment.  See
   * http://en.wikipedia.org/wiki/Two's_complement
   */
  private _2scomp()
  {
    var b = this.buffer, o = this.offset, carry = 1;
    for (var i = o + 7; i >= o; i--) {
      var v = (b[i] ^ 0xff) + carry;
      b[i] = v & 0xff;
      carry = v >> 8;
    }
  }

  /**
   * Set the value. Takes any of the following arguments:
   *
   * setValue(string) - A hexidecimal string
   * setValue(number) - Number (throws if n is outside int64 range)
   * setValue(hi, lo) - Raw bits as two 32-bit values
   */
  public setValue(hi:any, lo?:any):void {
    var negate:boolean = false;
    if (arguments.length == 1) {
      if (typeof(hi) == 'number') {
        // Simplify bitfield retrieval by using abs() value.  We restore sign
        // later
        negate = hi < 0;
        hi = Math.abs(hi);
        lo = hi % Int64.VAL32;
        hi = hi / Int64.VAL32;
        if (hi > Int64.VAL32) throw new RangeError(hi  + ' is outside Int64 range');
        hi = hi | 0;
      } else if (typeof(hi) == 'string') {
        hi = (hi + '').replace(/^0x/, '');
        lo = hi.substr(-8);
        hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
        hi = parseInt(hi, 16);
        lo = parseInt(lo, 16);
      } else {
        throw new Error(hi + ' must be a Number or String');
      }
    }

    // Technically we should throw if hi or lo is outside int32 range here, but
    // it's not worth the effort. Anything past the 32'nd bit is ignored.

    // Copy bytes to buffer
    var b = this.buffer, o = this.offset;
    for (var i = 7; i >= 0; i--) {
      b[o+i] = lo & 0xff;
      lo = i == 4 ? hi : lo >>> 8;
    }

    // Restore sign of passed argument
    if (negate) this._2scomp();
  }

  /**
   * Convert to a native JS number.
   *
   * WARNING: Do not expect this value to be accurate to integer precision for
   * large (positive or negative) numbers!
   *
   * @param allowImprecise If true, no check is performed to verify the
   * returned value is accurate to integer precision.  If false, imprecise
   * numbers (very large positive or negative numbers) will be forced to +/-
   * Infinity.
   */
  public toNumber(allowImprecise:boolean=false):number {
    var b = this.buffer, o = this.offset;

    // Running sum of octets, doing a 2's complement
    var negate = b[o] & 0x80, x = 0, carry = 1;
    for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
      var v = b[o+i];

      // 2's complement for negative numbers
      if (negate) {
        v = (v ^ 0xff) + carry;
        carry = v >> 8;
        v = v & 0xff;
      }

      x += v * m;
    }

    // Return Infinity if we've lost integer precision
    if (!allowImprecise && x >= Int64.MAX_INT) {
      return negate ? -Infinity : Infinity;
    }

    return negate ? -x : x;
  }

  /**
   * Convert to a JS Number. Returns +/-Infinity for values that can't be
   * represented to integer precision.
   */
  public valueOf():number {
    return this.toNumber(false);
  }

  /**
   * Return string value
   *
   * @param radix Just like Number#toString()'s radix
   */
  public toString(radix:number=10):string {
    return this.valueOf().toString(radix);
  }

  /**
   * Return a string showing the buffer octets, with MSB on the left.
   *
   * @param sep separator string. default is '' (empty string)
   */
  public toOctetString(sep:string=''):string {
    var out = new Array(8);
    var b = this.buffer, o = this.offset;
    for (var i = 0; i < 8; i++) {
      out[i] = Int64._HEX[b[o+i]];
    }
    return out.join(sep || '');
  }

  /**
   * Returns the int64's 8 bytes in a buffer.
   *
   * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
   *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
   */
  public toBuffer(rawBuffer:boolean=false):Array<number> {
    if (rawBuffer && this.offset === 0) return this.buffer;

    var out = Array.call([], this.buffer);
    return out;
  }

  /**
   * Returns a number indicating whether this comes before or after or is the
   * same as the other in sort order.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  public compare(other:Int64):number {

    // If sign bits differ ...
    if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
      return other.buffer[other.offset] - this.buffer[this.offset];
    }

    // otherwise, compare bytes lexicographically
    for (var i = 0; i < 8; i++) {
      if (this.buffer[this.offset+i] !== other.buffer[other.offset+i]) {
        return this.buffer[this.offset+i] - other.buffer[other.offset+i];
      }
    }
    return 0;
  }

  /**
   * Returns a boolean indicating if this integer is equal to other.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  public equals(other:Int64):boolean {
    return this.compare(other) === 0;
  }

  /**
   * Pretty output in console.log
   */
  public inspect():string {
    return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
  }

  public shiftLeft(bits: number): void
  {
    if (bits < 0) {
      this.shiftRight(bits);
      return;
    }

    let move_bytes = Math.floor(bits / 8);
    let move_bits = bits - move_bytes * 8;
    for (let i = 0; i < 8; i++) {
      let b = 0;
      let pos = i + move_bytes;
      if (pos < 8)
        b = (this.buffer[pos] << move_bits) & 0xFF;
      pos = move_bits > 0 ? pos + 1 : 8;
      if (pos < 8)
        b |= (this.buffer[pos] >>> (8 - move_bits)) & 0xFF;
      this.buffer[i] = b;
    }
  }

  public shiftRight(bits: number, signed: boolean = false): void
  {
    if (bits < 0) {
      this.shiftLeft(bits);
      return;
    }

    if (signed)
      signed = (this.buffer[0] & 0x80) > 0;

    let move_bytes = Math.floor(bits / 8);
    let move_bits = bits - move_bytes * 8;
    let signed_bits = (0xFF << (8 -move_bits)) & 0xFF;
    for (let i = 7; i >= 0; i--) {
      let b = 0;
      let pos = i - move_bytes;
      if (pos >= 0) {
          b = (this.buffer[pos] >>> move_bits) & 0xFF;
      }
      if (pos < 0 && signed)
        b = 0xFF;
      pos = move_bits > 0 ? pos - 1 : -1;
      if (pos >= 0)
        b |= (this.buffer[pos] << (8 - move_bits)) & 0xFF;
      if (pos <= 0 && signed)
        b |= signed_bits;
      this.buffer[i] = b;
    }
  }

  public xor(i64: Int64): void
  {
    for (let i = 0; i < 7; i++)
      this.buffer[i] ^= i64.buffer[i];
  }

  public is_zero(): boolean
  {
    for (let i = 0; i < 8; i++) {
      if (this.buffer[i] != 0)
        return false;
    }
    return true;
  }

  public msb(): number
  {
    return this.buffer[0];
  }

  public lsb(): number
  {
    return this.buffer[7];
  }
}