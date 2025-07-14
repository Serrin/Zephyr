/**
 * @name Zephyr
 * @version 1.0.1 dev
 * @see https://github.com/Serrin/
 * @license MIT https://opensource.org/licenses/MIT
 */
(function(window, document){
"use strict";


/** Polyfills **/


/* Number.MIN_SAFE_INTEGER; */
if(!("MIN_SAFE_INTEGER" in Number)) {
  Number.MIN_SAFE_INTEGER = -9007199254740991;
}


/* Number.MAX_SAFE_INTEGER; */
if(!("MAX_SAFE_INTEGER" in Number)) {
  Number.MAX_SAFE_INTEGER = 9007199254740991;
}


/* Number.isInteger(); */
Number.isInteger = Number.isInteger || function (v) {
  return typeof v === "number" && isFinite(v) && Math.floor(v) === v;
};


/* Object.is(); SameValue */
if (!Object.is) { Object.is =
  ((x, y) => ((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y)));
}


/* Object.hasOwn(); */
Object.hasOwn=Object.hasOwn||((O,P)=>Object.prototype.hasOwnProperty.call(O,P));


/** API **/


/*
https://262.ecma-international.org/#sec-completion-ao
5.2.3.1 Completion ( completionRecord )
https://tc39.es/ecma262/multipage/notational-conventions.html#sec-runtime-semantics
5.2.3.1 Completion ( completionRecord )
completionRecord:
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completion-record-specification-type
*/
function Completion (completionRecord) {
  if (completionRecord != null && typeof completionRecord === "object") {
    let crKeys = Object.keys(completionRecord);
    if (crKeys.length === 3
      && crKeys.includes("[[Type]]")
      && crKeys.includes("[[Value]]")
      && crKeys.includes("[[Target]]")) {
      return completionRecord;
    }
  }
  throw new TypeError(
    "Completion(); TypeError: completionRecord is not a Completion Record"
  );
}


/*
https://262.ecma-international.org/#sec-ecmascript-language-types
6.1 ECMAScript Language Types
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values
6.1 ECMAScript Language Types
"Type(x)" is used as shorthand for "the type of x".
*/
const Type = (O) => ((O === null) ? "null" : (typeof O));


/*
https://262.ecma-international.org/#sec-stringindexof
6.1.4.1 StringIndexOf ( string, searchValue, fromIndex )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringindexof
6.1.4.1 StringIndexOf ( string, searchValue, fromIndex )
*/
const StringIndexOf=(string, searchValue, fromIndex) =>
  string.indexOf(searchValue, fromIndex);


/*
https://262.ecma-international.org/#sec-ecmascript-language-types-string-type
NONE
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringlastindexof
6.1.4.2 StringLastIndexOf ( string, searchValue, fromIndex )
*/
const StringLastIndexOf = (string, searchValue, fromIndex) =>
  string.lastIndexOf(searchValue, fromIndex);


/*
https://262.ecma-international.org/#sec-normalcompletion
6.2.4.1 NormalCompletion ( value )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-normalcompletion
6.2.4.1 NormalCompletion ( value )
*/
const NormalCompletion = (v) =>
  ({"[[Type]]": "NORMAL", "[[Value]]": v, "[[Target]]": undefined});


/*
https://262.ecma-international.org/#sec-throwcompletion
6.2.4.2 ThrowCompletion ( value )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-throwcompletion
6.2.4.2 ThrowCompletion ( value )
*/
const ThrowCompletion = (v) =>
  ({"[[Type]]": "THROW", "[[Value]]": v, "[[Target]]": undefined});


/*
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completion-record-specification-type
NONE
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-returncompletion
6.2.4.3 ReturnCompletion ( value )
*/
const ReturnCompletion = (v) =>
  ({"[[Type]]": "RETURN", "[[Value]]": v, "[[Target]]": undefined});

/*
https://262.ecma-international.org/#sec-updateempty
6.2.4.3 UpdateEmpty ( completionRecord, value )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-updateempty
6.2.4.4 UpdateEmpty ( completionRecord, value )
*/
function UpdateEmpty (completionRecord, value) {
  function Completion (completionRecord) {
    if (completionRecord != null && typeof completionRecord === "object") {
      let crKeys = Object.keys(completionRecord);
      if (crKeys.length === 3
        && crKeys.includes("[[Type]]")
        && crKeys.includes("[[Value]]")
        && crKeys.includes("[[Target]]")) {
          return completionRecord;
      }
    }
    throw new TypeError(
      "Completion(); TypeError: completionRecord is not a Completion Record"
    );
  }
  Completion(completionRecord);
  if (completionRecord["[[Type]]"] === "RETURN"
    || completionRecord["[[Type]]"] === "THROW") {
    if (completionRecord["[[Value]]"] !== undefined) {
      return completionRecord;
    }
    return {
      "[[Type]]": completionRecord["[[Type]]"],
      "[[Value]]": value,
      "[[Target]]": completionRecord["[[Target]]"]
    };
  }
}


/*
https://262.ecma-international.org/#sec-isaccessordescriptor
6.2.6.1 IsAccessorDescriptor ( Desc )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isaccessordescriptor
6.2.6.1 IsAccessorDescriptor ( Desc )
TODO
*/


/*
https://262.ecma-international.org/#sec-isdatadescriptor
6.2.6.2 IsDataDescriptor ( Desc )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isdatadescriptor
6.2.6.2 IsDataDescriptor ( Desc )
TODO
*/


/*
https://262.ecma-international.org/#sec-isgenericdescriptor
6.2.6.3 IsGenericDescriptor ( Desc )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isdatadescriptor
6.2.6.3 IsGenericDescriptor ( Desc )
TODO
*/


/*
https://262.ecma-international.org/#sec-frompropertydescriptor
6.2.6.4 FromPropertyDescriptor ( Desc )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-frompropertydescriptor
6.2.6.4 FromPropertyDescriptor ( Desc )
TODO
*/


/*
https://262.ecma-international.org/#sec-topropertydescriptor
6.2.6.5 ToPropertyDescriptor ( Obj )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-topropertydescriptor
6.2.6.5 ToPropertyDescriptor ( Obj )
TODO
*/


/*
https://262.ecma-international.org/#sec-completepropertydescriptor
6.2.6.6 CompletePropertyDescriptor ( Desc )
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completepropertydescriptor
6.2.6.6 CompletePropertyDescriptor ( Desc )
TODO
*/


/*
https://262.ecma-international.org/#sec-toprimitive
7.1.1 ToPrimitive ( input [ , preferredType ] )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive
7.1.1 ToPrimitive ( input [ , preferredType ] )
*/
function ToPrimitive (O, hint = "default") {
  const _apply = Function.prototype.call.bind(Function.prototype.apply);
  const _isPrimitive = (v) =>
    ((typeof v !== "object" && typeof v !== "function") || v === null);
  if (_isPrimitive(O)) { return O; }
  let method = O[Symbol.toPrimitive];
  if (method != null) {
    let r = _apply(method, O, []);
    if (_isPrimitive(r)) { return r; }
  } else {
    for (let item of
      (hint === "string" ? ["toString", "valueOf"] : ["valueOf", "toString"])
    ) {
      method = O[item];
      if (typeof method === "function") {
        let r = _apply(method, O, []);
        if (_isPrimitive(r)) { return r; }
      }
    }
  }
  throw new TypeError(
    "ToPrimitive(); error: Cannot convert object to primitive value"
  );
}


/*
https://262.ecma-international.org/#sec-ordinarytoprimitive
7.1.1.1 OrdinaryToPrimitive ( O, hint )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ordinarytoprimitive
7.1.1.1 OrdinaryToPrimitive ( O, hint )
*/
function OrdinaryToPrimitive (O, hint) {
  if (typeof hint === "string") {
    var methodNames = ["toString", "valueOf"];
  } else {
    var methodNames = ["valueOf", "toString"];
  }
  for (let element of methodNames) {
    let method = O[element];
    if (typeof method === "function") {
      let result = Function.prototype.call.call(method, O);
      if (typeof result !== "object") { return result; }
    }
  }
  throw new TypeError();
}


/*
https://262.ecma-international.org/#sec-toboolean
7.1.2 ToBoolean ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toboolean
7.1.2 ToBoolean ( argument )
*/
const ToBoolean = (v) => Boolean(v);


/*
https://262.ecma-international.org/#sec-tonumeric
7.1.3 ToNumeric ( value )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumeric
7.1.3 ToNumeric ( value )/
*/
function ToNumeric (v) {
  var type = ((v === null) ? "null" : (typeof v));
  if (type === "bigint" || type === "number") { return v; }
  if (type === "symbol") { throw new TypeError("Symbol: " + v); }
  return +v;
}


/*
https://262.ecma-international.org/#sec-tonumber
7.1.4 ToNumber ( argument )
https://tc39.es/ecma262/#sec-tonumber
7.1.4 ToNumber ( argument )
*/
/* not "Number(argument);", because argument cannot be BigInt -> throw error */
const ToNumber = (v) => +v;


/*
https://262.ecma-international.org/#sec-tonumber-applied-to-the-string-type
7.1.4.1.1 StringToNumber ( str )
https://tc39.es/ecma262/#sec-stringtonumber
7.1.4.1.1 StringToNumber ( str )
*/
const StringToNumber = (v) => +v;


/*
https://262.ecma-international.org/#sec-tointegerorinfinity
7.1.5 ToIntegerOrInfinity ( argument )
https://tc39.es/ecma262/#sec-tointegerorinfinity
7.1.5 ToIntegerOrInfinity ( argument )
*/
const ToIntegerOrInfinity = (v) =>
  ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;


/*
https://262.ecma-international.org/#sec-toint32
7.1.6 ToInt32 ( argument )
https://tc39.es/ecma262/#sec-toint32
7.1.6 ToInt32 ( argument )
*/
const ToInt32 = (v) =>
  ((v = Math.min(Math.max(-2147483648, Math.trunc(+v)), 2147483647)) === v)
    ? v : 0;


/*
https://262.ecma-international.org/#sec-touint32
7.1.7 ToUint32 ( argument )
https://tc39.es/ecma262/#sec-touint32
7.1.7 ToUint32 ( argument )
*/
const ToUint32 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 4294967295)) === v) ? v : 0;


/*
https://262.ecma-international.org/#sec-toint16
7.1.8 ToInt16 ( argument )
https://tc39.es/ecma262/#sec-toint16
7.1.8 ToInt16 ( argument )
*/
const ToInt16 = (v) =>
  ((v = Math.min(Math.max(-32768, Math.trunc(+v)), 32767)) === v) ? v : 0;


/*
https://262.ecma-international.org/#sec-touint16
7.1.9 ToUint16 ( argument )
https://tc39.es/ecma262/#sec-touint16
7.1.9 ToUint16 ( argument )
*/
const ToUint16 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 65535)) === v) ? v : 0;


/*
https://262.ecma-international.org/#sec-toint8
7.1.10 ToInt8 ( argument )
https://tc39.es/ecma262/#sec-toint8
7.1.10 ToInt8 ( argument )
*/
const ToInt8 = (v) =>
  ((v = Math.min(Math.max(-128, Math.trunc(+v)), 127)) === v) ? v : 0;


/*
https://262.ecma-international.org/#sec-touint8
7.1.11 ToUint8 ( argument )
https://tc39.es/ecma262/#sec-touint8
7.1.11 ToUint8 ( argument )
*/
const ToUint8 = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 255)) === v) ? v : 0;


/*
https://262.ecma-international.org/#sec-touint8clamp
7.1.12 ToUint8Clamp ( argument )
https://tc39.es/ecma262/#sec-touint8clamp
7.1.12 ToUint8Clamp ( argument )
*/
const ToUint8Clamp = (v) =>
  ((v = Math.min(Math.max(0, Math.trunc(+v)), 255)) === v) ? v : 0;


/*
https://262.ecma-international.org/#sec-tobigint
7.1.13 ToBigInt ( argument )
https://tc39.es/ecma262/#sec-tobigint
7.1.13 ToBigInt ( argument )
*/
const ToBigInt = (v) => BigInt(v);


/*
https://262.ecma-international.org/#sec-stringtobigint
7.1.14 StringToBigInt ( str )
https://tc39.es/ecma262/#sec-stringtobigint
7.1.14 StringToBigInt ( str )
*/
const StringToBigInt = (v) => BigInt(v);


/*
https://262.ecma-international.org/#sec-tobigint64
7.1.15 ToBigInt64 ( argument )
https://tc39.es/ecma262/#sec-tobigint64
7.1.15 ToBigInt64 ( argument )
*/
const ToBigInt64 = (v) => BigInt(v);


/*
https://262.ecma-international.org/#sec-tobiguint64
7.1.16 ToBigUint64 ( argument )
https://tc39.es/ecma262/#sec-tobiguint64
7.1.16 ToBigUint64 ( argument )
*/
const ToBigUint64 = (v) => BigInt(typeof v === "bigint"
  ? (v > Math.pow(2, 64) - 1 ? Math.pow(2, 64) - 1 : v < 0 ? 0 : v)
  : ((v=Math.min(Math.max(0, Math.trunc(Number(v))),
    Math.pow(2,64) -1)) === v) ? v : 0
);


/*
https://262.ecma-international.org/#sec-tostring
7.1.17 ToString ( argument )
https://tc39.es/ecma262/#sec-tostring
7.1.17 ToString ( argument )
*/
const ToString = (v) => String(v);


/*
https://262.ecma-international.org/#sec-toobject
7.1.18 ToObject ( argument )
https://tc39.es/ecma262/#sec-toobject
7.1.18 ToObject ( argument )
*/
function ToObject (O) {
  if (O == null) { throw new TypeError("ToObject(); error: " + O); }
  if (["object", "function"].includes(typeof O)) { return O; }
  return Object(O);
}


/*
https://262.ecma-international.org/#sec-topropertykey
7.1.19 ToPropertyKey ( argument )
https://tc39.es/ecma262/#sec-topropertykey
7.1.19 ToPropertyKey ( argument )
*/
const ToPropertyKey = (v) => (typeof v === "symbol"? v : String(v));


/*
https://262.ecma-international.org/#sec-tolength
7.1.20 ToLength ( argument )
https://tc39.es/ecma262/#sec-tolength
7.1.20 ToLength ( argument )
*/
function ToLength (v) {
  v = ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;
  return Math.min(Math.max(v, 0), Math.pow(2, 53) - 1);
}


/*
https://262.ecma-international.org/#sec-canonicalnumericindexstring
7.1.21 CanonicalNumericIndexString ( argument )
https://tc39.es/ecma262/#sec-canonicalnumericindexstring
7.1.21 CanonicalNumericIndexString ( argument )
*/
function CanonicalNumericIndexString (v) {
  if (typeof v === "number" && 1/v === -Infinity) { return -0; }
  let n = +v;
  if (String(n) === v) { return n; }
}


/*
https://262.ecma-international.org/#sec-requireobjectcoercible
7.2.1 RequireObjectCoercible ( argument )
https://tc39.es/ecma262/
NONE
*/
function RequireObjectCoercible (v) {
  if (v == null) { throw new TypeError(
    Object.prototype.toString.call(v) + " is not coercible to Object.");
  }
  return v;
}


/*
https://262.ecma-international.org/#sec-toindex
7.1.22 ToIndex ( value )
https://tc39.es/ecma262/#sec-toindex
7.1.22 ToIndex ( value )
*/
function ToIndex (v) {
  v = ((v = Math.trunc(+v)) !== v || v === 0) ? 0 : v;
  if (v < 0 || v > (Math.pow(2, 53) - 1)) {
    throw new RangeError("ToIndex(); RangeError: " + v);
  }
  return v;
}


/*
https://262.ecma-international.org/#sec-isarray
7.2.2 IsArray ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isarray
7.2.2 IsArray ( argument )
*/
const IsArray = Array.isArray ||
  function (O) { return Object.prototype.toString.call(O)==="[object Array]"; };


/*
https://262.ecma-international.org/#sec-iscallable
7.2.3 IsCallable ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iscallable
7.2.3 IsCallable ( argument )
*/
/* const IsCallable = (argument) => (typeof O === "function"); */
const IsCallable = (v) =>
  ((v != null && ["object", "function"].includes(typeof v))
    ? (typeof v.call === "function") : false);


/*
https://262.ecma-international.org/#sec-isconstructor
7.2.4 IsConstructor ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isconstructor
7.2.4 IsConstructor ( argument )
*/
const IsConstructor = (v) => (
  typeof v === "function" && typeof v.prototype === "object"
);


/*
https://262.ecma-international.org/#sec-isextensible-o
7.2.5 IsExtensible ( O )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isextensible-o
7.2.5 IsExtensible
*/
const IsExtensible = (O) => Object.isExtensible(O);


/*
https://262.ecma-international.org/#sec-isintegralnumber
7.2.6 IsIntegralNumber ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html
NONE
*/
const IsIntegralNumber = Number.isInteger || function (v) {
  return typeof v === "number" && isFinite(v) && Math.floor(v) === v;
};


/*
https://262.ecma-international.org/#sec-isregexp
7.2.8 IsRegExp ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isregexp
7.2.6 IsRegExp ( argument )
*/
const IsRegExp = (v) => (v instanceof RegExp);


/*
https://262.ecma-international.org/#sec-ispropertykey
7.2.7 IsPropertyKey ( argument )
https://tc39.es/ecma262/multipage/abstract-operations.html
NONE
*/
const IsPropertyKey = (v) => (typeof v === "string" || typeof v === "symbol");


/*
https://262.ecma-international.org/#sec-isstringwellformedunicode
7.2.9 Static Semantics: IsStringWellFormedUnicode ( string )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstringwellformedunicode
7.2.7 Static Semantics: IsStringWellFormedUnicode ( string )
*/
const IsStringWellFormedUnicode = (string) => string.isWellFormed();


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/#sec-sametype
7.2.8 SameType ( x, y )
*/
const SameType =
  (x, y) => (x == null && x === y) ? true : (typeof x === typeof y);


/*
https://262.ecma-international.org/#sec-samevalue
7.2.10 SameValue ( x, y )
https://tc39.es/ecma262/#sec-samevalue
7.2.9 SameValue ( x, y )
*/
const SameValue = Object.is
  || ((x, y) => ((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y)));


/*
https://262.ecma-international.org/#sec-samevaluezero
7.2.11 SameValueZero ( x, y )
https://tc39.es/ecma262/#sec-samevaluezero
7.2.10 SameValueZero ( x, y )
*/
const SameValueZero = (x, y) => (x === y || (x !== x && y !== y));


/*
https://262.ecma-international.org/#sec-samevaluenonnumber
7.2.12 SameValueNonNumber ( x, y )
https://tc39.es/ecma262/#sec-samevaluenonnumber
7.2.11 SameValueNonNumber ( x, y )
*/
function SameValueNonNumber (x, y) {
  if (typeof x === "number" || typeof y === "number") {
    throw new TypeError(
      "SameValueNonNumber(); TypeError: x and y both have to be non number"
    );
  }
  return (x === y);
}


/*
https://262.ecma-international.org/#sec-islessthan
7.2.13 IsLessThan ( x, y, LeftFirst )
https://tc39.es/ecma262/#sec-islessthan
7.2.12 IsLessThan ( x, y, LeftFirst )
*/
const IsLessThan = (x, y, leftFirst = true) => (leftFirst ? (x < y) : (x > y));


/*
https://262.ecma-international.org/#sec-islooselyequal
7.2.14 IsLooselyEqual ( x, y )
https://tc39.es/ecma262/#sec-islooselyequal
7.2.13 IsLooselyEqual ( x, y )
*/
const IsLooselyEqual = (x, y) => (x == y);


/*
https://262.ecma-international.org/#sec-isstrictlyequal
7.2.15 IsStrictlyEqual ( x, y )
https://tc39.es/ecma262/#sec-isstrictlyequal
7.2.14 IsStrictlyEqual ( x, y )
*/
const IsStrictlyEqual = (x, y) => (x === y);


/*
https://262.ecma-international.org/#sec-operations-on-objects
7.3.1 MakeBasicObject ( internalSlotsList )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-makebasicobject
7.3.1 MakeBasicObject ( internalSlotsList )
internalSlotsList:
https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-internal-methods-and-internal-slots
*/
function MakeBasicObject (internalSlotsList) {
  if (internalSlotsList == null) { internalSlotsList = {}; }
  let res = {};
  if (internalSlotsList != null && typeof internalSlotsList === "object") {
    for (let key of Object.keys(internalSlotsList)) {
      Object.defineProperty(res, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: internalSlotsList[key]
      });
    }
  }
  return res;
}


/*
https://262.ecma-international.org/#sec-get-o-p
7.3.2 Get ( O, P )
https://tc39.es/ecma262/#sec-get-o-p
7.3.2 Get ( O, P )
*/
const Get = (O, P )=> O[P];


/*
https://262.ecma-international.org/#sec-getv
7.3.3 GetV ( V, P )
https://tc39.es/ecma262/#sec-getv
7.3.3 GetV ( V, P )
*/
function GetV (O, P) {
  if (O == null) { throw TypeError(); }
  return Object(O)[P];
}


/*
https://262.ecma-international.org/#sec-set-o-p-v-throw
7.3.4 Set ( O, P, V, Throw )
https://tc39.es/ecma262/#sec-set-o-p-v-throw
7.3. Set ( O, P, V, Throw)
*/
function Set (O, P, V, Throw = false) {
  O[P] = V;
  if (O[P] !== V && Throw) {
    throw new TypeError("(); error: " + O + "[" + P + "]");
  }
}


/*
https://262.ecma-international.org/#sec-createdataproperty
7.3.5 CreateDataProperty ( O, P, V )
https://tc39.es/ecma262/#sec-createdataproperty
7.3.5 CreateDataProperty ( O, P, V )
*/
const CreateDataProperty = (O, P, V) => Object.defineProperty(
  O, P, {value: V, writable: true, enumerable: true, configurable: true}
);


/*
https://262.ecma-international.org/#sec-createdatapropertyorthrow
7.3.6 CreateDataPropertyOrThrow ( O, P, V )
https://tc39.es/ecma262/#sec-createdatapropertyorthrow
7.3.6 CreateDataPropertyOrThrow ( O, P, V )
*/
function CreateDataPropertyOrThrow (O, P, V) {
  Object.defineProperty(O, P, {
    writable: true, enumerable: true, configurable: true, value: V
  });
  if (O[P] !== V) {
    throw new Error("CreateDataPropertyOrThrow(); error: " + O + "[" + P + "]");
  }
  return O;
}


/*
https://262.ecma-international.org/#sec-createnonenumerabledatapropertyorthrow
7.3.7 CreateNonEnumerableDataPropertyOrThrow ( O, P, V )
https://tc39.es/ecma262/#sec-createnonenumerabledatapropertyorthrow
7.3.7 CreateNonEnumerableDataPropertyOrThrow ( O, P, V )
*/
function CreateNonEnumerableDataPropertyOrThrow (O, P, V) {
  if (O != null && typeof O === "object") {
    Object.defineProperty(O, P, {
      writable: true, enumerable: false, configurable: true, value: V
    });
  }
  if (O[P] !== V) {
    throw new TypeError("CreateNonEnumerableDataPropertyOrThrow(); error");
  }
}


/*
https://262.ecma-international.org/#sec-definepropertyorthrow
7.3.8 DefinePropertyOrThrow ( O, P, desc )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-definepropertyorthrow
7.3.8 DefinePropertyOrThrow ( O, P, desc )
*/
function DefinePropertyOrThrow (O, P, desc) {
  Object.defineProperty(O, P, desc);
  if (O[P] !== desc.value) { throw new Error(); }
}


/*
https://262.ecma-international.org/#sec-deletepropertyorthrow
7.3.9 DeletePropertyOrThrow ( O, P )
https://tc39.es/ecma262/#sec-definepropertyorthrow
7.3.9 DeletePropertyOrThrow ( O, P )
*/
function DeletePropertyOrThrow (O, P) {
  delete O[P];
  if (P in O) {
    throw new Error("Object Property delete error: " + O + "[" + P + "]");
  }
}


/*
https://262.ecma-international.org/#sec-getmethod
7.3.10 GetMethod ( V, P )
https://tc39.es/ecma262/#sec-getmethod
7.3.10 GetMethod ( V, P )
*/
function GetMethod (O, P) {
  let func = O[P];
  if (func == null) { return undefined; }
  if (typeof func !== "function") {
    throw new TypeError("Method not callable: " + P);
  }
  return func;
}


/*
https://262.ecma-international.org/#sec-hasproperty
7.3.11 HasProperty ( O, P )
https://tc39.es/ecma262/#sec-hasproperty
7.3.11 HasProperty ( O, P )
*/
const HasProperty = (O, P) => (P in O);


/*
https://262.ecma-international.org/#sec-hasownproperty
7.3.12 HasOwnProperty ( O, P )
https://tc39.es/ecma262/#sec-hasownproperty
7.3.12 HasOwnProperty ( O, P )
*/
const HasOwnProperty = (O, P) => Object.prototype.hasOwnProperty.call(O, P);


/*
https://262.ecma-international.org/#sec-call
7.3.13 Call ( F, V [ , argumentsList ] )
https://tc39.es/ecma262/#sec-call
7.3.13 Call ( F, V [ , argumentsList ] )
*/
/*const Call = Function.prototype.call.bind(Function.prototype.apply);*/
function Call (F, V, argumentsList = []) {
  if (!Array.isArray(argumentsList)) {
    throw new TypeError("argumentsList should be an array: ", argumentsList);
  }
  return Function.prototype.apply.call(F, V, argumentsList);
}


/*
https://262.ecma-international.org/#sec-construct
7.3.14 Construct ( F [ , argumentsList [ , newTarget ] ] )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-construct
7.3.14 Construct ( F [ , argumentsList [ , newTarget ] ] )
*/
const Construct = (F, argumentsList, newTarget) =>
  Reflect.construct(F, argumentsList || [], newTarget || F);


/*
https://262.ecma-international.org/#sec-setintegritylevel
7.3.15 SetIntegrityLevel ( O, level )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-setintegritylevel
7.3.15 SetIntegrityLevel ( O, level )
*/
function SetIntegrityLevel (O, level) {
  if (level === "SEALED") {
    Object.seal(O);
    return Object.isSealed(O);
  }
  if (level === "FROZEN") {
    Object.freeze(O);
    return Object.isFrozen(O);
  }
}


/*
https://262.ecma-international.org/#sec-testintegritylevel
7.3.16 TestIntegrityLevel ( O, level )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-testintegritylevel
7.3.16 TestIntegrityLevel ( O, level )
*/
function TestIntegrityLevel (O, level) {
  if (Object.isExtensible(O)) { return false; }
  if (level === "SEALED") { return Object.isSealed(O); }
  if (level === "FROZEN") { return Object.isFrozen(O); }
}


/*
https://262.ecma-international.org/#sec-createarrayfromlist
7.3.17 CreateArrayFromList ( elements )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createarrayfromlist
7.3.17 CreateArrayFromList ( elements )
*/
const CreateArrayFromList = (...A) => A;


/*
https://262.ecma-international.org/#sec-lengthofarraylike
7.3.18 LengthOfArrayLike ( obj )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-lengthofarraylike
7.3.18 LengthOfArrayLike ( obj )
*/
function LengthOfArrayLike (O) {
  let v = Math.trunc(+O.length);
  v = ((v !== v || v === 0) ? 0 : v);
  return Math.min(Math.max(v, 0), Math.pow(2, 53) - 1);
}


/*
https://262.ecma-international.org/#sec-createlistfromarraylike
7.3.19 CreateListFromArrayLike ( obj [ , elementTypes ] )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createlistfromarraylike
7.3.19 CreateListFromArrayLike ( obj [ , validElementTypes ] )
*/
function CreateListFromArrayLike (O, validElementTypes) {
  const Type = (v) => ((v === null) ? "null" : (typeof v));
  function ToLength (argument) {
    let v = +argument;
    if (1/v === Infinity || 1/v === -Infinity || v !== v) { v = 0; }
    let len = ((v === Infinity || v === -Infinity) ? v : Math.trunc(v));
    if (len < 0) { return 0; }
    return Math.min(len, Math.pow(2, 53) - 1);
  }
  if (validElementTypes == null) {
    validElementTypes = ["undefined", "null", "boolean", "string", "symbol",
      "number", "bigint", "object"];
  }
  if (Type(O) !== "object") { throw new TypeError(O + " is not an object"); }
  let len = ToLength(O.length), list = [], i = 0;
  while (i < len) {
    let next = O[String(i)];
    if (validElementTypes.indexOf(Type(next)) < 0) { throw new TypeError(); }
    list.push(next);
    i++;
  }
  return list;
}


/*
https://262.ecma-international.org/#sec-invoke
7.3.20 Invoke ( V, P [ , argumentsList ] )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-invoke
7.3.20 Invoke ( V, P [ , argumentsList ] )
*/
function Invoke(V, P, argumentsList = []) {
  function Call (F, V, argumentsList = []) {
    if (!Array.isArray(argumentsList)) {
      throw new TypeError("argumentsList should be an array: ", argumentsList);
    }
    return Function.prototype.apply.call(F, V, argumentsList);
  }
  return Call(Object(V[P]), V, argumentsList);
}


/*
https://262.ecma-international.org/#sec-ordinaryhasinstance
7.3.21 OrdinaryHasInstance ( C, O )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ordinaryhasinstance
7.3.21 OrdinaryHasInstance ( C, O )
*/
function OrdinaryHasInstance (C, O) {
  const Type = (O) => (O === null ? "null" : typeof O);
  if (Type(C) !== "function") { return false; }
  if (Type(O) !== "object") { return false; }
  if (Type(C.prototype) !== "object") {
    throw new TypeError(
      "OrdinaryHasInstance(); TypeError: C.prototype is not an object"
    );
  }
  return O instanceof C;
}


/*
https://262.ecma-international.org/#sec-speciesconstructor
7.3.22 SpeciesConstructor ( O, defaultConstructor )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-speciesconstructor
7.3.22 SpeciesConstructor ( O, defaultConstructor )
*/
function SpeciesConstructor (O, defaultConstructor) {
  let C = O.constructor;
  if (C === undefined) { return defaultConstructor; }
  if (!(["object", "function"].includes((C === null) ? "null" : (typeof C)))) {
    throw new TypeError("O.constructor is not an Object");
  }
  let S = (typeof self.Symbol === "function"
    && typeof self.Symbol.species === "symbol")
    ? C [self.Symbol.species] : undefined;
  if (S == null) { return defaultConstructor; }
  if (typeof S === "function" && typeof S.prototype === "object") { return S; }
  throw new TypeError("No constructor found");
}


/*
https://262.ecma-international.org/#sec-enumerableownproperties
7.3.23 EnumerableOwnProperties ( O, kind )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-enumerableownproperties
7.3.23 EnumerableOwnProperties ( O, kind )
*/
function EnumerableOwnProperties (O, kind) {
  switch (kind) {
    case "KEY": return Object.keys(O);
    case "VALUE": return Object.values(O);
    case "KEY+VALUE": return Object.entries(O);
    default: return [];
  }
}


/*
https://262.ecma-international.org/#sec-getfunctionrealm
7.3.24 GetFunctionRealm ( obj )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getfunctionrealm
7.3.24 GetFunctionRealm ( obj )
TODO
*/


/*
https://262.ecma-international.org/#sec-copydataproperties
7.3.25 CopyDataProperties ( target, source, excludedItems )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-copydataproperties
7.3.25 CopyDataProperties ( target, source, excludedItems )
*/
function CopyDataProperties (target, source, excludedItems) {
  function ToObject (O) {
    if (O == null) { throw new TypeError("ToObject(); error: " + O); }
    if (["object", "function"].includes(typeof O)) { return O; }
    return Object(O);
  }
  if (source == null) { return undefined; }
  let from = ToObject(source);
  let keys = Object.keys(from).filter((v) => !(excludedItems.includes(v)));
  for (let key of keys) { target[key] = source[key]; }
}


/*
https://262.ecma-international.org/#sec-privateelementfind
7.3.26 PrivateElementFind ( O, P )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privateelementfind
7.3.26 PrivateElementFind ( O, P )
TODO
*/


/*
https://262.ecma-international.org/#sec-privatefieldadd
7.3.27 PrivateFieldAdd ( O, P, value )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privatefieldadd
7.3.27 PrivateFieldAdd ( O, P, value )
TODO
*/


/*
https://262.ecma-international.org/#sec-privatemethodoraccessoradd
7.3.28 PrivateMethodOrAccessorAdd ( O, method )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privatemethodoraccessoradd
7.3.28 PrivateMethodOrAccessorAdd ( O, method )
TODO
*/


/*
https://262.ecma-international.org/#sec-hostensurecanaddprivateelement
7.3.29 HostEnsureCanAddPrivateElement ( O )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-hostensurecanaddprivateelement
7.3.29 HostEnsureCanAddPrivateElement ( O )
TODO
*/


/*
https://262.ecma-international.org/#sec-privateget
7.3.30 PrivateGet ( O, P )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privateget
7.3.30 PrivateGet ( O, P )
TODO
*/


/*
https://262.ecma-international.org/#sec-privateset
7.3.31 PrivateSet ( O, P, value )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privateset
7.3.31 PrivateSet ( O, P, value )
TODO
*/


/*
https://262.ecma-international.org/#sec-definefield
7.3.32 DefineField ( receiver, fieldRecord )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-definefield
7.3.32 DefineField ( receiver, fieldRecord )
TODO
*/


/*
https://262.ecma-international.org/#sec-initializeinstanceelements
7.3.33 InitializeInstanceElements ( O, constructor )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-initializeinstanceelements
7.3.33 InitializeInstanceElements ( O, constructor )
TODO
*/


/*
https://262.ecma-international.org/#sec-add-value-to-keyed-group
7.3.34 AddValueToKeyedGroup ( groups, key, value )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-add-value-to-keyed-group
7.3.34 AddValueToKeyedGroup ( groups, key, value )
*/
function AddValueToKeyedGroup (groups, key, value) {
  let count = 0, keyPos = 0;
  groups.forEach(function (record, index) {
    if (Object.is(record["[[Key]]"], key)) {
      count++;
      keyPos = index;
    }
  });
  if (count > 1) {
    throw new Error(
      "AddValueToKeyedGroup(); Error: there are more records with the key"
    );
  }
  if (!count) {
    groups.push({"[[Key]]": key, "[[Elements]]": [value]});
  } else {
    groups[keyPos]["[[Elements]]"].push(value)
  }
}


/*
https://262.ecma-international.org/#sec-groupby
7.3.35 GroupBy ( items, callbackfn, keyCoercion )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-groupby
7.3.35 GroupBy ( items, callback, keyCoercion )
*/
function GroupBy (items, callback, keyCoercion) {
  const Type = (O) => (O === null ? "null" : typeof O);
  function AddValueToKeyedGroup (groups, key, value) {
    let count = 0, keyPos = 0;
    groups.forEach(function (record, index) {
      if (Object.is(record["[[Key]]"], key)) {
        count++;
        keyPos = index;
      }
    });
    if (count > 1) {
      throw new Error(
        "AddValueToKeyedGroup(); Error: there are more records with the key"
      );
    }
    if (!count) {
      groups.push({"[[Key]]": key, "[[Elements]]": [value]});
    } else {
      groups[keyPos]["[[Elements]]"].push(value)
    }
  }
  if (Type(items) !== "object") {
    throw new TypeError("GroupBy(); TypeError: items is not an object");
  }
  if (Type(callback) !== "function") {
    throw new TypeError("GroupBy(); TypeError: callback is not a function");
  }
  if (keyCoercion !== "PROPERTY" && keyCoercion !== "COLLECTION") {
    throw new Error(
      "GroupBy(); Error: keyCoercion has to be \"PROPERTY\" or \"COLLECTION\""
    );
  }
  let k = 0;
  let groups = [];
  for (let item of items) {
    if (k > (Math.pow(2, 53) - 1)) {
      throw new RangeError("GroupBy(); RangeError: iterator size")
    }
    let key = callback(item, k);
    if (keyCoercion === "PROPERTY") {
      key = (typeof key === "symbol" ? key : String(key));
    } else {
      key = ((1 / key === -Infinity) ? 0 : key);
    }
    AddValueToKeyedGroup(groups, key, item);
    k++;
  }
  return groups;
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-SetterThatIgnoresPrototypeProperties
7.3.36 SetterThatIgnoresPrototypeProperties ( thisValue, home, p, v )
*/
function SetterThatIgnoresPrototypeProperties (thisValue, home, p, v) {
  function CreateDataPropertyOrThrow (O, P, V) {
    Object.defineProperty(O, P, {
      writable: true, enumerable: true, configurable: true, value: V
    });
    if (O[P] !== V) {
      throw new Error(
        "CreateDataPropertyOrThrow(); error: " + O + "[" + P + "]"
      );
    }
    return O;
  }
  function Set (O, P, V, Throw = false) {
    O[P] = V;
    if (O[P] !== V && Throw) {
      throw new TypeError("Set(); error: " + O + "[" + P + "]");
    }
  }
  if ((thisValue != null && typeof thisValue !== "object")) {
    throw new TypeError(
      "SetterThatIgnoresPrototypeProperties(); TypeError: thisValue is not an object"
    );
  }
  if (Object.is(thisValue, home)) {
    throw new TypeError(
      "SetterThatIgnoresPrototypeProperties(); TypeError: Throwing here emulates assignment to a non-writable data property on the home object in strict mode code."
    );
  }
  let desc = thisValue[p];
  if (desc === undefined) {
    CreateDataPropertyOrThrow(thisValue, p, v);
  } else {
     Set(thisValue, p, v, true);
  }
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiteratordirect
7.4.2 GetIteratorDirect ( obj )
*/
const GetIteratorDirect = (O) =>
  ({"[[Iterator]]": O, "[[NextMethod]]": O.next, "[[Done]]": false});


/*
https://262.ecma-international.org/#sec-getiteratorfrommethod
7.4.2 GetIteratorFromMethod ( obj, method )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiteratorfrommethod
7.4.3 GetIteratorFromMethod ( obj, method )
*/
function GetIteratorFromMethod (O, method) {
  let iterator = Reflect.apply(method, O, []);
  if (((iterator === null) ? "null" : (typeof iterator)) !== "object") {
    throw new TypeError();
  }
  return {
    "[[Iterator]]": iterator,
    "[[NextMethod]]": iterator.next,
    "[[Done]]": false
  };
}


/*
https://262.ecma-international.org/#sec-getiterator
7.4.3 GetIterator ( obj, kind )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiterator
7.4.4 GetIterator ( obj, kind )
*/
function GetIterator (O, kind) {
  async function* createAsyncIterable(syncIterable) {
    for (const item of syncIterable) { yield item; }
  }
  let iterator;
  if (kind === "ASYNC") { /* ASYNC */
    if (O[Symbol.asyncIterator] === undefined
      && O[Symbol.iterator] === undefined) {
      throw new TypeError(
        "GetIterator(); Error: " + O + " is not sync/async iterable"
      );
    }    if (O[Symbol.asyncIterator] !== undefined) {
      iterator = O[Symbol.asyncIterator]();
    }
    if (O[Symbol.asyncIterator] === undefined
    && O[Symbol.iterator] !== undefined) {
      iterator = createAsyncIterable(O);
    }
  } else { /* SYNC */
    if (O[Symbol.iterator] === undefined) {
      throw new TypeError(
        "GetIterator(); Error: " + O + " is not sync iterable");
    }
    iterator = O[Symbol.iterator]();
  }
  if (((iterator === null) ? "null" : (typeof iterator)) !== "object") {
    throw new TypeError("GetIterator(); Error: iterator");
  }
  return {
    "[[Iterator]]": iterator,
    "[[NextMethod]]": iterator.next,
    "[[Done]]": false
  };
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiteratorflattenable
7.4.5 GetIteratorFlattenable ( obj, primitiveHandling )
*/
function GetIteratorFlattenable (O, primitiveHandling) {
  const Type = (O) => (O === null ? "null" : typeof O);
  if (Type(O) !== "object") {
    if (primitiveHandling === "REJECT-PRIMITIVES") {
      throw new TypeError(
        "GetIteratorFlattenable(); TypeError: " + O + " is not an object"
      );
    }
    if (primitiveHandling === "ITERATE-STRING-PRIMITIVES"
      && typeof O !== "string") {
      throw new TypeError(
        "GetIteratorFlattenable(); TypeError: " + O + " is not a string"
      );
    }
  }
  if (O[Symbol.iterator] === undefined) {
    var iterator = O;
  } else {
    var iterator = O[Symbol.iterator]();
  }
  if (Type(iterator) !== "object") {
    throw new TypeError(
      "GetIteratorFlattenable(); TypeError: " + iterator + " is not an object"
    );
  }
  return {
    "[[Iterator]]": iterator,
    "[[NextMethod]]": iterator.next,
    "[[Done]]": false
  };
}


/*
https://262.ecma-international.org/#sec-iteratornext
7.4.4 IteratorNext ( iteratorRecord [ , value ] )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratornext
7.4.6 IteratorNext ( iteratorRecord [ , value ] )
TODO
*/
function IteratorNext(iteratorRecord, value) {
  const Type = (O) => (O === null ? "null" : typeof O);
  if (Type(iteratorRecord) !== "object") {
    throw new TypeError(
      "IteratorNext(); TypeError: iteratorRecord is not an object"
    );
  }
  let result;
  if (value == null) {
    result = Reflect.apply(
      iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"], []
    );
  } else {
    result = Reflect.apply(
      iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"], [value]
    );
  }
  if (Type(result) !== "object") {
    iteratorRecord["[[Done]]"] = true;
    throw new TypeError("IteratorNext(); TypeError: result is not an object");
  }
  return result;
}


/*
https://262.ecma-international.org/#sec-iteratorcomplete
7.4.5 IteratorComplete ( iterResult )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorcomplete
7.4.7 IteratorComplete ( iteratorResult )
*/
const IteratorComplete = (iterResult) => Boolean(iterResult["done"]);


/*
https://262.ecma-international.org/#sec-iteratorvalue
7.4.6 IteratorValue ( iterResult )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorvalue
7.4.8 IteratorValue ( iteratorResult )
*/
const IteratorValue = (iterResult) => iterResult["value"];


/*
https://262.ecma-international.org/#sec-iteratorstep
7.4.7 IteratorStep ( iteratorRecord )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorstep
7.4.9 IteratorStep ( iteratorRecord )
*/
function IteratorStep (iteratorRecord) {
  function IteratorNext(iteratorRecord, value) {
    const Type = (O) => (O === null ? "null" : typeof O);
    if (Type(iteratorRecord) !== "object") {
      throw new TypeError(
        "IteratorNext(); TypeError: iteratorRecord is not an object"
      );
    }
    let result;
    if (value == null) {
      result = Reflect.apply(
        iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"], []
      );
    } else {
      result = Reflect.apply(
        iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"], [value]
      );
    }
    if (Type(result) !== "object") {
      iteratorRecord["[[Done]]"] = true;
      throw new TypeError("IteratorNext(); TypeError: result is not an object");
    }
    return result;
  }
  var result = IteratorNext(iteratorRecord);
  var done = Boolean(result["done"]);
  if (done) {
    iteratorRecord["[[Done]]"] = true;
    return done;
  }
  return result;
}


/*
https://262.ecma-international.org/#sec-iteratorstepvalue
7.4.8 IteratorStepValue ( iteratorRecord )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorstepvalue
7.4.10 IteratorStepValue ( iteratorRecord )
*/
function IteratorStepValue(iteratorRecord) {
  function IteratorStep (iteratorRecord) {
    function IteratorNext(iteratorRecord, value) {
      const Type = (O) => (O === null ? "null" : typeof O);
      if (Type(iteratorRecord) !== "object") {
        throw new TypeError(
          "IteratorNext(); TypeError: iteratorRecord is not an object"
        );
      }
      let result;
      if (value == null) {
        result = Reflect.apply(
          iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"], []
        );
      } else {
        result = Reflect.apply(
          iteratorRecord["[[NextMethod]]"], iteratorRecord["[[Iterator]]"], [value]
        );
      }
      if (Type(result) !== "object") {
        iteratorRecord["[[Done]]"] = true;
        throw new TypeError("IteratorNext(); TypeError: result is not an object");
      }
      return result;
    }
    var result = IteratorNext(iteratorRecord);
    var done = Boolean(result["done"]);
    if (done) {
      iteratorRecord["[[Done]]"] = true;
      return done;
    }
    return result;
  }
  let result = IteratorStep(iteratorRecord);
  if (result === true) { return true; }
  try {
    var value = result.value;
  } catch (e) {
    iteratorRecord["[[Done]]"] = true;
    throw new TypeError("IteratorStepValue(); Error: " + e);
  }
  return value;
}


/*
https://262.ecma-international.org/#sec-iteratorclose
7.4.9 IteratorClose ( iteratorRecord, completion )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorclose
7.4.11 IteratorClose ( iteratorRecord, completion )
*/
function IteratorClose (iteratorRecord, completion) {
  function GetMethod (O, P) {
    let func = O[P];
    if (func == null) { return undefined; }
    if (typeof func !== "function") {
      throw new TypeError("Method not callable: " + P);
    }
    return func;
  }
  function Completion (completionRecord) {
    if (completionRecord != null && typeof completionRecord === "object") {
      let crKeys = Object.keys(completionRecord);
      if (crKeys.length === 3
        && crKeys.includes("[[Type]]")
        && crKeys.includes("[[Value]]")
        && crKeys.includes("[[Target]]")) {
          return completionRecord;
      }
    }
    throw new TypeError(
      "Completion(); TypeError: completionRecord is not a Completion Record"
    );
  }
  let iterator = iteratorRecord["[[Iterator]]"];
  if (iterator == null || typeof iterator !== "object") {
    throw new TypeError(
      "IteratorClose(); TypeError: iterator have to be an object"
    );
  }
  let innerReturn = GetMethod(iterator, "return");
  if (innerReturn === undefined) { return Completion(completion); }
  let innerResult = Reflect.apply(innerReturn, iterator, []);
  if (completion["[[Type]]"] === "THROW") { return completion; }
  if (innerResult["[[Type]]"] === "THROW") { return innerResult; }
  if (innerResult == null || typeof innerResult !== "object") {
    throw new TypeError(
      "Completion(); TypeError: iterator return function return value is not an object"
    );
  }
  return Completion(completion);
}


/*
https://262.ecma-international.org/#sec-ifabruptcloseiterator
7.4.10 IfAbruptCloseIterator ( value, iteratorRecord )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ifabruptcloseiterator
7.4.12 IfAbruptCloseIterator ( value, iteratorRecord )
*/
function IfAbruptCloseIterator (value, iteratorRecord) {
  function Completion (completionRecord) {
    if (completionRecord != null && typeof completionRecord === "object") {
      let crKeys = Object.keys(completionRecord);
      if (crKeys.length === 3
        && crKeys.includes("[[Type]]")
        && crKeys.includes("[[Value]]")
        && crKeys.includes("[[Target]]")) {
          return completionRecord;
        }
    }
    throw new TypeError(
      "Completion(); TypeError: completionRecord is not a Completion Record"
    );
  }
  function IteratorClose (iteratorRecord, completion) {
    function GetMethod (O, P) {
      let func = O[P];
      if (func == null) { return undefined; }
      if (typeof func !== "function") {
        throw new TypeError("Method not callable: " + P);
      }
      return func;
    }
    function Completion (completionRecord) {
      if (completionRecord != null && typeof completionRecord === "object") {
        let crKeys = Object.keys(completionRecord);
        if (crKeys.length === 3
          && crKeys.includes("[[Type]]")
          && crKeys.includes("[[Value]]")
          && crKeys.includes("[[Target]]")) {
            return completionRecord;
        }
      }
      throw new TypeError(
        "Completion(); TypeError: completionRecord is not a Completion Record"
      );
    }
    let iterator = iteratorRecord["[[Iterator]]"];
    if (iterator == null || typeof iterator !== "object") {
      throw new TypeError(
        "IteratorClose(); TypeError: iterator have to be an object"
      );
    }
    let innerReturn = GetMethod(iterator, "return");
    if (innerReturn === undefined) { return Completion(completion); }
    let innerResult = Reflect.apply(innerReturn, iterator, []);
    if (completion["[[Type]]"] === "THROW") { return completion; }
    if (innerResult["[[Type]]"] === "THROW") { return innerResult; }
    if (innerResult == null || typeof innerResult !== "object") {
      throw new TypeError(
        "Completion(); TypeError: iterator return function return value is not an object"
      );
    }
    return Completion(completion);
  }
  Completion(value);
  if (value["[[Type]]"] !== "NORMAL") {
    return IteratorClose(iteratorRecord, value);
  } else {
    value = value;
  }
}


/*
https://262.ecma-international.org/#sec-asynciteratorclose
7.4.11 AsyncIteratorClose ( iteratorRecord, completion )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-asynciteratorclose
7.4.13 AsyncIteratorClose ( iteratorRecord, completion )
*/
function AsyncIteratorClose (iteratorRecord, completion) {
  function GetMethod (O, P) {
    let func = O[P];
    if (func == null) { return undefined; }
    if (typeof func !== "function") {
      throw new TypeError("Method not callable: " + P);
    }
    return func;
  }
  function Completion (completionRecord) {
    if (completionRecord != null && typeof completionRecord === "object") {
      let crKeys = Object.keys(completionRecord);
      if (crKeys.length === 3
        && crKeys.includes("[[Type]]")
        && crKeys.includes("[[Value]]")
        && crKeys.includes("[[Target]]")) {
          return completionRecord;
      }
    }
    throw new TypeError(
      "Completion(); TypeError: completionRecord is not a Completion Record"
    );
  }
  let iterator = iteratorRecord["[[Iterator]]"];
  if (iterator == null || typeof iterator !== "object") {
    throw new TypeError(
      "AsyncIteratorClose(); TypeError: iterator have to be an object"
    );
  }
  let innerReturn = GetMethod(iterator, "return");
  if (innerReturn === undefined) { return Completion(completion); }
  let innerResult = Reflect.apply(innerReturn, iterator, []);
  if (completion["[[Type]]"] === "THROW") { return completion; }
  if (innerResult["[[Type]]"] === "THROW") { return innerResult; }
  if (innerResult == null || typeof innerResult !== "object") {
    throw new TypeError(
      "Completion(); TypeError: iterator return function return value is not an object"
    );
  }
  return Completion(completion);
}


/*
https://262.ecma-international.org/#sec-createiterresultobject
7.4.12 CreateIterResultObject ( value, done )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createiterresultobject
7.4.14 CreateIteratorResultObject ( value, done )
*/
const CreateIteratorResultObject = (v, done) => ({"value": v, "done": done});


/*
https://262.ecma-international.org/#sec-createlistiteratorRecord
7.4.13 CreateListIteratorRecord ( list )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createlistiteratorRecord
7.4.15 CreateListIteratorRecord ( list )
*/
function CreateListIteratorRecord (list) {
  let obj = Array.from(list).values();
  return ({"[[Iterator]]": obj, "[[NextMethod]]": obj.next, "[[Done]]": false});
}


/*
https://262.ecma-international.org/#sec-iteratortolist
7.4.14 IteratorToList ( iteratorRecord )
https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratortolist
7.4.16 IteratorToList ( iteratorRecord )
*/
const IteratorToList = (iteratorRecord) => [...iteratorRecord["[[Iterator]]"]];


/*
https://262.ecma-international.org/#sec-clear-kept-objects
9.11 ClearKeptObjects ( )
https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-clear-kept-objects
9.10 ClearKeptObjects ( )
TODO
*/


/*
https://262.ecma-international.org/#sec-addtokeptobjects
9.12 AddToKeptObjects ( value )
https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-addtokeptobjects
9.11 AddToKeptObjects ( value )
TODO
*/


/*
https://262.ecma-international.org/#sec-cleanup-finalization-registry
9.13 CleanupFinalizationRegistry ( finalizationRegistry )
https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-cleanup-finalization-registry
9.12 CleanupFinalizationRegistry ( finalizationRegistry )
TODO
*/


/*
https://262.ecma-international.org/#sec-canbeheldweakly
9.14 CanBeHeldWeakly ( v )
https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-canbeheldweakly
9.13 CanBeHeldWeakly ( v )
*/
function CanBeHeldWeakly (v) {
  if (v != null && typeof v === "object") { return true; }
  if (typeof v === "symbol" && Symbol.keyFor(v) === undefined) {
    return true;
  }
  return false;
}


/*
https://262.ecma-international.org/#sec-ordinaryobjectcreate
10.1.12 OrdinaryObjectCreate ( proto [ , additionalInternalSlotsList ] )
https://tc39.es/ecma262/#sec-ordinaryobjectcreate
10.1.12 OrdinaryObjectCreate ( proto [ , additionalInternalSlotsList ] )
*/
function OrdinaryObjectCreate (proto, additionalInternalSlotsList) {
  if (additionalInternalSlotsList == null) { additionalInternalSlotsList = {}; }
  let O = {};
  if (additionalInternalSlotsList != null
    && typeof additionalInternalSlotsList === "object") {
    for (let key of Object.keys(additionalInternalSlotsList)) {
      Object.defineProperty(O, key, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: additionalInternalSlotsList[key]
        });
      }
    }
  Object.setPrototypeOf(O, proto);
  return O;
}


/*
https://262.ecma-international.org/#sec-ordinarycreatefromconstructor
10.1.13 OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ , internalSlotsList ] )
https://tc39.es/ecma262/#sec-ordinarycreatefromconstructor
10.1.13 OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ , internalSlotsList ] )
*/
function OrdinaryCreateFromConstructor (
  constructor, intrinsicDefaultProto, internalSlotsList) {
  if (internalSlotsList == null) { internalSlotsList = {}; }
  let proto = constructor["prototype"];
  if (proto == null && typeof proto !== "object") {
    proto = intrinsicDefaultProto;
  }
  let res = Object.create(proto);
  for (let key of Object.keys(internalSlotsList)) {
    Object.defineProperty(res, key, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: internalSlotsList[key]
    });
  }
  return res;
}


/*
https://262.ecma-international.org/#sec-getprototypefromconstructor
10.1.14 GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
https://tc39.es/ecma262/#sec-getprototypefromconstructor
10.1.14 GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
*/
function GetPrototypeFromConstructor (constructor, intrinsicDefaultProto) {
  let proto = constructor["prototype"];
  if (proto == null && typeof proto !== "object") {
    proto = intrinsicDefaultProto;
  }
  return proto;
}


/*
https://262.ecma-international.org/#sec-requireinternalslot
10.1.15 RequireInternalSlot ( O, internalSlot )
https://tc39.es/ecma262/#sec-requireinternalslot
10.1.15 RequireInternalSlot ( O, internalSlot )
*/
function RequireInternalSlot (O, internalSlot) {
  if (O == null || typeof O !== "object") {
    throw new TypeError("RequireInternalSlot(); TypeError: O is not an object");
  }
  if (!(internalSlot in O)) {
    throw new TypeError(
      "RequireInternalSlot(); TypeError: internalSlot not in O"
    );
  }
}


/*
https://262.ecma-international.org/#sec-ordinaryfunctioncreate
10.2.3 OrdinaryFunctionCreate ( functionPrototype, sourceText, ParameterList, Body, thisMode, env, privateEnv )
https://tc39.es/ecma262/#sec-ordinaryfunctioncreate
10.2.3 OrdinaryFunctionCreate ( functionPrototype, sourceText, ParameterList, Body, thisMode, env, privateEnv )
*/
const OrdinaryFunctionCreate =
  (functionPrototype, sourceText, ParameterList, Body, thisMode, env, privateEnv) =>
  Function(...ParameterList, Body);


/*
https://262.ecma-international.org/#sec-addrestrictedfunctionproperties
10.2.4 AddRestrictedFunctionProperties ( F, realm )
https://tc39.es/ecma262/#sec-addrestrictedfunctionproperties
10.2.4 AddRestrictedFunctionProperties ( F, realm )
TODO
*/


/*
https://262.ecma-international.org/#sec-makeconstructor
10.2.5 MakeConstructor ( F [ , writablePrototype [ , prototype ] ] )
https://tc39.es/ecma262/#sec-makeconstructor
10.2.5 MakeConstructor ( F [ , writablePrototype [ , prototype ] ] )
*/
function MakeConstructor (F, writablePrototype, proto) {
  const Type = (v) => ((v === null) ? "null" : (typeof v));
  function OrdinaryObjectCreate (proto) {
    let O = {};
    Object.setPrototypeOf(O, proto);
    return O;
  }
  if (Type(F) !== "function") {
    throw new TypeError("MakeConstructor(); TypeError: F is not a function");
  }
  if (!Object.isExtensible(F)) {
    throw new TypeError("MakeConstructor(); TypeError: F is not extensible");
  }
  if (writablePrototype == null) { writablePrototype = true; }
  if (proto == null) {
    proto = OrdinaryObjectCreate(Object.prototype) || F.prototype;
    Object.defineProperty(proto, "constructor", {
      writable: writablePrototype,
      enumerable: false,
      configurable: true,
      value: F
    });
  }
  Object.defineProperty(F, "prototype", {
    writable: writablePrototype,
    enumerable: false,
    configurable: false,
    value: proto
  });
}


/*
https://262.ecma-international.org/#sec-makeclassconstructor
10.2.6 MakeClassConstructor ( F )
https://tc39.es/ecma262/#sec-makeclassconstructor
10.2.6 MakeClassConstructor ( F )
TODO
*/


/*
https://262.ecma-international.org/#sec-makemethod
10.2.7 MakeMethod ( F, homeObject )
https://tc39.es/ecma262/#sec-makemethod
10.2.7 MakeMethod ( F, homeObject )
*/
const MakeMethod = (F, homeObject) => void(F.prototype = homeObject);


/*
https://262.ecma-international.org/#sec-definemethodproperty
10.2.8 DefineMethodProperty ( homeObject, key, closure, enumerable )
https://tc39.es/ecma262/#sec-definemethodproperty
10.2.8 DefineMethodProperty ( homeObject, key, closure, enumerable )
*/
function DefineMethodProperty (homeObject, key, closure, enumerable) {
  if (homeObject == null || typeof homeObject !== "object"
    || !Object.isExtensible(homeObject)) {
    throw new TypeError(
      "DefineMethodProperty(); TypeError: homeObject is not an extensible object"
    );
  }
  Object.defineProperty(homeObject, key,
    {value: closure, writable: true, enumerable: enumerable, configurable: true}
  );
}


/*
https://262.ecma-international.org/#sec-setfunctionname
10.2.9 SetFunctionName ( F, name [ , prefix ] )
https://tc39.es/ecma262/#sec-setfunctionname
10.2.9 SetFunctionName ( F, name [ , prefix ] )
*/
function SetFunctionName (F, name, prefix) {
  if (typeof name === "symbol") { name = "[" + name.description + "]"; }
  if (prefix != null) { name = prefix + " " + name; }
  Object.defineProperty(F, "name", {
    writable: false, enumerable: false, configurable: true, value: String(name)
  });
}


/*
https://262.ecma-international.org/#sec-setfunctionlength
10.2.10 SetFunctionLength ( F, length )
https://tc39.es/ecma262/#sec-setfunctionlength
10.2.10 SetFunctionLength ( F, length )
*/
function SetFunctionLength (F, length) {
  if (!Object.isExtensible(F) || Object.hasOwn(F, length)) {
    throw new TypeError (
      "SetFunctionLength(); TypeError: F is not extensible or has a length property"
    );
  } else {
    Object.defineProperty(F, "length", {
      writable: false, enumerable: false, configurable: true, value: length
    });
  }
}


/*
https://262.ecma-international.org/#sec-functiondeclarationinstantiation
10.2.11 FunctionDeclarationInstantiation ( func, argumentsList )
https://tc39.es/ecma262/#sec-functiondeclarationinstantiation
10.2.11 FunctionDeclarationInstantiation ( func, argumentsList )
TODO
*/


/*
https://262.ecma-international.org/#sec-builtincallorconstruct
10.3.3 BuiltinCallOrConstruct ( F, thisArgument, argumentsList, newTarget )
https://tc39.es/ecma262/#sec-builtincallorconstruct
10.3.3 BuiltinCallOrConstruct ( F, thisArgument, argumentsList, newTarget )
TODO
*/


/*
https://262.ecma-international.org/#sec-createbuiltinfunction
10.3.4 CreateBuiltinFunction ( behaviour, length, name, additionalInternalSlotsList [ , realm [ , prototype [ , prefix ] ] ] )
https://tc39.es/ecma262/#sec-createbuiltinfunction
10.3.4 CreateBuiltinFunction ( behaviour, length, name, additionalInternalSlotsList [ , realm [ , prototype [ , prefix ] ] ] )
TODO
*/


/*
https://262.ecma-international.org/#sec-boundfunctioncreate
10.4.1.3 BoundFunctionCreate ( targetFunction, boundThis, boundArgs )
https://tc39.es/ecma262/#sec-boundfunctioncreate
10.4.1.3 BoundFunctionCreate ( targetFunction, boundThis, boundArgs )
TODO
*/


/*
https://262.ecma-international.org/#sec-arraycreate
10.4.2.2 ArrayCreate ( length [ , proto ] )
https://tc39.es/ecma262/#sec-arraycreate
10.4.2.2 ArrayCreate ( length [ , proto ] )
*/
function ArrayCreate (length = 0, proto) {
  length = Number(length);
  if (1 / length === -Infinity) { length = 0; }
  if (length > (Math.pow(2, 32) - 1)) {
    throw new RangeError(
      "ArrayCreate(); error: Invalid array length " + length
    );
  }
  if (proto == null || proto === Array.prototype) { return Array(length); }
  var A = {};
  Object.setPrototypeOf(A, proto);
  A.length = length;
  return A;
}



/*
https://262.ecma-international.org/#sec-arrayspeciescreate
10.4.2.3 ArraySpeciesCreate ( originalArray, length )
https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arrayspeciescreate
10.4.2.3 ArraySpeciesCreate ( originalArray, length )
*/
function ArraySpeciesCreate(originalArray, length) {
  function ArrayCreate (length = 0, proto) {
    length = Number(length);
    if (1 / length === -Infinity) { length = 0; }
    if (length > (Math.pow(2, 32) - 1)) {
      throw new RangeError(
        "ArrayCreate(); error: Invalid array length " + length
      );
    }
    if (proto == null || proto === Array.prototype) { return Array(length); }
    var A = {};
    Object.setPrototypeOf(A, proto);
    A.length = length;
    return A;
  }
  if (length === 0 && 1/length === -Infinity) { length = 0; }
  if (!Array.isArray(originalArray)) { return ArrayCreate(length); }
  let C = originalArray.constructor;
  if (((C === null) ? "null" : (typeof C)) === "object") {
    C = "Symbol" in self && "species" in self.Symbol ? C[self.Symbol.species] : undefined;
    if (C === null) { C = undefined; }
  }
  if (C === undefined) { return ArrayCreate(length); }
  if (typeof C !== "function" || typeof C.prototype !== "object") {
    throw new TypeError("ArraySpeciesCreate(); error: C must be a constructor");
  }
  return new C(length);
}


/*
https://262.ecma-international.org/#sec-arraysetlength
10.4.2.4 ArraySetLength ( A, Desc )
https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arraysetlength
10.4.2.4 ArraySetLength ( A, Desc )
*/
function ArraySetLength (A, Desc) {
  if (Desc.Value != null) { Desc = Desc.Value; }
  if (!Array.isArray(A)) { throw new TypeError("A must be an Array"); }
  if (!Number.isSafeInteger(Desc) || Desc < 0 || 1/Desc === -Infinity) {
    throw new RangeError("Invalid array length");
  }
  A.length = Desc;
  return A.length === Desc;
}


/*
https://262.ecma-international.org/#sec-stringcreate
10.4.3.4 StringCreate ( value, prototype )
https://tc39.es/ecma262/#sec-stringcreate
10.4.3.4 StringCreate ( value, prototype )
*/
function StringCreate (v, Prototype) {
  if (typeof v !== "string") {
    throw new TypeError("StringCreate(); error");
  }
  return v.slice();
}


/*
https://262.ecma-international.org/#sec-stringgetownproperty
10.4.3.5 StringGetOwnProperty ( S, P )
https://tc39.es/ecma262/#sec-stringgetownproperty
10.4.3.5 StringGetOwnProperty ( S, P )
*/
const StringGetOwnProperty = (S, P) => S[P];


/*
https://262.ecma-international.org/#sec-createunmappedargumentsobject
10.4.4.6 CreateUnmappedArgumentsObject ( argumentsList )
https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-createunmappedargumentsobject
10.4.4.6 CreateUnmappedArgumentsObject ( argumentsList )
TODO
*/
function CreateUnmappedArgumentsObject () { return arguments; }


/*
https://262.ecma-international.org/#sec-createmappedargumentsobject
10.4.4.7 CreateMappedArgumentsObject ( func, formals, argumentsList, env )
https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-createmappedargumentsobject
10.4.4.7 CreateMappedArgumentsObject ( func, formals, argumentsList, env )
TODO
*/


/*
https://262.ecma-international.org/#sec-maketypedarraywithbufferwitnessrecord
10.4.5.9 MakeTypedArrayWithBufferWitnessRecord ( obj, order )
https://tc39.es/ecma262/#sec-maketypedarraywithbufferwitnessrecord
10.4.5.10 MakeTypedArrayWithBufferWitnessRecord ( obj, order )
TODO
*/


/*
https://262.ecma-international.org/#sec-typedarraycreate
10.4.5.10 TypedArrayCreate ( prototype )
https://tc39.es/ecma262/#sec-typedarraycreate
10.4.5.11 TypedArrayCreate ( prototype )
TypedArray have a fix length property, but where set this method the length?
*/
const TypedArrayCreate = (proto) => Reflect.construct(proto.constructor, []);


/*
https://262.ecma-international.org/#sec-typedarraybytelength
10.4.5.11 TypedArrayByteLength ( taRecord )
https://tc39.es/ecma262/#sec-typedarraybytelength
10.4.5.12 TypedArrayByteLength ( taRecord )
*/
function TypedArrayByteLength (taRecord) {
  function TypedArrayElementSize (O) {
    if (O instanceof Int8Array) { return 1; }
    if (O instanceof Uint8Array) { return 1; }
    if (O instanceof Uint8ClampedArray) { return 1; }
    if (O instanceof Int16Array) { return 2; }
    if (O instanceof Uint16Array) { return 2; }
    if (O instanceof Int32Array) { return 4; }
    if (O instanceof Uint32Array) { return 4; }
    if (O instanceof BigInt64Array) { return 8; }
    if (O instanceof BigUint64Array) { return 8; }
    if ("Float16Array" in window) {
      if (O instanceof Float16Array) { return 2; }
    }
    if (O instanceof Float32Array) { return 4; }
    if (O instanceof Float64Array) { return 8; }
  }
  return TypedArrayElementSize(taRecord["[[Object]]"])
    * taRecord["[[Object]]"].length;
}


/*
https://262.ecma-international.org/#sec-typedarraylength
10.4.5.12 TypedArrayLength ( taRecord )
https://tc39.es/ecma262/#sec-typedarraylength
10.4.5.13 TypedArrayLength ( taRecord )
*/
const TypedArrayLength = (taRecord) => taRecord["[[Object]]"]["length"];


/*
https://262.ecma-international.org/#sec-istypedarrayoutofbounds
10.4.5.13 IsTypedArrayOutOfBounds ( taRecord )
https://tc39.es/ecma262/#sec-istypedarrayoutofbounds
10.4.5.14 IsTypedArrayOutOfBounds ( taRecord )
TODO
*/


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/#sec-istypedarrayfixedlength
10.4.5.15 IsTypedArrayFixedLength ( O )
TODO
*/


/*
https://262.ecma-international.org/#sec-isvalidintegerindex
10.4.5.14 IsValidIntegerIndex ( O, index )
https://tc39.es/ecma262/#sec-isvalidintegerindex
10.4.5.16 IsValidIntegerIndex ( O, index )
*/
const IsValidIntegerIndex = (O, index) =>
  (typeof index === "number" && Number.isInteger(index)
    && 1/index !== -Infinity && index > -1 && index < O.length);



/*
https://262.ecma-international.org/#sec-typedarraygetelement
10.4.5.15 TypedArrayGetElement ( O, index )
https://tc39.es/ecma262/#sec-typedarraygetelement
10.4.5.17 TypedArrayGetElement ( O, index )
*/
const TypedArrayGetElement = (O, index) => O[index];


/*
https://262.ecma-international.org/#sec-typedarraysetelement
10.4.5.16 TypedArraySetElement ( O, index, value )
https://tc39.es/ecma262/#sec-typedarraysetelement
10.4.5.18 TypedArraySetElement ( O, index, value )
*/
function TypedArraySetElement (O, index, value) {
  let isValidIndex = (Number.isInteger(index) && index >-1 && index < O.length);
  let newValue = (O instanceof BigUint64Array || O instanceof BigInt64Array)
    ? BigInt(value) : Number(value);
  if (isValidIndex) { O[index] = newValue; }
}


/*
https://262.ecma-international.org/#sec-isarraybufferviewoutofbounds
10.4.5.17 IsArrayBufferViewOutOfBounds ( O )
https://tc39.es/ecma262/#sec-isarraybufferviewoutofbounds
10.4.5.19 IsArrayBufferViewOutOfBounds ( O )
TODO
*/


/*
https://262.ecma-international.org/#sec-modulenamespacecreate
10.4.6.12 ModuleNamespaceCreate ( module, exports )
https://tc39.es/ecma262/#sec-modulenamespacecreate
10.4.6.12 ModuleNamespaceCreate ( module, exports )
TODO
*/


/*
https://262.ecma-international.org/#sec-set-immutable-prototype
10.4.7.2 SetImmutablePrototype ( O, V )
https://tc39.es/ecma262/#sec-set-immutable-prototype
10.4.7.2 SetImmutablePrototype ( O, V )
*/
const SetImmutablePrototype = (O, V) => Object.is(Object.getPrototypeOf(O), V);


/*
https://262.ecma-international.org/#sec-validatenonrevokedproxy
10.5.14 ValidateNonRevokedProxy ( proxy )
https://tc39.es/ecma262/#sec-validatenonrevokedproxy
10.5.14 ValidateNonRevokedProxy ( proxy )
*/
function ValidateNonRevokedProxy (proxy) {
  if (proxy["[[ProxyTarget]]"] === null) {
    throw new TypeError(
      "ValidateNonRevokedProxy(); Error: ProxyTarget is null: ", proxy
    );
  }
  if (proxy["[[ProxyHandler]]"] === null) {
    throw new TypeError(
      "ValidateNonRevokedProxy(); Error: ProxyHandler is null: ", proxy
    );
  }
}


/*
https://262.ecma-international.org/#sec-proxycreate
10.5.15 ProxyCreate ( target, handler )
https://tc39.es/ecma262/#sec-proxycreate
10.5.15 ProxyCreate ( target, handler )
*/
const ProxyCreate = (target, handler) => new Proxy(target, handler);



/*
https://262.ecma-international.org/#sec-utf16encodecodepoint
11.1.1 Static Semantics: UTF16EncodeCodePoint ( cp )
https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-utf16encodecodepoint
11.1.1 Static Semantics: UTF16EncodeCodePoint ( cp )
*/
const UTF16EncodeCodePoint = (cp) => String.fromCodePoint([cp]);


/*
https://262.ecma-international.org/#sec-codepointstostring
11.1.2 Static Semantics: CodePointsToString ( text )
https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-codepointstostring
11.1.2 Static Semantics: CodePointsToString ( text )
*/
const CodePointsToString = (text) => String.fromCodePoint(...text);


/*
https://262.ecma-international.org/#sec-utf16decodesurrogatepair
11.1.3 Static Semantics: UTF16SurrogatePairToCodePoint ( lead, trail )
https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-utf16decodesurrogatepair
11.1.3 Static Semantics: UTF16SurrogatePairToCodePoint ( lead, trail )
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#utf-16_characters_unicode_code_points_and_grapheme_clusters
*/
function UTF16SurrogatePairToCodePoint(lead, trail) {
  let message = "UTF16SurrogatePairToCodePoint();";
  if (typeof lead !== "number") {
    throw new TypeError(message + " TypeError: lead is not number");
  }
  if (typeof trail !== "number") {
    throw new TypeError(message + " TypeError: trail is not number");
  }
  try {
    return String.fromCodePoint(lead, trail);
  } catch (e) {
    throw new RangeError(message + e);
  }
}


/*
https://262.ecma-international.org/#sec-codepointat
11.1.4 Static Semantics: CodePointAt ( string, position )
https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-codepointat
11.1.4 Static Semantics: CodePointAt ( string, position )
*/
const CodePointAt = (string, position) => string.codePointAt(position);


/*
https://262.ecma-international.org/#sec-stringtocodepoints
11.1.5 Static Semantics: StringToCodePoints ( string )
https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-stringtocodepoints
11.1.5 Static Semantics: StringToCodePoints ( string )
*/
const StringToCodePoints = (str) => Array.from(str, (v) => v.codePointAt(0) );


/*
https://262.ecma-international.org/#sec-parsetext
11.1.6 Static Semantics: ParseText ( sourceText, goalSymbol )
https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-parsetext
11.1.6 Static Semantics: ParseText ( sourceText, goalSymbol )
TODO
*/


/*
https://262.ecma-international.org/#sec-gettemplateobject
13.2.8.4 GetTemplateObject ( templateLiteral )
https://tc39.es/ecma262/#sec-gettemplateobject
13.2.8.4 GetTemplateObject ( templateLiteral )
TODO
*/


/*
https://262.ecma-international.org/#sec-keyforsymbol
20.4.5.1 KeyForSymbol ( sym )
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-keyforsymbol
20.4.5.1 KeyForSymbol ( sym )
*/
const KeyForSymbol = (sym) => Symbol.keyFor(sym);


/*
https://262.ecma-international.org/#sec-installerrorcause
20.5.8.1 InstallErrorCause ( O, options )
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-abstract-operations-for-error-objects
20.5.8.1 InstallErrorCause ( O, options )
*/
function InstallErrorCause (O, options) {
  if (options != null && typeof options === "object" && "cause" in options) {
    Object.defineProperty(O, "cause", {
      writable: true,
      enumerable: false,
      configurable: true,
      value: options["cause"]
    });
  }
}



/*
https://262.ecma-international.org/#sec-numbertobigint
21.2.1.1.1 NumberToBigInt ( number )
https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-numbertobigint
21.2.1.1.1 NumberToBigInt ( number )
*/
function NumberToBigInt (v) {
  if (typeof v !== "number" || !Number.isSafeInteger(v)) {
    throw new RangeError(
      "NumberToBigInt(); RangeError: number is not an integer"
    );
  }
  return v;
}

/*
https://262.ecma-international.org/#sec-trimstring
22.1.3.32.1 TrimString ( string, where )
https://tc39.es/ecma262/multipage/text-processing.html#sec-trimstring
22.1.3.32.1 TrimString ( string, where )
*/
function TrimString (string, where) {
  if (string == null) { throw new TypeError(
    Object.prototype.toString.call(argument) + " is not coercible to Object.");
  }
  let str = String(string);
  if (where === "START") { return str.trimStart(); }
  if (where === "END") { return str.trimEnd(); }
  if (where === "START+END") { return str.trim(); }
}


/*
https://262.ecma-international.org/#sec-createarrayiterator
23.1.5.1 CreateArrayIterator ( array, kind )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-createarrayiterator
23.1.5.1 CreateArrayIterator ( array, kind )
*/
function CreateArrayIterator (array, kind) {
  if (kind === "KEY") { return array.keys(); }
  if (kind === "VALUE") { return array.values(); }
  if (kind === "KEY+VALUE") { return array.entries(); }
}


/*
https://262.ecma-international.org/#sec-findviapredicate
23.1.3.12.1 FindViaPredicate ( O, len, direction, predicate, thisArg )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-findviapredicate
23.1.3.12.1 FindViaPredicate ( O, len, direction, predicate, thisArg )
*/
function FindViaPredicate (O, len, direction, predicate, thisArg) {
  if (typeof predicate !== "function") {
    throw new TypeError(
      "FindViaPredicate TypeError: predicate is not a function"
    );
  }
  if (direction === "ascending") {
    let i = 0;
    while (i < len) {
      if (Boolean(predicate(O[i], i))) {
        return ({"index": i, "value": O[i]});
      }
      i++;
    }
  } else {
    let i = len;
    while (i > -1) {
      if (Boolean(predicate(O[i], i))) {
        return ({"index": i, "value": O[i]});
      }
      i--;
    }
  }
  return ({"index": -1, "value": undefined});
}


/*
https://262.ecma-international.org/#sec-flattenintoarray
23.1.3.13.1 FlattenIntoArray ( target, source, sourceLen, start, depth [ , mapperFunction [ , thisArg ] ] )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-flattenintoarray
23.1.3.13.1 FlattenIntoArray ( target, source, sourceLen, start, depth [ , mapperFunction [ , thisArg ] ] )
*/
function FlattenIntoArray (
    target, source, sourceLen, start, depth, mapperFunction, thisArg
  ) {
  function _FlattenIntoArray(
      target, source, sourceLen, start, depth, mapperFunction, thisArg
    ) {
    function ToLength (argument) {
      /* ToIntegerOrInfinity begin */
      let v = +argument;
      if (1/v === Infinity || 1/v === -Infinity || v !== v) { v = 0; }
      let len = ((v === Infinity || v === -Infinity) ? v : Math.trunc(v));
      /* ToIntegerOrInfinity end */
      if (len < 0) { return 0; }
      return Math.min(len, Math.pow(2, 53) - 1);
    }
    let targetIndex = start;
    let sourceIndex = 0;
    while (sourceIndex < sourceLen) {
      let P = String(sourceIndex);
      if (P in source) {
        let element = source[P];
        if (typeof mapperFunction === "function" && !Array.isArray(element)) {
          element = Reflect.apply(
            mapperFunction, thisArg, [element, sourceIndex, source]
          );
        }
        let shouldFlatten = false;
        if (depth > 0) { shouldFlatten = Array.isArray(element); }
        if (shouldFlatten) {
          targetIndex = _FlattenIntoArray(
            target, element, ToLength(element.length), targetIndex,
              depth - 1, mapperFunction
          );
        } else {
          if (targetIndex >= (Math.pow(2, 53) - 1)) {
            throw new TypeError("targetIndex is greater than or equal to 2^53-1");
          }
          target[String(targetIndex)] = element;
          targetIndex++;
        }
      }
      sourceIndex++;
    }
    return targetIndex;
  }
  return _FlattenIntoArray(
    target, source, sourceLen, start, depth, mapperFunction, thisArg
  );
}


/*
https://262.ecma-international.org/#sec-sortindexedproperties
23.1.3.30.1 SortIndexedProperties ( obj, len, SortCompare, holes )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object
23.1.3.30.1 SortIndexedProperties ( obj, len, SortCompare, holes )
*/
function SortIndexedProperties (obj, len, SortCompare, holes) {
  const Type = (O) => (O === null ? "null" : typeof O);
  if (Type(obj) !== "object") {
    throw new TypeError("SortIndexedProperties(); TypeError: obj is not an object");
  }
  if (Type(SortCompare) !== "function") {
    throw new TypeError("SortIndexedProperties(); TypeError: SortCompare is not a function");
  }
  if (holes !== "SKIP-HOLES" && holes !== "READ-THROUGH-HOLES") {
    throw new Error(
      "SortIndexedProperties(); Error: holes has to be \"SKIP-HOLES\" or \"READ-THROUGH-HOLES\""
    );
  }
  let items = [];
  let k = 0;
  while (k < len) {
    let pK = String(k);
    if (holes === "SKIP-HOLES") {
      var kRead = pK in obj;
    } else {
      var kRead = true;
    }
    if (kRead) { items.push(obj[pK]); }
    k++;
  }
  items.sort(SortCompare);
  return items;
}



/*
https://262.ecma-international.org/#sec-comparearrayelements
23.1.3.30.2 CompareArrayElements ( x, y, comparefn )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object
23.1.3.30.2 CompareArrayElements ( x, y, comparator )
*/
function CompareArrayElements ( x, y, comparator  ) {
  if (x === undefined && y === undefined) { return 0; }
  if (x === undefined) { return 1; }
  if (y === undefined) { return 0; }
  if (comparator  !== undefined) {
    let v = Number(comparator (x, y));
    if (v !== v) { return 0; }
    return v;
  }
  let xString = String(x);
  let yString = String(y);
  if (xString < yString) { return -1; }
  if (yString < xString) { return 1; }
  return 0;
}


/*
https://262.ecma-international.org/#typedarray-species-create
23.2.4.1 TypedArraySpeciesCreate ( exemplar, argumentList )
https://tc39.es/ecma262/multipage/indexed-collections.html#typedarray-species-create
23.2.4.1 TypedArraySpeciesCreate ( exemplar, argumentList )
*/
const TypedArraySpeciesCreate = (exemplar, argumentList) =>
  Reflect.construct(Object.getPrototypeOf(exemplar).constructor, argumentList);


/*
https://262.ecma-international.org/#sec-typedarraycreatefromconstructor
23.2.4.2 TypedArrayCreateFromConstructor ( constructor, argumentList )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarraycreatefromconstructor
23.2.4.2 TypedArrayCreateFromConstructor ( constructor, argumentList )
*/
const TypedArrayCreateFromConstructor = (constructor, argumentList) =>
  Reflect.construct(constructor, argumentList);


/*
https://262.ecma-international.org/#sec-typedarray-create-same-type
23.2.4.3 TypedArrayCreateSameType ( exemplar, argumentList )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-create-same-type
23.2.4.3 TypedArrayCreateSameType ( exemplar, argumentList )
*/
const TypedArrayCreateSameType = (exemplar, argumentList) =>
  Reflect.construct(Object.getPrototypeOf(exemplar).constructor, argumentList);


/*
https://262.ecma-international.org/#sec-validatetypedarray
23.2.4.4 ValidateTypedArray ( O, order )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-validatetypedarray
23.2.4.4 ValidateTypedArray ( O, order )
*/
const ValidateTypedArray = (O, order) =>(
  O instanceof Int8Array
    || O instanceof Uint8Array
    || O instanceof Uint8ClampedArray
    || O instanceof Int16Array
    || O instanceof Uint16Array
    || O instanceof Int32Array
    || O instanceof Uint32Array
    || ("Float16Array" in window ? O instanceof Float16Array : false)
    || O instanceof Float32Array
    || O instanceof Float64Array
    || O instanceof BigInt64Array
    || O instanceof BigUint64Array
);


/*
https://262.ecma-international.org/#sec-typedarrayelementsize
23.2.4.5 TypedArrayElementSize ( O )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-abstract-operations-for-typedarray-objects
table: https://tc39.es/ecma262/multipage/indexed-collections.html#table-the-typedarray-constructorst
23.2.4.5 TypedArrayElementSize ( O )
*/
function TypedArrayElementSize (O) {
  if (O instanceof Int8Array) { return 1; }
  if (O instanceof Uint8Array) { return 1; }
  if (O instanceof Uint8ClampedArray) { return 1; }
  if (O instanceof Int16Array) { return 2; }
  if (O instanceof Uint16Array) { return 2; }
  if (O instanceof Int32Array) { return 4; }
  if (O instanceof Uint32Array) { return 4; }
  if (O instanceof BigInt64Array) { return 8; }
  if (O instanceof BigUint64Array) { return 8; }
  if ("Float16Array" in window) {
    if (O instanceof Float16Array) { return 2; }
  }
  if (O instanceof Float32Array) { return 4; }
  if (O instanceof Float64Array) { return 8; }
}


/*
https://262.ecma-international.org/#sec-typedarrayelementtype
23.2.4.6 TypedArrayElementType ( O )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarrayelementtype
table: https://tc39.es/ecma262/multipage/indexed-collections.html#table-the-typedarray-constructorst
23.2.4.6 TypedArrayElementType ( O )
*/
function TypedArrayElementType (O) {
  if (O instanceof Int8Array) { return "INT8"; }
  if (O instanceof Uint8Array) { return "UINT8"; }
  if (O instanceof Uint8ClampedArray) { return "UINT8CLAMPED"; }
  if (O instanceof Int16Array) { return "INT16"; }
  if (O instanceof Uint16Array) { return "UINT16"; }
  if (O instanceof Int32Array) { return "INT32"; }
  if (O instanceof Uint32Array) { return "UINT32"; }
  if (O instanceof BigInt64Array) { return "BIGINT64"; }
  if (O instanceof BigUint64Array) { return "BIGUINT64"; }
  if ("Float16Array" in window) {
    if (O instanceof Float16Array) { return "FLOAT16"; }
  }
  if (O instanceof Float32Array) { return "FLOAT32"; }
  if (O instanceof Float64Array) { return "FLOAT64"; }
}


/*
https://262.ecma-international.org/#sec-add-entries-from-iterable
24.1.1.2 AddEntriesFromIterable ( target, iterable, adder )
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-add-entries-from-iterable
24.1.1.2 AddEntriesFromIterable ( target, iterable, adder )
*/
function AddEntriesFromIterable (target, iterable, adder) {
  for (let item of iterable) { Reflect.apply(adder, target, item); }
}


/*
https://262.ecma-international.org/#sec-comparetypedarrayelements
23.2.4.7 CompareTypedArrayElements ( x, y, comparefn )
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarrayelementtype
23.2.4.7 CompareTypedArrayElements ( x, y, comparator )
*/
function CompareTypedArrayElements (x, y, comparator) {
  const SameValue = Object.is ||
    ((x, y) => ((x === y) ? (x !== 0 || 1/x === 1/y) : (x !== x && y !== y)));
  function Call (F, V, argumentsList = []) {
    if (!Array.isArray(argumentsList)) {
      throw new TypeError("argumentsList should be an array: ", argumentsList);
    }
    return Function.prototype.apply.call(F, V, argumentsList);
  }
  let tx = typeof x, ty = typeof y;
  if (!((tx === "number" && ty === "number")
    || (tx === "bigint" && ty== "bigint"))) {
    throw new TypeError("x and y have to be same type: BigInt or a Number");
  }
  if (typeof compareFn !== "function" && typeof compareFn !== "undefined") {
    throw new TypeError("compareFN has to be a function or undefined");
  }
  if (typeof compareFn !== "undefined") {
    let v = +(Call(compareFn, undefined, [x, y]));
    if (v !== v) {return 0; }
    return v;
  }
  if (x !== x && y !== y) { return 0; }
  if (x !== x) { return 1; }
  if (y !== y) { return -1; }
  if (x < y) { return -1; }
  if (x > y) { return 1; }
  if (SameValue(x, -0) && SameValue(y, 0)) { return -1; }
  if (SameValue(x, 0) && SameValue(y, -0)) { return 1; }
  return 0;
}


/*
https://262.ecma-international.org/#sec-createmapiterator
24.1.5.1 CreateMapIterator ( map, kind )
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-createmapiterator
24.1.5.1 CreateMapIterator ( map, kind )
*/
function CreateMapIterator (map, kind) {
  if (kind === "KEY") { return map.keys(); }
  if (kind === "VALUE") { return map.values(); }
  if (kind === "KEY+VALUE") { return map.entries(); }
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-getsetrecord
24.2.1.2 GetSetRecord ( obj )
*/
function GetSetRecord (obj) {
  function ToIntegerOrInfinity (argument) {
    let v = Math.trunc(+argument);
    return (v !== v || v === 0) ? 0 : v;
  }
  function GetMethod (O, P) {
    let func = O[P];
    if (func == null) { return undefined; }
    if (typeof func !== "function") {
      throw new TypeError("Method not callable: " + P);
    }
    return func;
  }
  if ((obj == null || typeof obj !== "object")) {
    throw new TypeError(
      "GetSetRecord(); TypeError: obj is not an object"
    );
  }
  let numSize = +obj["size"];
  if (numSize !== numSize) {
    throw new TypeError("GetSetRecord(); TypeError: numSize is NaN");
  }
  let intSize = ToIntegerOrInfinity(numSize);
  if (intSize < 0) {
    throw new TypeError("GetSetRecord(); TypeError: intSize is less then 0");
  }
  return{
    "[[SetObject]]": obj,
    "[[Size]]": intSize,
    "[[Has]]": GetMethod(obj, "has"),
    "[[Keys]]": GetMethod(obj, "keys")
  };
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/#sec-setdatahas
24.2.1.3 SetDataHas ( setData, value )
*/
function SetDataHas (setData, value) {
  let i = 0;
  for (let item of setData) {
    if (item != null && (item === value || (item !== item && value !== value))){
      return true;
    }
    i++;
  }
  return false;
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-setdataindex
24.2.1.4 SetDataIndex ( setData, value )
*/
function SetDataIndex (setData, value) {
  let i = 0;
  for (let item of setData) {
    if (item != null && (item === value || (item !== item && value !== value))){
      return i;
    }
    i++;
  }
  return "NOT-FOUND";
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-setdatasize
24.2.1.5 SetDataSize ( setData )
*/
function SetDataSize (setData) {
  let i = 0;
  for (let item of setData) {
    if (item != null) { i++; }
  }
  return i;
}


/*
https://262.ecma-international.org/#sec-createsetiterator
24.2.5.1 CreateSetIterator ( set, kind )
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-createsetiterator
24.2.6.1 CreateSetIterator ( set, kind )
*/
function CreateSetIterator (seto, kind) {
  if (kind === "KEY") { return seto.keys(); }
  if (kind === "VALUE") { return seto.values(); }
  if (kind === "KEY+VALUE") { return seto.entries(); }
}


/*
https://262.ecma-international.org/
NONE
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-canonicalizekeyedcollectionkey
24.5.1 CanonicalizeKeyedCollectionKey ( key )
*/
const CanonicalizeKeyedCollectionKey =
  (key) => ((1/key === -Infinity) ? 0 : key);


/*
https://262.ecma-international.org/#sec-weakref-abstract-operations
26.1.4.1 WeakRefDeref ( weakRef )
https://tc39.es/ecma262/multipage/managing-memory.html#sec-weakrefderef
26.1.4.1 WeakRefDeref ( weakRef )
*/
const WeakRefDeref = (weakRef) => void(weakRef.deref());


/*
https://262.ecma-international.org/#sec-createasyncfromsynciterator
27.1.4.1 CreateAsyncFromSyncIterator ( syncIteratorRecord )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-createasyncfromsynciterator
27.1.6.1 CreateAsyncFromSyncIterator ( syncIteratorRecord )
TODO
*/
function CreateAsyncFromSyncIterator(syncIteratorRecord) {
  async function* createAsyncIterable(syncIterable) {
    for (let item of syncIterable) { yield item; }
  }
  let asyncIterator =
    createAsyncIterable(syncIteratorRecord["[[Iterator]]"]);
  return {
    "[[Iterator]]": asyncIterator,
    "[[NextMethod]]": asyncIterator.next,
    "[[Done]]": false
  };
}


/*
https://262.ecma-international.org/#sec-asyncfromsynciteratorcontinuation
27.1.4.4 AsyncFromSyncIteratorContinuation ( result, promiseCapability )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-asyncfromsynciteratorcontinuation
27.1.6.4 AsyncFromSyncIteratorContinuation ( result, promiseCapability, syncIteratorRecord, closeOnRejection )
TODO
*/


/*
https://262.ecma-international.org/#sec-createresolvingfunctions
27.2.1.3 CreateResolvingFunctions ( promise )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-createresolvingfunctions
27.2.1.3 CreateResolvingFunctions ( promise )
TODO
*/


/*
https://262.ecma-international.org/#sec-fulfillpromise
27.2.1.4 FulfillPromise ( promise, value )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-fulfillpromise
27.2.1.4 FulfillPromise ( promise, value )
TODO
*/


/*
https://262.ecma-international.org/#sec-newpromisecapability
27.2.1.5 NewPromiseCapability ( C )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-newpromisecapability
27.2.1.5 NewPromiseCapability ( C )
TODO
*/


/*
https://262.ecma-international.org/#sec-ispromise
27.2.1.6 IsPromise ( x )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-ispromise
27.2.1.6 IsPromise ( x )
*/
const IsPromise = (x) => (x instanceof Promise ||
  (x != null && typeof x === "object"
    && typeof x.then === "function" && typeof x.catch  === "function")
);


/*
https://262.ecma-international.org/#sec-rejectpromise
27.2.1.7 RejectPromise ( promise, reason )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-rejectpromise
27.2.1.7 RejectPromise ( promise, reason )
TODO
*/
// const RejectPromise = (promise, reason) => void(Promise.reject(reason));
// const RejectPromise = (promise, reason) => void(promise.reject(reason));


/*
https://262.ecma-international.org/#sec-triggerpromisereactions
27.2.1.8 TriggerPromiseReactions ( reactions, argument )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-triggerpromisereactions
27.2.1.8 TriggerPromiseReactions ( reactions, argument )
TODO
*/


/*
https://262.ecma-international.org/#sec-host-promise-rejection-tracker
27.2.1.9 HostPromiseRejectionTracker ( promise, operation )
https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-host-promise-rejection-tracker
27.2.1.9 HostPromiseRejectionTracker ( promise, operation )
TODO
*/


/*
https://262.ecma-international.org/#sec-createhtml
B.2.2.2.1 CreateHTML ( string, tag, attribute, value )
https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-createhtml
B.2.2.2.1 CreateHTML ( string, tag, attribute, value )
*/
function CreateHTML (string, tag, attribute, value) {
  if (typeof string !== "string") { throw new TypeError(
    Object.prototype.toString.call(string) + " has a to be a String.");
  }
  let S = String(string);
  let res = "<" + tag;
  if (attribute != null && attribute !== "") {
    let V = String(value).replace(/\x22/g, "&quot;");
    res += " " + attribute + "=\"" + V + "\"";
  }
  return res + ">" + S + "</" + tag + ">";
}


/** object header **/


const VERSION = "Zephyr v1.0.1 dev";


/* zephyr.noConflict(): celestra object */
function noConflict () { window.ES = zephyr.__prevES__; return zephyr; }


/* NONE */
const IsObject = (x) => (x != null && typeof x === "object");


const zephyr = {
  /** object header **/
  VERSION,
  noConflict,
  IsObject,
  /** API **/
  Completion,
  Type,
  StringIndexOf,
  StringLastIndexOf,
  NormalCompletion,
  ThrowCompletion,
  ReturnCompletion,
  UpdateEmpty,
  /* IsAccessorDescriptor, */
  /* IsDataDescriptor, */
  /* IsGenericDescriptor, */
  /* FromPropertyDescriptor, */
  /* ToPropertyDescriptor, */
  /* CompletePropertyDescriptor, */
  ToPrimitive,
  OrdinaryToPrimitive,
  ToBoolean,
  ToNumeric,
  ToNumber,
  StringToNumber,
  ToIntegerOrInfinity,
  ToInt32,
  ToUint32,
  ToInt16,
  ToUint16,
  ToInt8,
  ToUint8,
  ToUint8Clamp,
  ToBigInt,
  StringToBigInt,
  ToBigInt64,
  ToBigUint64,
  ToString,
  ToObject,
  ToPropertyKey,
  ToLength,
  CanonicalNumericIndexString,
  RequireObjectCoercible,
  ToIndex,
  IsArray,
  IsCallable,
  IsConstructor,
  IsExtensible,
  IsIntegralNumber,
  IsRegExp,
  IsPropertyKey,
  IsStringWellFormedUnicode,
  SameType,
  SameValue,
  SameValueZero,
  SameValueNonNumber,
  IsLessThan,
  IsLooselyEqual,
  IsStrictlyEqual,
  MakeBasicObject,
  Get,
  GetV,
  Set,
  CreateDataProperty,
  CreateDataPropertyOrThrow,
  CreateNonEnumerableDataPropertyOrThrow,
  DefinePropertyOrThrow,
  DeletePropertyOrThrow,
  GetMethod,
  HasProperty,
  HasOwnProperty,
  Call,
  Construct,
  SetIntegrityLevel,
  TestIntegrityLevel,
  CreateArrayFromList,
  LengthOfArrayLike,
  CreateListFromArrayLike,
  Invoke,
  OrdinaryHasInstance,
  SpeciesConstructor,
  EnumerableOwnProperties,
  /* GetFunctionRealm, */
  CopyDataProperties,
  /* PrivateElementFind, */
  /* PrivateFieldAdd, */
  /* PrivateMethodOrAccessorAdd, */
  /* PrivateGet, */
  /* PrivateSet, */
  /* DefineField, */
  /* InitializeInstanceElements, */
  AddValueToKeyedGroup,
  GroupBy,
  SetterThatIgnoresPrototypeProperties,
  GetIteratorDirect,
  GetIteratorFromMethod,
  GetIterator,
  GetIteratorFlattenable,
  IteratorNext,
  IteratorComplete,
  IteratorValue,
  IteratorStep,
  IteratorStepValue,
  IteratorClose,
  IfAbruptCloseIterator,
  AsyncIteratorClose,
  CreateIteratorResultObject,
  CreateListIteratorRecord,
  IteratorToList,
  /* ClearKeptObjects, */
  /* AddToKeptObjects, */
  /* CleanupFinalizationRegistry, */
  CanBeHeldWeakly,
  OrdinaryObjectCreate,
  OrdinaryCreateFromConstructor,
  GetPrototypeFromConstructor,
  RequireInternalSlot,
  OrdinaryFunctionCreate,
  /* AddRestrictedFunctionProperties, */
  MakeConstructor,
  /* MakeClassConstructor, */
  MakeMethod,
  DefineMethodProperty,
  SetFunctionName,
  SetFunctionLength,
  /* FunctionDeclarationInstantiation, */
  /* BuiltinCallOrConstruct, */
  /* CreateBuiltinFunction, */
  /* BoundFunctionCreate, */
  ArrayCreate,
  ArraySpeciesCreate,
  ArraySetLength,
  StringCreate,
  StringGetOwnProperty,
  CreateUnmappedArgumentsObject,
  /* CreateMappedArgumentsObject, */
  /* MakeTypedArrayWithBufferWitnessRecord, */
  TypedArrayCreate,
  TypedArrayByteLength,
  TypedArrayLength,
  /* IsTypedArrayOutOfBounds, */
  /* IsTypedArrayFixedLength, */
  IsValidIntegerIndex,
  TypedArrayGetElement,
  TypedArraySetElement,
  /* IsArrayBufferViewOutOfBounds, */
  /* ModuleNamespaceCreate, */
  SetImmutablePrototype,
  ValidateNonRevokedProxy,
  ProxyCreate,
  UTF16EncodeCodePoint,
  CodePointsToString,
  UTF16SurrogatePairToCodePoint,
  CodePointAt,
  StringToCodePoints,
  /* ParseText, */
  /* GetTemplateObject, */
  KeyForSymbol,
  InstallErrorCause,
  NumberToBigInt,
  TrimString,
  CreateArrayIterator,
  FindViaPredicate,
  FlattenIntoArray,
  SortIndexedProperties,
  CompareArrayElements,
  TypedArraySpeciesCreate,
  TypedArrayCreateFromConstructor,
  TypedArrayCreateSameType,
  ValidateTypedArray,
  TypedArrayElementSize,
  TypedArrayElementType,
  AddEntriesFromIterable,
  CompareTypedArrayElements,
  CreateMapIterator,
  GetSetRecord,
  SetDataHas,
  SetDataIndex,
  SetDataSize,
  CreateSetIterator,
  CanonicalizeKeyedCollectionKey,
  WeakRefDeref,
  CreateAsyncFromSyncIterator,
  /* AsyncFromSyncIteratorContinuation, */
  /* CreateResolvingFunctions, */
  /* FulfillPromise, */
  /* NewPromiseCapability, */
  IsPromise,
  /* RejectPromise, */
  /* TriggerPromiseReactions, */
  /* HostPromiseRejectionTracker, */
  CreateHTML
};


if (typeof window !== "undefined") {
  zephyr.__prevES__ = window.ES;
  window.zephyr = zephyr;
  window.ES = zephyr;
}


}(window, document));
