


const join = function join (...it) {
  let r = "";
  for (let item of it) { r += " " + item; }
  return r.slice(1);
}
const joinIter = ([...A]) => A.reduce((acc, v) => acc + " " + v, "").slice(1);


/*
defaultTestSuite.addTestCase(
  new TestCase("xxxName",
    () => xxxFN,
    xxxValue,
    false
  )
);
*/

/*
NOTES:




*/


/* SetFunctionName(); */
defaultTestSuite.addTestCase(
  new TestCase("SetIntegrityLevel(); + TestIntegrityLevel();",
    () => {
      token1 = function () {};
      ES.SetFunctionName(token1, "name1");
      token2 = function () {};
      ES.SetFunctionName(token2, "name2", "prefix2");
      token3 = function () {};
      ES.SetFunctionName(token3, Symbol("name3"));
      token4 = function () {};
      ES.SetFunctionName(token4, Symbol("name4"), "prefix4");
      return join(token1.name, token2.name, token3.name, token4.name);
    },
    "name1 prefix2 name2 [name3] prefix4 [name4]",
    false
  )
);


/* SetFunctionLength(); */
defaultTestSuite.addTestCase(
  new TestCase("SetFunctionLength(); 01",
    () => {
      token1 = function () {};
      ES.SetFunctionLength(token1, 98);
      return token1.length;
    },
    98,
    false
  ),
  new TestCase("SetFunctionLength(); 02",
    () => {
      token1 = function () {};
      Object.freeze(token1);
      ES.SetFunctionLength(token1, 98);
      return token1.length;
    },
    undefined,
    true
  )
);


/* SetIntegrityLevel(); + TestIntegrityLevel(); */
defaultTestSuite.addTestCase(
  new TestCase("SetIntegrityLevel(); + TestIntegrityLevel();",
    () => {
      token1 = {};
      ES.SetIntegrityLevel(token1, "SEALED");
      token2 = {};
      ES.SetIntegrityLevel(token2, "FROZEN");
      return join(
        ES.TestIntegrityLevel(token1, "SEALED"),
        ES.TestIntegrityLevel(token1, "FROZEN"),
        ES.TestIntegrityLevel(token2, "SEALED"),
        ES.TestIntegrityLevel(token2, "FROZEN"),
        ES.TestIntegrityLevel({}, "SEALED"),
        ES.TestIntegrityLevel({}, "FROZEN"),
      );
    },
    "true true true true false false",
    false
  )
);


/* MakeConstructor(); */
defaultTestSuite.addTestCase(
  new TestCase("MakeConstructor(); 01",
    () => {
      token1 = function () {};
      ES.MakeConstructor(token1, true, {"a": () => "a"});
      return (new token1).a();
    },
    "a",
    false
  ),
  new TestCase("MakeConstructor(); 02",
    () => ES.MakeConstructor(),
    undefined,
    true
  )
);


/* OrdinaryFunctionCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("OrdinaryFunctionCreate();",
    () => ES.OrdinaryFunctionCreate(
    Function.prototype, "", ["a", "b"], "return a < b;")(1, 2),
    true,
    false
  )
);


/* CompareArrayElements(); */
defaultTestSuite.addTestCase(
  new TestCase("CompareArrayElements();",
    () => join(
      ES.CompareArrayElements(undefined, undefined),
      ES.CompareArrayElements(undefined, 1),
      ES.CompareArrayElements(1, undefined),
      ES.CompareArrayElements(1, 2, (a, b) => a < b),
      ES.CompareArrayElements(1, 2, (a, b) => "lorem"),
      ES.CompareArrayElements(1, 2),
      ES.CompareArrayElements(2, 1),
      ES.CompareArrayElements(2, 2)
    ),
    "0 1 0 1 0 -1 1 0",
    false
  )
);


/* FindViaPredicate(); */
defaultTestSuite.addTestCase(
    new TestCase("FindViaPredicate();",
    () => {
      token1 = [1, "lorem", 3, "lorem", 5];
      return join(
        JSON.stringify(
          ES.FindViaPredicate(
            token1,
            token1.length,
            "ASCENDING",
            (x) => (x === "lorem")
          )
        ),
        JSON.stringify(
          ES.FindViaPredicate(
            token1,
            token1.length,
            "DESCENDING",
            (x) => (x === "lorem")
          )
        ),
        JSON.stringify(
          ES.FindViaPredicate(
            token1,
            token1.length,
            "DESCENDIG",
            (x) => (x === "ipsum")
          )
        )
      );
    },
    "{\"index\":3,\"value\":\"lorem\"} {\"index\":3,\"value\":\"lorem\"} {\"index\":-1}",
    false
  )
);


/* NumberToBigInt(); */
defaultTestSuite.addTestCase(
  new TestCase("NumberToBigInt(); 01", () => ES.NumberToBigInt(42), 42, false),
  new TestCase("NumberToBigInt(); 02",
    () => ES.NumberToBigInt(3.14),
    undefined,
    true
  ),
  new TestCase("NumberToBigInt(); 03",
    () => ES.NumberToBigInt("lorem"),
    undefined,
    true
  )
);



/* InstallErrorCause(); */
defaultTestSuite.addTestCase(
  new TestCase("InstallErrorCause();",
    () => {
      token1 = {};
      ES.InstallErrorCause(token1, {"cause": "error cause"});
      return token1.cause
    },
    "error cause",
    false
  )
);


/* KeyForSymbol(); */
defaultTestSuite.addTestCase(
  new TestCase("KeyForSymbol();",
    () => ES.KeyForSymbol(Symbol(42)),
    undefined,
    false
  )
);


/* SetImmutablePrototype(); */
defaultTestSuite.addTestCase(
  new TestCase("SetImmutablePrototype();",
    () => join(
      ES.SetImmutablePrototype([], Array.prototype),
      ES.SetImmutablePrototype([], Set.prototype),
    ),
    "true false",
    false
  )
);


/* TypedArrayCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayCreate();",
    () => join(
      ES.TypedArrayCreate(Int8Array.prototype) instanceof Int8Array,
      ES.TypedArrayCreate(Uint8Array.prototype) instanceof Uint8Array,
      ES.TypedArrayCreate(Uint8ClampedArray.prototype) instanceof Uint8ClampedArray,
      ES.TypedArrayCreate(Int16Array.prototype) instanceof Int16Array,
      ES.TypedArrayCreate(Uint16Array.prototype) instanceof Uint16Array,
      ES.TypedArrayCreate(Int32Array.prototype) instanceof Int32Array,
      ES.TypedArrayCreate(Uint32Array.prototype) instanceof Uint32Array,
      ES.TypedArrayCreate(BigInt64Array.prototype) instanceof BigInt64Array,
      ES.TypedArrayCreate(BigUint64Array.prototype) instanceof BigUint64Array,
      ES.TypedArrayCreate(Float16Array.prototype) instanceof Float16Array,
      ES.TypedArrayCreate(Float32Array.prototype) instanceof Float32Array,
      ES.TypedArrayCreate(Float64Array.prototype) instanceof Float64Array
    ),
    "true true true true true true true true true true true true",
    false
  )
);


/* TypedArrayByteLength(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayByteLength();",
    () => join(
      ES.TypedArrayByteLength(new Int8Array(5)),
      ES.TypedArrayByteLength(new Uint8Array(5)),
      ES.TypedArrayByteLength(new Uint8ClampedArray(5)),
      ES.TypedArrayByteLength(new Int16Array(5)),
      ES.TypedArrayByteLength(new Uint16Array(5)),
      ES.TypedArrayByteLength(new Int32Array(5)),
      ES.TypedArrayByteLength(new Uint32Array(5)),
      ES.TypedArrayByteLength(new BigInt64Array(5)),
      ES.TypedArrayByteLength(new BigUint64Array(5)),
      ES.TypedArrayByteLength(new Float16Array(5)),
      ES.TypedArrayByteLength(new Float32Array(5)),
      ES.TypedArrayByteLength(new Float64Array(5))
    ),
    "5 5 5 10 10 20 20 40 40 10 20 40",
    false
  )
);


/* UTF16EncodeCodePoint(); */
defaultTestSuite.addTestCase(
  new TestCase("UTF16EncodeCodePoint(); 01",
    () => ES.UTF16EncodeCodePoint("\u2603".codePointAt(0)),
    "\u2603",
    false
  )
);


/* UTF16SurrogatePairToCodePoint(); */
defaultTestSuite.addTestCase(
  new TestCase("UTF16SurrogatePairToCodePoint(); 01",
    () => {
      token1 = "\u006E\u0303";
      token2 = token1.codePointAt(0); /* 110 0x006E */
      token3 = token1.codePointAt(1); /* 771 0x0303 */
      return join(
        +(ES.UTF16SurrogatePairToCodePoint(token2, token3) === token1),
        +(ES.UTF16SurrogatePairToCodePoint(0x006E, 0x0303) === token1),
      );
    },
    "1 1",
    false
  ),
  new TestCase("UTF16SurrogatePairToCodePoint(); 02",
    () => ES.UTF16SurrogatePairToCodePoint(110, "vkj"),
    undefined,
    true
  ),
  new TestCase("UTF16SurrogatePairToCodePoint(); 03",
    () => ES.UTF16SurrogatePairToCodePoint("vkj", 110),
    undefined,
    true
  ),
  new TestCase("UTF16SurrogatePairToCodePoint(); 04",
    () => ES.UTF16SurrogatePairToCodePoint(110, 0xFFFFFFFFFFFFFFFFFFFFFFFFFF),
    undefined,
    true
  ),
  new TestCase("UTF16SurrogatePairToCodePoint(); 05",
    () => ES.UTF16SurrogatePairToCodePoint(0xFFFFFFFFFFFFFFFFFFFFFFFFFF, 110),
    undefined,
    true
  ),
  new TestCase("UTF16SurrogatePairToCodePoint(); 05",
    () => ES.UTF16SurrogatePairToCodePoint(110, -1),
    undefined,
    true
  ),
  new TestCase("UTF16SurrogatePairToCodePoint(); 06",
    () => ES.UTF16SurrogatePairToCodePoint(-1, 110),
    undefined,
    true
  )
);


/* StringToCodePoints(); */
defaultTestSuite.addTestCase(
  new TestCase("StringToCodePoints();",
    () => ES.StringToCodePoints("☃★♲你").toString(),
    "9731,9733,9842,194564",
    false
  )
);


/* CodePointAt(); */
defaultTestSuite.addTestCase(
  new TestCase("CodePointAt();",
    () => ES.CodePointAt("☃★♲你", 2),
    9842,
    false
  )
);


/* CodePointsToString(); */
defaultTestSuite.addTestCase(
  new TestCase("CodePointsToString();",
    () => ES.CodePointsToString([9731, 9733, 9842, 0x2f804]),
    "☃★♲你",
    false
  )
);


/* ProxyCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("ProxyCreate();",
    () => {
      token1 = { message1: "hello", message2: "everyone"};
      token2 = { get(target, prop, receiver) { return "world"; } };
      token3 = ES.ProxyCreate(token1, token2);
      return (token3.__isProxy && ES.ValidateNonRevokedProxy(token3) === undefined);
    },
    true,
    false
  )
);


/* ValidateNonRevokedProxy(); */
defaultTestSuite.addTestCase(
  new TestCase("ValidateNonRevokedProxy();",
    () => {
      token1 = { message1: "hello", message2: "everyone"};
      token2 = { get(target, prop, receiver) { return "world"; } };
      token3 = new Proxy(token1, token2);
      return (token3.__isProxy && ES.ValidateNonRevokedProxy(token3) === undefined);
    },
    true,
    false
  )
);


/* TypedArrayLength(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayLength();",
    () => {
      return join(
        +ES.IsValidIntegerIndex(Array(10), 3),
        +ES.IsValidIntegerIndex(Array(10), 0),
        +ES.IsValidIntegerIndex(Array(10), -3),
        +ES.IsValidIntegerIndex(Array(10), 3.14),
        +ES.IsValidIntegerIndex(Array(10), -3.14),
        +ES.IsValidIntegerIndex(Array(10), -0)
      );
    },
    "1 1 0 0 0 0",
    false
  )
);


/* TypedArrayLength(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayLength();",
    () => {
      return join(
        ES.TypedArrayLength(new Int16Array()),
        ES.TypedArrayLength(new Int16Array(3))
      );
    },
    "0 3",
    false
  )
);


/* StringGetOwnProperty(); */
defaultTestSuite.addTestCase(
  new TestCase("StringGetOwnProperty();",
    () => {
      return join(
        ES.StringGetOwnProperty("Arthur Dent", 2),
        ES.StringGetOwnProperty("Arthur Dent", 100),
        ES.StringGetOwnProperty("Arthur Dent", -2),
        ES.StringGetOwnProperty("Arthur Dent", 3.14)
      );
    },
    "t undefined undefined undefined",
    false
  )
);


/* StringCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("StringCreate();",
    () => {
      token1 = ES.StringCreate("Arthur dent");
      return (token1 === "Arthur dent"
        && Object.getPrototypeOf(token1) === String.prototype);
    },
    true,
    false
  )
);


/* TypedArrayGetElement(); */
/* TypedArraySetElement(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayGetElement(); + TypedArraySetElement();",
    () => {
      token1 = new Int32Array([11, 12, 13, 14, 15]);
      ES.TypedArraySetElement(token1, 1, 32);
      token2 = new BigInt64Array([21n, 22n, 23n, 24n, 25n]);
      ES.TypedArraySetElement(token2, 2, 42n);
      return join(
        +(ES.TypedArrayGetElement(token1, 1) === 32),
        +(ES.TypedArrayGetElement(token2, 2) === 42n)
      );
    },
    "1 1",
    false
  )
);
/* TypedArrayGetElement(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayGetElement();",
    () => {
      token1 = new Int32Array([11, 12, 13, 14, 15]);
      return join(
        ES.TypedArrayGetElement(token1,2),
        ES.TypedArrayGetElement(token1, 20)
      );
    },
    "13 undefined",
    false
  )
);


/* AddEntriesFromIterable(); */
defaultTestSuite.addTestCase(
  new TestCase("AddEntriesFromIterable();",
    () => {
      token1 = new Map();
      ES.AddEntriesFromIterable(token1, [["a", 1],["b", 2]], Map.prototype.set);
      return JSON.stringify([...token1]);
    },
    "[[\"a\",1],[\"b\",2]]",
    false
  )
);


/* OrdinaryObjectCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("OrdinaryObjectCreate(); 01",
    () => Object.getPrototypeOf(ES.OrdinaryObjectCreate(Array.prototype)),
    Array.prototype,
    false
  ),
  new TestCase("OrdinaryObjectCreate(); 02",
    () => {
      token1 = ES.OrdinaryObjectCreate(Array.prototype, { "testfn": x => 42 });
      return (
        Object.getPrototypeOf(token1) === Array.prototype
          && token1.testfn() === 42
      );
    },
    true,
    false
  )
);


/* GetIteratorDirect(); */
defaultTestSuite.addTestCase(
  new TestCase("GetIteratorDirect();",
    () => JSON.stringify(ES.GetIteratorDirect([1,2].values())),
    "{\"[[Iterator]]\":{},\"[[Done]]\":false}",
    false
  )
);


/* OrdinaryCreateFromConstructor(); */
defaultTestSuite.addTestCase(
  new TestCase("OrdinaryCreateFromConstructor(); 01",
    () => Object.getPrototypeOf(ES.OrdinaryCreateFromConstructor(Array)),
    Array.prototype,
    false
  ),
  new TestCase("OrdinaryCreateFromConstructor(); 02",
    () => Object.getPrototypeOf(ES.OrdinaryCreateFromConstructor (Array, Set.prototype)),
    Array.prototype,
    false
  ),
  new TestCase("OrdinaryCreateFromConstructor(); 03",
    () => Object.getPrototypeOf(ES.OrdinaryCreateFromConstructor(Object.create(null), Array.prototype)),
    Array.prototype,
    false
  ),
  new TestCase("OrdinaryCreateFromConstructor(); 04",
    () => ES.OrdinaryCreateFromConstructor(Object.create(null),Object.prototype,{"testfn": x => 42}).testfn(),
    42,
    false
  )
);


/* MakeBasicObject(); */
defaultTestSuite.addTestCase(
  new TestCase("MakeBasicObject(); 01",
    () => {
      token1 = ES.MakeBasicObject();
      return (typeof token1 === "object"
        && Object.getPrototypeOf(token1) === Object.prototype
      );
    },
    true,
    false
  ),
  new TestCase("MakeBasicObject(); 02",
    () => {
      token1 = ES.MakeBasicObject({"testfn": () => 42});
      return (typeof token1 === "object" && token1.testfn() === 42);
    },
    true,
    false
  )
);


/* FlattenIntoArray(); */
defaultTestSuite.addTestCase(
  new TestCase("FlattenIntoArray(); 01",
    () => {
      token1 = [];
      token2 = [1, 2, [3, 4, [5, 6]]];
      ES.FlattenIntoArray(token1, token2, token2.length, 0, 1, /* (v) => v*2 */);
      return JSON.stringify(token1);
    },
    "[1,2,3,4,[5,6]]",
    false
  ),
  new TestCase("FlattenIntoArray(); 02",
    () => {
      token1 = [];
      token2 = [1, 2, [3, 4, [5, 6]]];
      ES.FlattenIntoArray(token1, token2, token2.length, 0, Infinity, /* (v) => v*2 */);
      return JSON.stringify(token1);
    },
    "[1,2,3,4,5,6]",
    false
  ),
  new TestCase("FlattenIntoArray(); 03",
    () => {
      token1 = [];
      token2 = [1, 2, [3, 4, [5, 6]]];
      ES.FlattenIntoArray(token1, token2, token2.length, 0, 1, (v) => v*2);
      return JSON.stringify(token1);
    },
    "[2,4,6,8,[5,6]]",
    false
  ),
  new TestCase("FlattenIntoArray(); 03",
    () => {
      token1 = [];
      token2 = [1, 2, [3, 4, [5, 6]]];
      ES.FlattenIntoArray(token1, token2, token2.length, 0, Infinity, (v) => v*2);
      return JSON.stringify(token1);
    },
    "[2,4,6,8,10,12]",
    false
  ),

);


/* ArraySpeciesCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("ArraySpeciesCreate(); 01",
    () => {
      token1 = ES.ArraySpeciesCreate(Array(10), 15);
      return (Array.isArray(token1) && token1.length === 15);
    },
    true,
    false
  ),
  new TestCase("ArraySpeciesCreate(); 02",
    () => {
      token1 = ES.ArraySpeciesCreate({}, 15);
      return (Array.isArray(token1) && token1.length === 15);
    },
    true,
    false
  ),
  new TestCase("ArraySpeciesCreate(); 02",
    () => {
      token1 = ES.ArraySpeciesCreate(Object.create(null), 15);
      return (Array.isArray(token1) && token1.length === 15);
    },
    true,
    false
  )
);


/* Construct(); */
defaultTestSuite.addTestCase(
  new TestCase("Construct();",
    () => Array.isArray(ES.Construct(Array)),
    true,
    false
  )
);


/* ArrayCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("ArrayCreate(); 01",
    () => {
      token1 = ES.ArrayCreate(-0);
      return (Array.isArray(token1) && token1.length === 0)
    },
    true,
    false
  ),
  new TestCase("ArrayCreate(); 02",
    () => {
      token1 = ES.ArrayCreate(10);
      return (Array.isArray(token1) && token1.length === 10)
    },
    true,
    false
  ),
  new TestCase("ArrayCreate(); 03",
    () => {
      token1 = ES.ArrayCreate(Math.pow(2, 32) -1);
      return (Array.isArray(token1) && token1.length === Math.pow(2, 32) -1)
    },
    true,
    false
  ),
  new TestCase("ArrayCreate(); 04",
    () => ES.ArrayCreate(Math.pow(2, 32)),
    undefined,
    true
  ),
  new TestCase("ArrayCreate(); 05",
    () => {
      token1 = ES.ArrayCreate(10, Object.prototype);
      return (!Array.isArray(token1) && token1.length === 10)
    },
    true,
    false
  )
);


/* GetPrototypeFromConstructor(); */
defaultTestSuite.addTestCase(
  new TestCase("GetPrototypeFromConstructor(); 01",
    () => ES.GetPrototypeFromConstructor(Array),
    Array.prototype,
    false
  ),
  new TestCase("GetPrototypeFromConstructor(); 02",
    () => ES.GetPrototypeFromConstructor(Array, Object.prototype),
    Array.prototype,
    false
  ),
  new TestCase("GetPrototypeFromConstructor(); 03",
    () => ES.GetPrototypeFromConstructor(Object.create(null), Array.prototype),
    Array.prototype,
    false
  ),
  new TestCase("GetPrototypeFromConstructor(); 04",
    () => ES.GetPrototypeFromConstructor(Object.create(null)),
    undefined,
    false
  )
);


/* CreateHTML(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateHTML(); 01",
    () => join(
      ES.CreateHTML("lorem", "b", "id", "tag1"),
      ES.CreateHTML("ipsum", "b")
    ),
    "<b id=\"tag1\">lorem</b> <b>ipsum</b>",
    false
  ),
  new TestCase("CreateHTML(); 02", () => ES.CreateHTML(), undefined,true)
);


/* CreateSetIterator(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateSetIterator();",
    () => join(
      JSON.stringify([...ES.CreateSetIterator(new Set([4,5,6]), "KEY")]),
      JSON.stringify([...ES.CreateSetIterator(new Set([4,5,6]), "VALUE")]),
      JSON.stringify([...ES.CreateSetIterator(new Set([4,5,6]), "KEY+VALUE")])
    ),
    "[4,5,6] [4,5,6] [[4,4],[5,5],[6,6]]",
    false
  )
);


/* CreateMapIterator(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateMapIterator();",
    () => join(
      JSON.stringify([...ES.CreateMapIterator(new Map([[1, 2],[3, 4]]),
        "KEY")]
      ),
      JSON.stringify([...ES.CreateMapIterator(new Map([[1, 2],[3, 4]]),
        "VALUE")]
      ),
      JSON.stringify([...ES.CreateMapIterator(new Map([[1, 2],[3, 4]]),
        "KEY+VALUE")]
      )
    ),
    "[1,3] [2,4] [[1,2],[3,4]]",
    false
  )
);


/* CreateArrayIterator(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateArrayIterator();",
    () => join(
      JSON.stringify([...ES.CreateArrayIterator([4, 5, 6], "KEY")]),
      JSON.stringify([...ES.CreateArrayIterator([4, 5, 6], "VALUE")]),
      JSON.stringify([...ES.CreateArrayIterator([4, 5, 6], "KEY+VALUE")])
    ),
    "[0,1,2] [4,5,6] [[0,4],[1,5],[2,6]]",
    false
  )
);


/* TrimString(); */
defaultTestSuite.addTestCase(
  new TestCase("CompareTypedArrayElements();",
    () => join(
      +ES.CompareTypedArrayElements(4, 5),
      +ES.CompareTypedArrayElements(0, -0),
      +ES.CompareTypedArrayElements(-0, 0),
      +ES.CompareTypedArrayElements(0, 0),
      +ES.CompareTypedArrayElements(2, 3, (x, y) => x < y),
      +ES.CompareTypedArrayElements(2, 3, (x, y) => x > y)
    ),
    "-1 1 -1 0 -1 -1",
    false
  )
);


/* TrimString(); */
defaultTestSuite.addTestCase(
  new TestCase("TrimString();",
    () => (
      ES.TrimString("  lorem  ","START")
      + "#" +
      ES.TrimString("  lorem  ","END")
      + "#" +
      ES.TrimString("  lorem  ","START+END")
    ),
    "lorem  #  lorem#lorem",
    false
  )
);


/* TypedArrayElementType(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayElementType();",
    () => join(
      ES.TypedArrayElementType(new Int8Array()),
      ES.TypedArrayElementType(new Uint8Array()),
      ES.TypedArrayElementType(new Uint8ClampedArray()),
      ES.TypedArrayElementType(new Int16Array()),
      ES.TypedArrayElementType(new Uint16Array()),
      ES.TypedArrayElementType(new Int32Array()),
      ES.TypedArrayElementType(new Uint32Array()),
      ES.TypedArrayElementType(new BigInt64Array()),
      ES.TypedArrayElementType(new BigUint64Array()),
      ES.TypedArrayElementType(new Float16Array()),
      ES.TypedArrayElementType(new Float32Array()),
      ES.TypedArrayElementType(new Float64Array())
    ),
    "INT8 UINT8 UINT8CLAMPED INT16 UINT16 INT32 UINT32 BIGINT64 BIGUINT64 FLOAT16 FLOAT32 FLOAT64",
    false
  )
);


/* TypedArrayElementSize(); */
defaultTestSuite.addTestCase(
  new TestCase("TypedArrayElementSize();",
    () => join(
      ES.TypedArrayElementSize(new Int8Array()),
      ES.TypedArrayElementSize(new Uint8Array()),
      ES.TypedArrayElementSize(new Uint8ClampedArray()),
      ES.TypedArrayElementSize(new Int16Array()),
      ES.TypedArrayElementSize(new Uint16Array()),
      ES.TypedArrayElementSize(new Int32Array()),
      ES.TypedArrayElementSize(new Uint32Array()),
      ES.TypedArrayElementSize(new BigInt64Array()),
      ES.TypedArrayElementSize(new BigUint64Array()),
      ES.TypedArrayElementSize(new Float16Array()),
      ES.TypedArrayElementSize(new Float32Array()),
      ES.TypedArrayElementSize(new Float64Array())
    ),
    "1 1 1 2 2 4 4 8 8 2 4 8",
    false
  )
);


/* ArraySetLength(); */
defaultTestSuite.addTestCase(
  new TestCase("ArraySetLength(); 01",
    () => {
      token1 = [];
      return ES.ArraySetLength(token1, 10) && token1.length === 10;
    },
    true,
    false
  ),
  new TestCase("ArraySetLength(); 02",
    () => {
      token1 = [];
      return ES.ArraySetLength(token1, {"Value": 10}) && token1.length === 10;
    },
    true,
    false
  ),
  new TestCase("ArraySetLength(); 03",
    () => ES.ArraySetLength({}, 10),
    undefined,
    true
  ),
  new TestCase("ArraySetLength(); 04",
    () => ES.ArraySetLength([], Math.pow(2, 32)),
    undefined,
    true
  )
);


/* ArrayCreate(); */
defaultTestSuite.addTestCase(
  new TestCase("ArrayCreate(); 01",
    () => {
      token1 = ES.ArrayCreate(10);
      return Array.isArray(token1) && token1.length === 10;
    },
    true,
    false
  ),
  new TestCase("ArrayCreate(); 02",
    () => ES.ArrayCreate(Math.pow(2, 32)),
    undefined,
    true
  )
);


/* CreateUnmappedArgumentsObject(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateUnmappedArgumentsObject();",
    () => {
      token1 = ES.CreateUnmappedArgumentsObject("a", "b", "c");
      return join(typeof token1, token1["0"], token1["1"], token1["2"]);
    },
    "object a b c",
    false
  )
);



/* GetIteratorFromMethod(); */
defaultTestSuite.addTestCase(
  new TestCase("GetIteratorFromMethod();",
    () => join(
      (typeof
        ES.GetIteratorFromMethod([1,2,3], Array.prototype.values)
        ["[[NextMethod]]"]),
      JSON.stringify(
        ES.GetIteratorFromMethod([1,2,3], Array.prototype.values)
      )
    ),
    "function {\"[[Iterator]]\":{},\"[[Done]]\":false}",
    false
  )
);


/* CopyDataProperties(); */
defaultTestSuite.addTestCase(
  new TestCase("CopyDataProperties();",
    () => {
      /* step 1 */
      token1 = {"a": 1, "b": 2};
      token2 = {"a": 3, "b": 4, "c": 5, "d": 6};
      ES.CopyDataProperties(token1, token2, []);
      token3 = JSON.stringify(token1);
      /* step 2 */
      token1 = {"a": 1, "b": 2};
      token2 = {"a": 3, "b": 4, "c": 5, "d": 6};
      ES.CopyDataProperties(token1, token2, ["b"]);
      token3 += " " + JSON.stringify(token1);
      return token3;
    },
    "{\"a\":3,\"b\":4,\"c\":5,\"d\":6} {\"a\":3,\"b\":2,\"c\":5,\"d\":6}",
    false
  )
);


/* SpeciesConstructor(); */
defaultTestSuite.addTestCase(
  new TestCase("SpeciesConstructor(); 01",
    () => ES.SpeciesConstructor([]),
    [].constructor,
    false
  ),
  new TestCase("SpeciesConstructor(); 02",
    () => ES.SpeciesConstructor(Object.create(null), [].constructor),
    [].constructor,
    false
  ),
  new TestCase("SpeciesConstructor(); 03",
    () => ES.SpeciesConstructor(Object.create(null)),
    undefined,
    false
  )
);


/* Invoke(); */
defaultTestSuite.addTestCase(
  new TestCase("Invoke();",
    () => ES.Invoke("lorem", "includes", ["em"]),
    true,
    false
  )
);


/* CreateListFromArrayLike(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateListFromArrayLike(); 01",
    () => ES.CreateListFromArrayLike([4, 5, 6, "lorem"])["3"],
    "lorem",
    false
  ),
  new TestCase("CreateListFromArrayLike(); 02",
    () => ES.CreateListFromArrayLike([4, 5, 6, "lorem", "ipsum"],
      ["boolean", "number"]
    ),
    undefined,
    true
  )
);


/* IsPropertyKey(); */
defaultTestSuite.addTestCase(
  new TestCase("IsPropertyKey(); 01",
    () => (ES.IsPropertyKey("lorem")
      && ES.IsPropertyKey(Symbol(42))
      && !ES.IsPropertyKey(42)
    ),
    true,
    false
  )
);


/* IsIntegralNumber(); */
defaultTestSuite.addTestCase(
  new TestCase("IsIntegralNumber(); 01",
    () => (ES.IsIntegralNumber(42)
      && ES.IsIntegralNumber(-42)
      && !ES.IsIntegralNumber(3.14)
      && !ES.IsIntegralNumber(-3.14)
      && !ES.IsIntegralNumber(Infinity)
      && !ES.IsIntegralNumber(-Infinity)
      && !ES.IsIntegralNumber(NaN)
      && !ES.IsIntegralNumber("lorem")
    ),
    true,
    false
  )
);


/* RequireObjectCoercible(); */
defaultTestSuite.addTestCase(
  new TestCase("RequireObjectCoercible(); 01",
    () => ES.RequireObjectCoercible("lorem"),
    "lorem",
    false
  ),
  new TestCase("RequireObjectCoercible(); 02",
    () => ES.RequireObjectCoercible(null),
    undefined,
    true
  ),
  new TestCase("RequireObjectCoercible(); 03",
    () => ES.RequireObjectCoercible(undefined),
    undefined,
    true
  )
);

/* CanonicalizeKeyedCollectionKey(); */
defaultTestSuite.addTestCase(
  new TestCase("CanonicalizeKeyedCollectionKey();",
    () => join(
      ES.CanonicalizeKeyedCollectionKey(-0),
      ES.CanonicalizeKeyedCollectionKey(42),
    ),
    "0 42",
    false
  )
);


/* IteratorToList(); */
defaultTestSuite.addTestCase(
  new TestCase("IteratorToList();",
    () => JSON.stringify([...ES.IteratorToList([4, 5, 6].values())]),
    "[4,5,6]",
    false
  )
);


/* IteratorToList(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateListIteratorRecord();",
    () => JSON.stringify([... ES.CreateListIteratorRecord([4, 5, 6]) ]),
    "[4,5,6]",
    false
  )
);


/* CreateIteratorResultObject(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateIteratorResultObject();",
    () => JSON.stringify( ES.CreateIteratorResultObject("lorem", true)),
    "{\"value\":\"lorem\",\"done\":true}",
    false
  )
);


/* IteratorValue(); */
defaultTestSuite.addTestCase(
  new TestCase("IteratorValue();",
    () => ES.IteratorValue({value: "lorem", done: true}),
    "lorem",
    false
  )
);


/* IteratorComplete(); */
defaultTestSuite.addTestCase(
  new TestCase("IteratorComplete();",
    () => ES.IteratorComplete({value: "lorem", done: true}),
    true,
    false
  )
);


/* Call(); */
defaultTestSuite.addTestCase(
  new TestCase("Call();",
    () => ES.Call(String.prototype.includes, "lorem", ["em"]),
    true,
    false
  )
);


/* EnumerableOwnProperties(); */
defaultTestSuite.addTestCase(
  new TestCase("EnumerableOwnProperties();",
    () => {
      token1 = {"a": 1, "b": 2, "c": 3};
      return join(
        JSON.stringify( ES.EnumerableOwnProperties(token1, "KEY") ),
        JSON.stringify( ES.EnumerableOwnProperties(token1, "VALUE") ),
        JSON.stringify( ES.EnumerableOwnProperties(token1, "KEY+VALUE") ),
        JSON.stringify( ES.EnumerableOwnProperties(token1)),
      );
    },
    "[\"a\",\"b\",\"c\"] [1,2,3] [[\"a\",1],[\"b\",2],[\"c\",3]] []",
    false
  )
);


/* LengthOfArrayLike(); */
defaultTestSuite.addTestCase(
  new TestCase("LengthOfArrayLike();",
    () => join(
      ES.LengthOfArrayLike({"length": 3}),
      ES.LengthOfArrayLike({"length": 0}),
      ES.LengthOfArrayLike({"length": "3"}),
      ES.LengthOfArrayLike({"length": true}),
      ES.LengthOfArrayLike({"length": -0}),
      ES.LengthOfArrayLike({"length": Infinity}),
      ES.LengthOfArrayLike({"length": -Infinity}),
      ES.LengthOfArrayLike({"length": "Infinity"}),
      ES.LengthOfArrayLike({"length": "-Infinity"}),
      ES.LengthOfArrayLike({"length": -3}),
      ES.LengthOfArrayLike({"length": 3.14}),
      ES.LengthOfArrayLike({"length": -3.14}),
      ES.LengthOfArrayLike({"length": "fasdas"}),
      ES.LengthOfArrayLike({"length": false}),
      ES.LengthOfArrayLike({"length": "-3"}),
      ES.LengthOfArrayLike({"length": "3.14"}),
      ES.LengthOfArrayLike({"length": "-3.14"}),
      ES.LengthOfArrayLike({"length": "adsasd"}),
      ES.LengthOfArrayLike({"length": {}}),
      ES.LengthOfArrayLike({"length": []}),
      ES.LengthOfArrayLike({"length": undefined}),
      ES.LengthOfArrayLike({"length": null})
    ),
    "3 0 3 1 0 9007199254740991 0 9007199254740991 0 0 3 0 0 0 0 3 0 0 0 0 0 0",
    false
  )
);


/* CreateArrayFromList(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateArrayFromList();",
    () => JSON.stringify(ES.CreateArrayFromList(4, 5, 6)),
    "[4,5,6]",
    false
  )
);


/* CreateArrayFromList(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateArrayFromList();",
    () => JSON.stringify(ES.CreateArrayFromList(4, 5, 6)),
    "[4,5,6]",
    false
  )
);


/* HasProperty(); */
defaultTestSuite.addTestCase(
  new TestCase("HasOwnProperty();",
    () => {
      token1 = {"a": 1};
      return join(
        +ES.HasOwnProperty(token1, "a"),
        +ES.HasOwnProperty(token1, "b"),
        +ES.HasOwnProperty([], "slice")
      );
    },
    "1 0 0",
    false
  )
);


/* HasProperty(); */
defaultTestSuite.addTestCase(
  new TestCase("HasProperty();",
    () => {
      token1 = {"a": 1};
      return join(
        +ES.HasProperty(token1, "a"),
        +ES.HasProperty(token1, "b"),
        +ES.HasProperty([], "slice")
      );
    },
    "1 0 1",
    false
  )
);


/* GetMethod(); */
defaultTestSuite.addTestCase(
  new TestCase("GetMethod(); 01",
    () => {
      token1 = {"a": 1, "b": function () {}};
      return ES.GetMethod(token1, "a");
    },
    undefined,
    true
  ),
  new TestCase("GetMethod(); 02",
    () => {
      token1 = {"a": 1, "b": function () {}};
      return typeof ES.GetMethod(token1, "b");
    },
    "function",
    false
  ),
  new TestCase("GetMethod(); 03",
    () => {
      token1 = {"a": 1, "b": function () {}};
      return ES.GetMethod(token1, "c");
    },
    undefined,
    false
  )
);


/* DeletePropertyOrThrow(); */
defaultTestSuite.addTestCase(
  new TestCase("DefinePropertyOrThrow();",
    () => {
      token1 = {"a": 1, "b": 2};
      ES.DeletePropertyOrThrow(token1, "b");
      return ("a" in token1) && !("b" in token1);
    },
    true,
    false
  )
);


/* DefinePropertyOrThrow(); */
defaultTestSuite.addTestCase(
  new TestCase("DefinePropertyOrThrow();",
    () => {
      token1 = {"a": 1}
      ES.DefinePropertyOrThrow(
        token1,
        "a",
        {writable: true, enumerable: true, configurable: true, value: 2}
      );
      return token1.a;
    },
    2,
    false
  )
);


/* CreateDataPropertyOrThrow(); */
defaultTestSuite.addTestCase(
  new TestCase("CreateDataPropertyOrThrow();",
    () => {
      token1 = {"a": 1}
      ES.CreateDataPropertyOrThrow(token1, "a", 2);
      return token1.a;
    },
    2,
    false
  )
);


/* CreateNonEnumerableDataPropertyOrThrow(); */

defaultTestSuite.addTestCase(
  new TestCase("CreateNonEnumerableDataPropertyOrThrow();",
    () => {
      token1 = {"a": 1}
      ES.CreateNonEnumerableDataPropertyOrThrow( token1, "a", 2 );
      return token1.a;
    },
    2,
    false
  )
);


/* Set(); */
defaultTestSuite.addTestCase(
  new TestCase("Set();",
    () => {
      token1 = {"a": 1}
      ES.Set(token1, "a", 2);
      return token1.a;
    },
    2,
    false
  )
);


/* GetV(); */
defaultTestSuite.addTestCase(
  new TestCase("GetV();",
    () => ES.GetV({"a": 1}, "a") === 1 && ES.GetV({"a": 1}, "b") === undefined,
    true,
    false
  )
);


/* Get(); */
defaultTestSuite.addTestCase(
  new TestCase("Get();",
    () => ES.Get({"a": 1}, "a") === 1 && ES.Get({"a": 1}, "b") === undefined,
    true,
    false
  )
);


/* IsLooselyEqual(); */
defaultTestSuite.addTestCase(
  new TestCase("IsLooselyEqual();",
    () => ES.IsLooselyEqual("42", 42) === ("42" == 42),
    true,
    false
  )
);


/* IsStrictlyEqual(); */
defaultTestSuite.addTestCase(
  new TestCase("IsStrictlyEqual();",
    () => ES.IsStrictlyEqual("42", 42) === ("42" === 42)
      && ES.IsStrictlyEqual(42, 42) === (42 === 42),
    true,
    false
  )
);


/* IsLessThan(); */
defaultTestSuite.addTestCase(
  new TestCase("IsLessThan();",
    () => join(
      +ES.IsLessThan(1, 2),
      +ES.IsLessThan(1, 2, true),
      +ES.IsLessThan(2, 1, false),
      +ES.IsLessThan(1, 2, false),
      +ES.IsLessThan(2, 1),
      +ES.IsLessThan(2, 1, true)
    ),
    "1 1 1 0 0 0",
    false
  )
);


/* SameValueNonNumber(); */
defaultTestSuite.addTestCase(
  new TestCase("SameValueNonNumber();",
    () => join(
      +ES.SameValueNonNumber(25, 25),
      +ES.SameValueNonNumber("foo", "foo"),
      +ES.SameValueNonNumber("foo", "bar"),
      +ES.SameValueNonNumber(null, null),
      +ES.SameValueNonNumber(undefined, undefined),
      +ES.SameValueNonNumber(window, window),
      +ES.SameValueNonNumber([], []),
      +ES.SameValueNonNumber(token1, token1),
      +ES.SameValueNonNumber(token1, {"a": 1}),
      +ES.SameValueNonNumber(0, -0),
      +ES.SameValueNonNumber(+0, -0),
      +ES.SameValueNonNumber(-0, -0),
      (!!window.BigInt ? +ES.SameValueNonNumber(BigInt(0), BigInt(-0)) : 1),
      +ES.SameValueNonNumber(NaN, 0/0),
      +ES.SameValueNonNumber(NaN, Number.NaN),
      +ES.SameValueNonNumber(+Infinity, Infinity),
      +ES.SameValueNonNumber(Infinity, Infinity),
      +ES.SameValueNonNumber(-Infinity, -Infinity),
      +ES.SameValueNonNumber(+Infinity, -Infinity)
    ),
    "1 1 0 1 1 1 0 1 0 1 1 1 1 0 0 1 1 1 0",
    false
  )
);


/* SameValueZero(); */
defaultTestSuite.addTestCase(
  new TestCase("SameValueZero();",
    () => join(
      +ES.SameValueZero(25, 25),
      +ES.SameValueZero("foo", "foo"),
      +ES.SameValueZero("foo", "bar"),
      +ES.SameValueZero(null, null),
      +ES.SameValueZero(undefined, undefined),
      +ES.SameValueZero(window, window),
      +ES.SameValueZero([], []),
      +ES.SameValueZero(token1, token1),
      +ES.SameValueZero(token1, {"a": 1}),
      +ES.SameValueZero(0, -0),
      +ES.SameValueZero(+0, -0),
      +ES.SameValueZero(-0, -0),
      (!!window.BigInt ? +ES.SameValueZero(BigInt(0), BigInt(-0)) : 1),
      +ES.SameValueZero(NaN, 0/0),
      +ES.SameValueZero(NaN, Number.NaN),
      +ES.SameValueZero(+Infinity, Infinity),
      +ES.SameValueZero(Infinity, Infinity),
      +ES.SameValueZero(-Infinity, -Infinity),
      +ES.SameValueZero(+Infinity, -Infinity)
    ),
    "1 1 0 1 1 1 0 1 0 1 1 1 1 1 1 1 1 1 0",
    false
  )
);


/* SameValue(); */
defaultTestSuite.addTestCase(
  new TestCase("SameValue();",
    () => join(
      +ES.SameValue(25, 25),
      +ES.SameValue("foo", "foo"),
      +ES.SameValue("foo", "bar"),
      +ES.SameValue(null, null),
      +ES.SameValue(undefined, undefined),
      +ES.SameValue(window, window),
      +ES.SameValue([], []),
      +ES.SameValue(token1, token1),
      +ES.SameValue(token1, {"a": 1}),
      +ES.SameValue(0, -0),
      +ES.SameValue(+0, -0),
      +ES.SameValue(-0,-0),
      (!!window.BigInt ? +ES.SameValue(BigInt(0), BigInt(-0)) : 1),
      +ES.SameValue(NaN, 0/0),
      +ES.SameValue(NaN, Number.NaN),
      +ES.SameValue(+Infinity, Infinity),
      +ES.SameValue(Infinity, Infinity),
      +ES.SameValue(-Infinity, -Infinity),
      +ES.SameValue(+Infinity, -Infinity)
    ),
    "1 1 0 1 1 1 0 1 0 0 0 1 1 1 1 1 1 1 0",
    false
  )
);


/* SameType(); */
defaultTestSuite.addTestCase(
  new TestCase("SameType();",
    () => join (
      +ES.SameType(null, null),
      +ES.SameType(undefined, undefined),
      +ES.SameType(null, undefined),
      +ES.SameType(42, "42")
    ),
    "1 1 0 0",
    false
  )
);


/* ToIndex(); begin */
defaultTestSuite.addTestCase(
  new TestCase("ToIndex(); 01",
    () => join(
      ES.ToIndex(3),
      ES.ToIndex(0),
      ES.ToIndex("3"),
      ES.ToIndex(true),
      ES.ToIndex(-0),
      ES.ToIndex(3.14),
      ES.ToIndex("lorem"),
      ES.ToIndex(false),
      ES.ToIndex("3.14"),
      ES.ToIndex("adsasd"),
      ES.ToIndex({}),
      ES.ToIndex([]),
      ES.ToIndex(undefined),
      ES.ToIndex(null)
    ),
    "3 0 3 1 0 3 0 0 3 0 0 0 0 0",
    false
  ),
  new TestCase("ToIndex(); 02",
    () => ES.ToIndex(Infinity),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 03",
    () => ES.ToIndex(-Infinity),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 04",
    () => ES.ToIndex("Infinity"),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 05",
    () => ES.ToIndex("-Infinity"),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 06",
    () => ES.ToIndex(-3),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 07",
    () => ES.ToIndex(-3.14),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 08",
    () => ES.ToIndex("-3"),
    undefined,
    true
  ),
  new TestCase("ToIndex(); 09",
    () => ES.ToIndex("-3.14"),
    undefined,
    true
  )
);
/* ToIndex(); end */


/* CanonicalNumericIndexString(); */
defaultTestSuite.addTestCase(
  new TestCase("CanonicalNumericIndexString();",
    () => join(
      ES.CanonicalNumericIndexString(-0),
      ES.CanonicalNumericIndexString("1998"),
      ES.CanonicalNumericIndexString("lorem")
    ),
    "0 1998 undefined",
    false
  )
);

/* ToLength(); */
defaultTestSuite.addTestCase(
  new TestCase("ToLength();",
    () => join(
      ES.ToLength(3),
      ES.ToLength(0),
      ES.ToLength("3"),
      ES.ToLength(true),
      ES.ToLength(-0),
      ES.ToLength(Infinity),
      ES.ToLength(-Infinity),
      ES.ToLength("Infinity"),
      ES.ToLength("-Infinity"),
      ES.ToLength(-3),
      ES.ToLength(3.14),
      ES.ToLength(-3.14),
      ES.ToLength("fasdas"),
      ES.ToLength(false),
      ES.ToLength("-3"),
      ES.ToLength("3.14"),
      ES.ToLength("-3.14"),
      ES.ToLength("adsasd"),
      ES.ToLength({}),
      ES.ToLength([]),
      ES.ToLength(undefined),
      ES.ToLength(null)
    ),
    "3 0 3 1 0 9007199254740991 0 9007199254740991 0 0 3 0 0 0 0 3 0 0 0 0 0 0",
    false
  )
);


/* ToPropertyKey(); */
defaultTestSuite.addTestCase(
  new TestCase("ToPropertyKey();",
    () => join(
      typeof ES.ToPropertyKey(Symbol(42)),
      typeof ES.ToPropertyKey(42)
    ),
    "symbol string",
    false
  )
);


/* ToObject(); begin */
defaultTestSuite.addTestCase(
  new TestCase("ToObject(); 01",
    () => ES.ToObject(null),
    undefined,
    true
  ),
  new TestCase("ToObject(); 02", () => ES.ToObject(undefined), undefined, true),
  new TestCase("ToObject(); 03",
    () => {
      token1 = {"a": 1};
      token2 = function () {};
      return ES.ToObject(token1)
        && token2 === ES.ToObject(token2)
        && typeof ES.ToObject(true) === "object"
        && typeof ES.ToObject(42) === "object"
        && typeof ES.ToObject("42") === "object"
        && typeof ES.ToObject(Symbol(42)) === "object"
        && typeof ES.ToObject(52n) === "object"
    },
    true,
    false
  )
);
/* ToObject(); end */


/* ToString(); */
defaultTestSuite.addTestCase(
  new TestCase("ToString();", () => ES.ToString([4, 5, 6]), "4,5,6", false)
);


/* ToBigUint64(); */
defaultTestSuite.addTestCase(
  new TestCase("ToBigUint64();",
    () => join(
      ES.ToBigUint64(-129),
      ES.ToBigUint64(-42),
      ES.ToBigUint64("-3"),
      ES.ToBigUint64(0),
      ES.ToBigUint64("3"),
      ES.ToBigUint64(42),
      ES.ToBigUint64(128),
      ES.ToBigInt64(true),
      ES.ToBigUint64(false),
      ES.ToBigInt64(Math.pow(2,64) +1)
    ),
    "0 0 0 0 3 42 128 1 0 18446744073709551616",
    false
  )
);


/* ToBigInt(); */
defaultTestSuite.addTestCase(
  new TestCase("ToBigInt64();",
    () => join(
      ES.ToBigInt64(-129),
      ES.ToBigInt64(-42),
      ES.ToBigInt64("-3"),
      ES.ToBigInt64(0),
      ES.ToBigInt64("3"),
      ES.ToBigInt64(42),
      ES.ToBigInt64(128),
      ES.ToBigInt64(true),
      ES.ToBigInt64(false),
      ES.ToBigInt64(Math.pow(2,64) -1)
    ),
    "-129 -42 -3 0 3 42 128 1 0 18446744073709551616",
    false
  )
);


/* ToBigInt(); */
defaultTestSuite.addTestCase(
  new TestCase("ToBigInt64();",
    () => join(
      ES.ToBigInt64(-129),
      ES.ToBigInt64(-42),
      ES.ToBigInt64("-3"),
      ES.ToBigInt64(0),
      ES.ToBigInt64("3"),
      ES.ToBigInt64(42),
      ES.ToBigInt64(128),
      ES.ToBigInt64(true),
      ES.ToBigInt64(false)
    ),
    "-129 -42 -3 0 3 42 128 1 0",
    false
  )
);


/* StringToBigInt(); */
defaultTestSuite.addTestCase(
  new TestCase("StringToBigInt();",
    () => join(
      ES.StringToBigInt("-129"),
      ES.StringToBigInt("-42"),
      ES.StringToBigInt("-3"),
      ES.StringToBigInt("0"),
      ES.StringToBigInt("3"),
      ES.StringToBigInt("42"),
      ES.StringToBigInt("128")
    ),
    "-129 -42 -3 0 3 42 128",
    false
  )
);


/* ToBigInt(); */
defaultTestSuite.addTestCase(
  new TestCase("ToBigInt();",
    () => join(
      ES.ToBigInt(-129),
      ES.ToBigInt(-42),
      ES.ToBigInt("-3"),
      ES.ToBigInt(0),
      ES.ToBigInt("3"),
      ES.ToBigInt(42),
      ES.ToBigInt(128),
      ES.ToBigInt(true),
      ES.ToBigInt(false)
    ),
    "-129 -42 -3 0 3 42 128 1 0",
    false
  )
);


/* ToInt8(); */
defaultTestSuite.addTestCase(
  new TestCase("ToUint8Clamp();",
    () => join(
      ES.ToUint8Clamp(-128 - 1),
      ES.ToUint8Clamp(-42),
      ES.ToUint8Clamp(-3.14),
      ES.ToUint8Clamp(0),
      ES.ToUint8Clamp(3.14),
      ES.ToUint8Clamp(42),
      ES.ToUint8Clamp(255 + 1),
    ),
    "0 0 0 0 3 42 255",
    false
  )
);


/* ToInt8(); */
defaultTestSuite.addTestCase(
  new TestCase("ToUint8();",
    () => join(
      ES.ToUint8(-128 - 1),
      ES.ToUint8(-42),
      ES.ToUint8(-3.14),
      ES.ToUint8(0),
      ES.ToUint8(3.14),
      ES.ToUint8(42),
      ES.ToUint8(255 + 1),
    ),
    "0 0 0 0 3 42 255",
    false
  )
);


/* ToUint16(); */
defaultTestSuite.addTestCase(
  new TestCase("ToUint16();",
    () => join(
      ES.ToUint16(-2147483648 - 1),
      ES.ToUint16(-42),
      ES.ToUint16(-3.14),
      ES.ToUint16(0),
      ES.ToUint16(3.14),
      ES.ToUint16(42),
      ES.ToUint16(65535 + 1),
    ),
    "0 0 0 0 3 42 65535",
    false
  )
);


/* ToInt16(); */
defaultTestSuite.addTestCase(
  new TestCase("ToInt16();",
    () => join(
      ES.ToInt16(-32768 - 1),
      ES.ToInt16(-42),
      ES.ToInt16(-3.14),
      ES.ToInt16(0),
      ES.ToInt16(3.14),
      ES.ToInt16(42),
      ES.ToInt16(32767 + 1),
    ),
    "-32768 -42 -3 0 3 42 32767",
    false
  )
);


/* ToUint32(); */
defaultTestSuite.addTestCase(
  new TestCase("ToUint32();",
    () => join(
      ES.ToUint32(-2147483648 - 1),
      ES.ToUint32(-42),
      ES.ToUint32(-3.14),
      ES.ToUint32(0),
      ES.ToUint32(3.14),
      ES.ToUint32(42),
      ES.ToUint32(4294967295 + 1),
    ),
    "0 0 0 0 3 42 4294967295",
    false
  )
);


/* ToInt32(); */
defaultTestSuite.addTestCase(
  new TestCase("ToInt32();",
    () => join(
      ES.ToInt32(-2147483648 - 1),
      ES.ToInt32(-42),
      ES.ToInt32(-3.14),
      ES.ToInt32(0),
      ES.ToInt32(3.14),
      ES.ToInt32(42),
      ES.ToInt32(2147483647 + 1),
    ),
    "-2147483648 -42 -3 0 3 42 2147483647",
    false
  )
);


/* ToIntegerOrInfinity(); */
defaultTestSuite.addTestCase(
  new TestCase("ToIntegerOrInfinity();",
    () => join(
      ES.ToIntegerOrInfinity(NaN),
      ES.ToIntegerOrInfinity(-0),
      ES.ToIntegerOrInfinity(0),
      ES.ToIntegerOrInfinity(Infinity),
      ES.ToIntegerOrInfinity(-Infinity),
      ES.ToIntegerOrInfinity("3.14"),
      ES.ToIntegerOrInfinity("98"),
      ES.ToIntegerOrInfinity("-3.14"),
      ES.ToIntegerOrInfinity("-98"),
      ES.ToIntegerOrInfinity("lorem")
    ),
    "0 0 0 Infinity -Infinity 3 98 -3 -98 0",
    false
  )
);


/* StringToNumber(); */
defaultTestSuite.addTestCase(
  new TestCase("StringToNumber();",
    () => join(
      ES.StringToNumber("42"),
      ES.StringToNumber(Object("3.14")),
      ES.StringToNumber("lorem")
    ),
    "42 3.14 NaN",
    false
  )
);


/* ToNumber(); */
defaultTestSuite.addTestCase(
  new TestCase("ToNumber(); 1",
    () => join(
      ES.ToNumber(42),
      ES.ToNumber(Object("3.14")),
      ES.ToNumber("lorem")
    ),
    "42 3.14 NaN",
    false
  )
);
defaultTestSuite.addTestCase(
  new TestCase("ToNumber(); 2", () => ES.ToNumber(44n), undefined, true)
);
defaultTestSuite.addTestCase(
  new TestCase("ToNumber(); 3",
    () => ES.ToNumber(Symbol(42)),
    undefined,
    true
  )
);


/* ToNumeric(); */
defaultTestSuite.addTestCase(
  new TestCase("ToNumeric(); 1",
    () => join(
      ES.ToNumeric(42),
      ES.ToNumeric(Object("3.14")),
      ES.ToNumeric("lorem")
    ),
    "42 3.14 NaN",
    false
  )
);
defaultTestSuite.addTestCase(
  new TestCase("ToNumeric(); 2", () => ES.ToNumeric(44n), 44n, false)
);
defaultTestSuite.addTestCase(
  new TestCase("ToNumeric(); 3",
    () => ES.ToNumeric(Symbol(42)),
    undefined,
    true
  )
);


/* ToBoolean(); */
defaultTestSuite.addTestCase(
  new TestCase("ToBoolean();",
    () => join(+ES.ToBoolean(42), +ES.ToBoolean("")),
    "1 0",
    false
  )
);


/* OrdinaryToPrimitive(); */
defaultTestSuite.addTestCase(
  new TestCase(
    "OrdinaryToPrimitive();",
    () => ES.OrdinaryToPrimitive({toString: () => "empty object"}, "default"),
    "empty object",
    false
  )
);


/* ToPrimitive(); */
defaultTestSuite.addTestCase(
  new TestCase(
    "ToPrimitive();",
    () => join(ES.ToPrimitive({toString: () => "empty object"}),
      ES.ToPrimitive(42), ES.ToPrimitive([1,2])),
    "empty object 42 1,2",
    false
  )
);


/* Type(); */
defaultTestSuite.addTestCase(
  new TestCase(
    "Type();",
    () => join(ES.Type(null), ES.Type(42), ES.Type({})),
    "null number object",
    false
  )
);


/* StringLastIndexOf(); */
defaultTestSuite.addTestCase(
  new TestCase(
    "StringLastIndexOf",
    () => join(
      ES.StringLastIndexOf("abcdefgde", "de"),
      ES.StringLastIndexOf("abcde", "ad")
    ),
    "7 -1",
    false
  )
);


/* StringIndexOf(); */
defaultTestSuite.addTestCase(
  new TestCase(
    "StringIndexOf",
    () => join(ES.StringIndexOf("abcde", "cd"), ES.StringIndexOf("abcde", "ad")),
    "2 -1",
    false
  )
);


/* IsExtensible(); */
token1 = {};
defaultTestSuite.addTestCase(
  new TestCase("IsExtensible();",
    () => {
      token1 = {};
      token2 = +ES.IsExtensible(token1);
      Object.preventExtensions(token1);
      token2 += " " + +ES.IsExtensible(token1);
      return token2;
    },
    "1 0",
    false
  )
);


/* IsCallable(); */
defaultTestSuite.addTestCase(
  new TestCase("IsCallable();",
    () =>join(+ES.IsCallable(Array), +ES.IsCallable({})),
    "1 0",
    false
  )
);


/* IsConstructor(); */
defaultTestSuite.addTestCase(
  new TestCase("IsConstructor();",
    () => join(+ES.IsConstructor(Array), +ES.IsConstructor(Array.from)),
    "1 0",
    false
  )
);


/* IsRegExp(); */
defaultTestSuite.addTestCase(
  new TestCase("IsRegExp();",
    () => +ES.IsRegExp(/^\[object (.+)\]$/g) + " " + +ES.IsRegExp(" "),
    "1 0",
    false
  )
);


/* IsStringWellFormedUnicode(); */
defaultTestSuite.addTestCase(
  new TestCase("IsStringWellFormedUnicode();",
    () => ES.IsStringWellFormedUnicode("lorem"),
    true,
    false
  )
);


/* IsArray(); */
defaultTestSuite.addTestCase(
  new TestCase("IsArray();",
    () => join(+ES.IsArray([]), +ES.IsArray({})),
    "1 0",
    false
  )
);


/*
defaultTestSuite.addTestCase(
  new TestCase(
    "xxxName",
    () => xxxFN,
    xxxValue,
    false
  )
);
*/
