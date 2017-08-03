/// <reference path="../../network/Protobuf.ts"/>
/// <reference path="MessageDef.ts"/>
@protobuf
class ProtobufTestObjectBase
{
	@field(1)
	i : int;
	@field(2)
	s: string;
	@field(3,"array","long")
	ai64: Array<Int64>;

	public constructor()
	{
		this.i = 0;
		this.s = "default";
		this.ai64 = new Array<Int64>();
	}
};

@protobuf
class ProtobufTestObject extends ProtobufTestObjectBase
{
	@field(101,"map","long","string")
	mis: Map<Int64,string>;

	public constructor()
	{
		super();
		this.mis = new Map<Int64,string>();
	}

	public prepare()
	{
		this.i = 1;
		this.s = "string2";
		this.ai64.push(new Int64(3));
		this.ai64.push(new Int64(4));
		this.mis.set(new Int64(5),"string5");
		this.mis.set(new Int64(6),"string6");
	}

	public valid() : boolean
	{
		if (this.i != 1)
			return false;
		if (this.s != "string2")
			return false;
		if (this.ai64.length != 2)
			return false;
		let i64 = new Int64(3);
		if (!this.ai64[0].equals(i64))
			return false;
		i64.setValue(4);
		if (!this.ai64[1].equals(i64))
			return false;
		if (this.mis.size != 2)
			return false;
		let res = 0;
		this.mis.forEach((v, k) =>
		{
			i64.setValue(5);
			if (v == "string5" && k.equals(i64))
				res |= 1;
			i64.setValue(6);
			if (v == "string6" && k.equals(i64))
				res |= 2;
		});
		return res == 3;
	}
};

@protobuf
class RequestProtobufTestData extends RequestMessage
{
	public get CLSID(): short
	{
		return 20000;
	}

	// 基本类型
	@field(1)
	b: boolean;
	@field(2,"char")
	c: char;
	@field(3,"short")
	s: short;
	@field(4)
	i: int;
	@field(5)
	i64: Int64;
	@field(6,"float")
	f: float;
	@field(7,"double")
	lf: double;
	@field(8)
	str: string;
	// Array
	@field(9,"array","bool")
	ab: Array<boolean>;
	@field(10,"array","char")
	ac: Array<char>;
	@field(11,"array","short")
	as: Array<short>;
	@field(12,"array","int")
	ai: Array<int>;
	@field(13,"array","long")
	ai64: Array<Int64>;
	@field(14,"array","string")
	ais: Array<string>;
	@field(15,"array","float")
	af: Array<float>;
	@field(16,"array","double")
	alf: Array<double>;
	// Set
	@field(19,"set","int")
	si: Set<int>;
	@field(20,"set","long")
	si64: Set<Int64>;
	@field(21,"set","string")
	ss: Set<string>;
	// Map
	@field(26,"map","string","int")
	msi: Map<string, int>;
	@field(27,"map","string","long")
	msi64: Map<string, Int64>;
	@field(28,"map","string","string")
	mss: Map<string, string>;
	// Object
	@field(33)
	obj: ProtobufTestObject;
	// Array of Object
	@field(34,"array",ProtobufTestObject)
	ao: Array<ProtobufTestObject>;
	// Buffer
	@field(40)
	buffer: NetBuffer;
	// Combine of containers
	@field(50,"array","array","int")
	aai: Array<Array<int>>;
	@field(51,"map",'string',"map","string","int")
	msmsi: Map<string,Map<string,int>>;

	public constructor()
	{
		super();
		this.b = false;
		this.c = 0;
		this.s = 0;
		this.i = 0;
		this.i64 = new Int64(0);
		this.f = 0;
		this.lf = 0;
		this.str = "default";
		this.ab = new Array<boolean>();
		this.ac = new Array<char>();
		this.as = new Array<short>();
		this.ai = new Array<int>();
		this.ai64 = new Array<Int64>();
		this.ais = new Array<string>();
		this.af = new Array<float>();
		this.alf = new Array<double>();
		this.si = new Set<int>();
		this.si64 = new Set<Int64>();
		this.ss = new Set<string>();
		this.msi = new Map<string,int>();
		this.msi64 = new Map<string,Int64>();
		this.mss = new Map<string,string>();
		this.obj = new ProtobufTestObject();
		this.ao = new Array<ProtobufTestObject>();
		this.buffer = new NetBuffer();
		this.aai = new Array<Array<int>>();
		this.msmsi = new Map<string,Map<string,int>>();
	}

	public prepare()
	{
		this.b = true;
		this.c = 2;
		this.s = 3;
		this.i = 4;
		this.i64.setValue(0x42400000,0x00452a0e);
		this.f = 6.7;
		this.lf = 8.9;
		this.str = "test_message";
		this.ab.push(true);
		this.ab.push(false);
		this.ab.push(true);
		this.ac.push(1);
		this.ac.push(2);
		this.ac.push(3);
		this.as.push(1);
		this.as.push(2);
		this.as.push(3);
		this.ai.push(10);
		this.ai.push(11);
		this.ai.push(12);
		this.ai64.push(new Int64(13));
		this.ai64.push(new Int64(14));
		this.ai64.push(new Int64(15));
		this.ais.push("string1");
		this.ais.push("string2");
		this.ais.push("string3");
		this.af.push(1.0);
		this.af.push(2.0);
		this.af.push(3.0);
		this.alf.push(1.1);
		this.alf.push(2.2);
		this.alf.push(3.3);
		this.si.add(16);
		this.si.add(17);
		this.si.add(18);
		this.si64.add(new Int64(19));
		this.si64.add(new Int64(20));
		this.si64.add(new Int64(21));
		this.ss.add("string1");
		this.ss.add("string2");
		this.ss.add("string3");
		this.msi.set("string1",1);
		this.msi.set("string2",2);
		this.msi.set("string3",3);
		this.msi64.set("string1",new Int64(1));
		this.msi64.set("string2",new Int64(2));
		this.msi64.set("string3",new Int64(3));
		this.mss.set("string1","1");
		this.mss.set("string2","2");
		this.mss.set("string3","3");
		this.obj.prepare();
		this.ao.push(this.obj);
		this.ao.push(this.obj);
		this.buffer.writeInt(1024);
		this.buffer.writeVarInt(1024);
		this.aai.push(new Array<int>());
		this.aai.push(new Array<int>());
		this.aai[0].push(10);
		this.aai[0].push(11);
		this.aai[1].push(20);
		this.aai[1].push(21);
		this.msmsi.set("key1",new Map<string,int>());
		this.msmsi.set("key2",new Map<string,int>());
		this.msmsi.get("key1").set("key11",11);
		this.msmsi.get("key1").set("key12",12);
		this.msmsi.get("key2").set("key21",21);
		this.msmsi.get("key2").set("key22",22);
	}
}

@protobuf
class ReplyProtobufTestData extends ReplyMessage
{
	public get CLSID(): short
	{
		return 20001;
	}

	// 基本类型
	@field(1)
	b: boolean;
	@field(2,"char")
	c: char;
	@field(3,"short")
	s: short;
	@field(4)
	i: int;
	@field(5)
	i64: Int64;
	@field(6,"float")
	f: float;
	@field(7,"double")
	lf: double;
	@field(8)
	str: string;
	// Array
	@field(9,"array","bool")
	ab: Array<boolean>;
	@field(10,"array","char")
	ac: Array<char>;
	@field(11,"array","short")
	as: Array<short>;
	@field(12,"array","int")
	ai: Array<int>;
	@field(13,"array","long")
	ai64: Array<Int64>;
	@field(14,"array","string")
	ais: Array<string>;
	@field(15,"array","float")
	af: Array<float>;
	@field(16,"array","double")
	alf: Array<double>;
	// Set
	@field(19,"set","int")
	si: Set<int>;
	@field(20,"set","long")
	si64: Set<Int64>;
	@field(21,"set","string")
	ss: Set<string>;
	// Map
	@field(26,"map","string","int")
	msi: Map<string, int>;
	@field(27,"map","string","long")
	msi64: Map<string, Int64>;
	@field(28,"map","string","string")
	mss: Map<string, string>;
	// Object
	@field(33)
	obj: ProtobufTestObject;
	// Array of Object
	@field(34,"array",ProtobufTestObject)
	ao: Array<ProtobufTestObject>;
	// Buffer
	@field(40)
	buffer: NetBuffer;
	// Combine of containers
	@field(50,"array","array","int")
	aai: Array<Array<int>>;
	@field(51,"map",'string',"map","string","int")
	msmsi: Map<string,Map<string,int>>;

	public constructor()
	{
		super();
		this.b = false;
		this.c = 0;
		this.s = 0;
		this.i = 0;
		this.i64 = new Int64(0);
		this.f = 0;
		this.lf = 0;
		this.str = "default";
		this.ab = new Array<boolean>();
		this.ac = new Array<char>();
		this.as = new Array<short>();
		this.ai = new Array<int>();
		this.ai64 = new Array<Int64>();
		this.ais = new Array<string>();
		this.af = new Array<float>();
		this.alf = new Array<double>();
		this.si = new Set<int>();
		this.si64 = new Set<Int64>();
		this.ss = new Set<string>();
		this.msi = new Map<string,int>();
		this.msi64 = new Map<string,Int64>();
		this.mss = new Map<string,string>();
		this.obj = new ProtobufTestObject();
		this.ao = new Array<ProtobufTestObject>();
		this.buffer = new NetBuffer();
		this.aai = new Array<Array<int>>();
		this.msmsi = new Map<string,Map<string,int>>();
	}

	public valid() : boolean
	{
		if (this.b != true)
			return false;
		if (this.c != 2)
			return false;
		if (this.s != 3)
			return false;
		if (this.i != 4)
			return false;
		let i64 = new Int64(0);
		i64.setValue(0x42400000,0x00452a0e);
		if (!this.i64.equals(i64))
			return false;
		if (Math.abs(this.f - 6.7) > 0.01)
			return false;
		if (Math.abs(this.lf - 8.9) > 0.01)
			return false;
		if (this.str != "test_message")
			return false;
		if (this.ab.length != 3)
			return false;
		if (this.ab[0] != true)
			return false;
		if (this.ab[1] != false)
			return false;
		if (this.ab[2] != true)
			return false;
		if (this.ac.length != 3)
			return false;
		if (this.ac[0] != 1)
			return false;
		if (this.ac[1] != 2)
			return false;
		if (this.ac[2] != 3)
			return false;
		if (this.as.length != 3)
			return false;
		if (this.as[0] != 1)
			return false;
		if (this.as[1] != 2)
			return false;
		if (this.as[2] != 3)
			return false;
		if (this.ai.length != 3)
			return false;
		if (this.ai[0] != 10)
			return false;
		if (this.ai[1] != 11)
			return false;
		if (this.ai[2] != 12)
			return false;
		if (this.ai64.length != 3)
			return false;
		i64.setValue(13);
		if (!this.ai64[0].equals(i64))
			return false;
		i64.setValue(14);
		if (!this.ai64[1].equals(i64))
			return false;
		i64.setValue(15);
		if (!this.ai64[2].equals(i64))
			return false;
		if (this.ais.length != 3)
			return false;
		if (this.ais[0] != "string1")
			return false;
		if (this.ais[1] != "string2")
			return false;
		if (this.ais[2] != "string3")
			return false;
		if (this.af.length != 3)
			return false;
		if (this.af[0] != 1.0)
			return false;
		if (this.af[1] != 2.0)
			return false;
		if (this.af[2] != 3.0)
			return false;
		if (this.alf.length != 3)
			return false;
		if (this.alf[0] != 1.1)
			return false;
		if (this.alf[1] != 2.2)
			return false;
		if (this.alf[2] != 3.3)
			return false;
		if (this.si.size != 3)
			return false;
		if (!this.si.has(16))
			return false;
		if (!this.si.has(17))
			return false;
		if (!this.si.has(18))
			return false;
		if (this.si64.size != 3)
			return false;
		let res = 0;
		this.si64.forEach((v) =>
		{
			i64.setValue(19);
			if (v.equals(i64))
				res |= 1;
			i64.setValue(20);
			if (v.equals(i64))
				res |= 2;
			i64.setValue(21);
			if (v.equals(i64))
				res |= 4;
		});
		if (res != 7)
			return false;
		if (this.ss.size != 3)
			return false;
		if (!this.ss.has("string1"))
			return false;
		if (!this.ss.has("string2"))
			return false;
		if (!this.ss.has("string3"))
			return false;
		if (this.msi.size != 3)
			return false;
		if (this.msi.get("string1") != 1)
			return false;
		if (this.msi.get("string2") != 2)
			return false;
		if (this.msi.get("string3") != 3)
			return false;
		if (this.msi64.size != 3)
			return false;
		i64.setValue(1);
		if (!this.msi64.get("string1").equals(i64))
			return false;
		i64.setValue(2);
		if (!this.msi64.get("string2").equals(i64))
			return false;
		i64.setValue(3);
		if (!this.msi64.get("string3").equals(i64))
			return false;
		if (this.mss.size != 3)
			return false;
		if (this.mss.get("string1") != "1")
			return false;
		if (this.mss.get("string2") != "2")
			return false;
		if (this.mss.get("string3") != "3")
			return false;
		if (!this.obj.valid())
			return false;
		if (this.ao.length != 2)
			return false;
		if (!this.ao[0].valid())
			return false;
		if (!this.ao[1].valid())
			return false;
		if (this.buffer.length != 6)
			return false;
		if (this.buffer.readInt() != 1024)
			return false;
		if (this.buffer.readVarInt() != 1024)
			return false;
		if (this.buffer.bytesAvailable != 0)
			return false;
		if (this.aai.length != 2)
			return false;
		if (this.aai[0].length != 2)
			return false;
		if (this.aai[1].length != 2)
			return false;
		if (this.aai[0][0] != 10)
			return false;
		if (this.aai[0][1] != 11)
			return false;
		if (this.aai[1][0] != 20)
			return false;
		if (this.aai[1][1] != 21)
			return false;
		if (this.msmsi.size != 2)
			return false;
		if (!this.msmsi.get("key1"))
			return false;
		if (!this.msmsi.get("key2"))
			return false;
		if (this.msmsi.get("key1").get("key11") != 11)
			return false;
		if (this.msmsi.get("key1").get("key12") != 12)
			return false;
		if (this.msmsi.get("key2").get("key21") != 21)
			return false;
		if (this.msmsi.get("key2").get("key22") != 22)
			return false;
		return true;
	}
}
