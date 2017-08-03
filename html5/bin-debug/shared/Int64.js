//     Int64.js
//
//     Copyright (c) 2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var Int64 = (function () {
    /**
     * Constructor accepts any of the following argument types:
     *
     * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
     * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
     * new Int64(string)             - Hex string (throws if n is outside int64 range)
     * new Int64(number)             - Number (throws if n is outside int64 range)
     * new Int64(hi, lo)             - Raw bits as two 32-bit values
     */
    function Int64(a1, a2) {
        this._buildHex();
        if (a1 instanceof Array) {
            this.buffer = Array.apply([], a1);
            this.offset = a2 || 0;
        }
        else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {
            // Under Browserify, Buffers can extend Uint8Arrays rather than an
            // instance of Buffer. We could assume the passed in Uint8Array is actually
            // a buffer but that won't handle the case where a raw Uint8Array is passed
            // in. We construct a new Buffer just in case.
            this.buffer = Array.apply([], a1);
            this.offset = a2 || 0;
        }
        else {
            this.buffer = this.buffer || [];
            this.offset = 0;
            this.setValue.apply(this, arguments);
        }
    }
    // Map for converting hex octets to strings
    Int64.prototype._buildHex = function () {
        //Int64._HEX = [];
        for (var i = 0; i < 256; i++) {
            Int64._HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
        }
    };
    /**
     * Do in-place 2's compliment.  See
     * http://en.wikipedia.org/wiki/Two's_complement
     */
    Int64.prototype._2scomp = function () {
        var b = this.buffer, o = this.offset, carry = 1;
        for (var i = o + 7; i >= o; i--) {
            var v = (b[i] ^ 0xff) + carry;
            b[i] = v & 0xff;
            carry = v >> 8;
        }
    };
    /**
     * Set the value. Takes any of the following arguments:
     *
     * setValue(string) - A hexidecimal string
     * setValue(number) - Number (throws if n is outside int64 range)
     * setValue(hi, lo) - Raw bits as two 32-bit values
     */
    Int64.prototype.setValue = function (hi, lo) {
        var negate = false;
        if (arguments.length == 1) {
            if (typeof (hi) == 'number') {
                // Simplify bitfield retrieval by using abs() value.  We restore sign
                // later
                negate = hi < 0;
                hi = Math.abs(hi);
                lo = hi % Int64.VAL32;
                hi = hi / Int64.VAL32;
                if (hi > Int64.VAL32)
                    throw new RangeError(hi + ' is outside Int64 range');
                hi = hi | 0;
            }
            else if (typeof (hi) == 'string') {
                hi = (hi + '').replace(/^0x/, '');
                lo = hi.substr(-8);
                hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
                hi = parseInt(hi, 16);
                lo = parseInt(lo, 16);
            }
            else {
                throw new Error(hi + ' must be a Number or String');
            }
        }
        // Technically we should throw if hi or lo is outside int32 range here, but
        // it's not worth the effort. Anything past the 32'nd bit is ignored.
        // Copy bytes to buffer
        var b = this.buffer, o = this.offset;
        for (var i = 7; i >= 0; i--) {
            b[o + i] = lo & 0xff;
            lo = i == 4 ? hi : lo >>> 8;
        }
        // Restore sign of passed argument
        if (negate)
            this._2scomp();
    };
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
    Int64.prototype.toNumber = function (allowImprecise) {
        if (allowImprecise === void 0) { allowImprecise = false; }
        var b = this.buffer, o = this.offset;
        // Running sum of octets, doing a 2's complement
        var negate = b[o] & 0x80, x = 0, carry = 1;
        for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
            var v = b[o + i];
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
    };
    /**
     * Convert to a JS Number. Returns +/-Infinity for values that can't be
     * represented to integer precision.
     */
    Int64.prototype.valueOf = function () {
        return this.toNumber(false);
    };
    /**
     * Return string value
     *
     * @param radix Just like Number#toString()'s radix
     */
    Int64.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        return this.valueOf().toString(radix);
    };
    /**
     * Return a string showing the buffer octets, with MSB on the left.
     *
     * @param sep separator string. default is '' (empty string)
     */
    Int64.prototype.toOctetString = function (sep) {
        if (sep === void 0) { sep = ''; }
        var out = new Array(8);
        var b = this.buffer, o = this.offset;
        for (var i = 0; i < 8; i++) {
            out[i] = Int64._HEX[b[o + i]];
        }
        return out.join(sep || '');
    };
    /**
     * Returns the int64's 8 bytes in a buffer.
     *
     * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
     *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
     */
    Int64.prototype.toBuffer = function (rawBuffer) {
        if (rawBuffer === void 0) { rawBuffer = false; }
        if (rawBuffer && this.offset === 0)
            return this.buffer;
        var out = Array.call([], this.buffer);
        return out;
    };
    /**
     * Returns a number indicating whether this comes before or after or is the
     * same as the other in sort order.
     *
     * @param {Int64} other  Other Int64 to compare.
     */
    Int64.prototype.compare = function (other) {
        // If sign bits differ ...
        if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
            return other.buffer[other.offset] - this.buffer[this.offset];
        }
        // otherwise, compare bytes lexicographically
        for (var i = 0; i < 8; i++) {
            if (this.buffer[this.offset + i] !== other.buffer[other.offset + i]) {
                return this.buffer[this.offset + i] - other.buffer[other.offset + i];
            }
        }
        return 0;
    };
    /**
     * Returns a boolean indicating if this integer is equal to other.
     *
     * @param {Int64} other  Other Int64 to compare.
     */
    Int64.prototype.equals = function (other) {
        return this.compare(other) === 0;
    };
    /**
     * Pretty output in console.log
     */
    Int64.prototype.inspect = function () {
        return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
    };
    Int64.prototype.shiftLeft = function (bits) {
        if (bits < 0) {
            this.shiftRight(bits);
            return;
        }
        var move_bytes = Math.floor(bits / 8);
        var move_bits = bits - move_bytes * 8;
        for (var i = 0; i < 8; i++) {
            var b = 0;
            var pos = i + move_bytes;
            if (pos < 8)
                b = (this.buffer[pos] << move_bits) & 0xFF;
            pos = move_bits > 0 ? pos + 1 : 8;
            if (pos < 8)
                b |= (this.buffer[pos] >>> (8 - move_bits)) & 0xFF;
            this.buffer[i] = b;
        }
    };
    Int64.prototype.shiftRight = function (bits, signed) {
        if (signed === void 0) { signed = false; }
        if (bits < 0) {
            this.shiftLeft(bits);
            return;
        }
        if (signed)
            signed = (this.buffer[0] & 0x80) > 0;
        var move_bytes = Math.floor(bits / 8);
        var move_bits = bits - move_bytes * 8;
        var signed_bits = (0xFF << (8 - move_bits)) & 0xFF;
        for (var i = 7; i >= 0; i--) {
            var b = 0;
            var pos = i - move_bytes;
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
    };
    Int64.prototype.xor = function (i64) {
        for (var i = 0; i < 7; i++)
            this.buffer[i] ^= i64.buffer[i];
    };
    Int64.prototype.is_zero = function () {
        for (var i = 0; i < 8; i++) {
            if (this.buffer[i] != 0)
                return false;
        }
        return true;
    };
    Int64.prototype.msb = function () {
        return this.buffer[0];
    };
    Int64.prototype.lsb = function () {
        return this.buffer[7];
    };
    return Int64;
}());
// Useful masks and values for bit twiddling
Int64.MASK31 = 0x7fffffff;
Int64.VAL31 = 0x80000000;
Int64.MASK32 = 0xffffffff;
Int64.VAL32 = 0x100000000;
Int64.MAX_INT = Math.pow(2, 53);
Int64.MIN_INT = -Math.pow(2, 53);
Int64._HEX = new Array();
__reflect(Int64.prototype, "Int64");
//# sourceMappingURL=Int64.js.map