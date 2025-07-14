
# Zephyr

## Download

__Collection of the ECMAScript abstract methods as standalone Javascript functions and a library with zero dependencies.__

Latest version: 1.0.1

Date: 2025-07-14T18:49:58.592Z

__Tested on these browsers:__

- Windows Firefox
- Windows Chrome
- Windows Edge
- iOS Safari
- iOS Firefox
- iOS Chrome
- iOS Edge
- Android Firefox
- Android Chrome
- Android Samsung Internet
- Android Edge

The functions are available in the `zephyr` and/or `ES` object.


### Editions

Edition|Filename
-------|--------
developer|__zephyr.dev.js__
minified|__zephyr.min.js__
ES6 module|__zephyr.esm.js__
testpages|__testsuite-dev.html__<BR>__testsuite-min.html__<BR>__testsuite-esm1.html__<BR>__testsuite-esm2.html__

DEV and MIN editions: If the `ES` global variable is used before the loading of the library, then the value of the variable is saved and you can restore with the `noConflict();` function.


### Github pages

version|page link
-------|--------
Stable|__https://github.com/Serrin/Zephyr__
Beta|__https://github.com/Serrin/Zephyr-beta__


### How to import the ESM edition

````javascript
<script type="module">

// import the defaultExport object
import defaultExport from "./zephyr.esm.js";
window.zephyr = defaultExport;
window.ES = defaultExport;

// import with default with name
import { default as zephyr } from "./zephyr.esm.js";
window.zephyr = zephyr;
window.ES = zephyr;

// import all into a new zephyr object
import * as zephyr from "./zephyr.esm.js";
window.zephyr = zephyr;
window.ES = zephyr;

// import some functions
import { Type, HasProperty } from "./zephyr.esm.js";
window.Type = Type;
window.HasProperty = HasProperty;

</script>
````

__Another way to import__


````
<script type="module"> import "./zephyr.min.js"; </script>
````


## API documentation


Function|262|TC39|Status
--------|--------------|--------------|------
VERSION;|||__DONE__
noConflict();|||__DONE__
IsObject(value);|||__DONE__
Completion();|[Link](https://262.ecma-international.org/#sec-completion-ao)|[Link](https://tc39.es/ecma262/multipage/notational-conventions.html#sec-runtime-semantics)|__DONE__
Type();|[Link](https://262.ecma-international.org/#sec-ecmascript-language-types)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-data-types-and-values)|__DONE__
StringIndexOf();|[Link](https://262.ecma-international.org/#sec-stringindexof)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringindexof)|__DONE__
StringLastIndexOf();|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-stringlastindexof)||__DONE__
NormalCompletion();|[Link](https://262.ecma-international.org/#sec-normalcompletion)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-normalcompletion)|__DONE__
ThrowCompletion();|[Link](https://262.ecma-international.org/#sec-throwcompletion)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-throwcompletion)|__DONE__
ReturnCompletion();||[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-returncompletion)|__DONE__
UpdateEmpty();|[Link](https://262.ecma-international.org/#sec-updateempty)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-updateempty)|__DONE__
IsAccessorDescriptor();|[Link](https://262.ecma-international.org/#sec-isaccessordescriptor)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isaccessordescriptor)|TODO
IsDataDescriptor();|[Link](https://262.ecma-international.org/#sec-isdatadescriptor)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isdatadescriptor)|TODO
IsGenericDescriptor();|[Link](https://262.ecma-international.org/#sec-isgenericdescriptor)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-isdatadescriptor)|TODO
FromPropertyDescriptor();|[Link](https://262.ecma-international.org/#sec-frompropertydescriptor)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-frompropertydescriptor)|TODO
ToPropertyDescriptor();|[Link](https://262.ecma-international.org/#sec-topropertydescriptor)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-topropertydescriptor)|TODO
CompletePropertyDescriptor();|[Link](https://262.ecma-international.org/#sec-completepropertydescriptor)|[Link](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-completepropertydescriptor)|TODO
ToPrimitive();|[Link](https://262.ecma-international.org/#sec-toprimitive)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive)|__DONE__
OrdinaryToPrimitive();|[Link](https://262.ecma-international.org/#sec-ordinarytoprimitive)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ordinarytoprimitive)|__DONE__
ToBoolean();|[Link](https://262.ecma-international.org/#sec-toboolean)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toboolean)|__DONE__
ToNumeric();|[Link](https://262.ecma-international.org/#sec-tonumeric)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumeric)|__DONE__
ToNumber();|[Link](https://262.ecma-international.org/#sec-tonumber)|[Link](https://tc39.es/ecma262/#sec-tonumber)|__DONE__
StringToNumber();|[Link](https://262.ecma-international.org/#sec-tonumber-applied-to-the-string-type)|[Link](https://tc39.es/ecma262/#sec-stringtonumber)|__DONE__
ToIntegerOrInfinity();|[Link](https://262.ecma-international.org/#sec-tointegerorinfinity)|[Link](https://tc39.es/ecma262/#sec-tointegerorinfinity)|__DONE__
ToInt32();|[Link](https://262.ecma-international.org/#sec-toint32)|[Link](https://tc39.es/ecma262/#sec-toint32)|__DONE__
ToUint32();|[Link](https://262.ecma-international.org/#sec-touint32)|[Link](https://tc39.es/ecma262/#sec-touint32)|__DONE__
ToInt16();|[Link](https://262.ecma-international.org/#sec-toint16)|[Link](https://tc39.es/ecma262/#sec-toint16)|__DONE__
ToUint16();|[Link](https://262.ecma-international.org/#sec-touint16)|[Link](https://tc39.es/ecma262/#sec-touint16)|__DONE__
ToInt8();|[Link](https://262.ecma-international.org/#sec-toint8)|[Link](https://tc39.es/ecma262/#sec-toint8)|__DONE__
ToUint8();|[Link](https://262.ecma-international.org/#sec-touint8)|[Link](https://tc39.es/ecma262/#sec-touint8)|__DONE__
ToUint8Clamp();|[Link](https://262.ecma-international.org/#sec-touint8clamp)|[Link](https://tc39.es/ecma262/#sec-touint8clamp)|__DONE__
ToBigInt();|[Link](https://262.ecma-international.org/#sec-tobigint)|[Link](https://tc39.es/ecma262/#sec-tobigint)|__DONE__
StringToBigInt();|[Link](https://262.ecma-international.org/#sec-stringtobigint)|[Link](https://tc39.es/ecma262/#sec-stringtobigint)|__DONE__
ToBigInt64();|[Link](https://262.ecma-international.org/#sec-tobigint64)|[Link](https://tc39.es/ecma262/#sec-tobigint64)|__DONE__
ToBigUint64();|[Link](https://262.ecma-international.org/#sec-tobiguint64)|[Link](https://tc39.es/ecma262/#sec-tobiguint64)|__DONE__
ToString();|[Link](https://262.ecma-international.org/#sec-tostring)|[Link](https://tc39.es/ecma262/#sec-tostring)|__DONE__
ToObject();|[Link](https://262.ecma-international.org/#sec-toobject)|[Link](https://tc39.es/ecma262/#sec-toobject)|__DONE__
ToPropertyKey();|[Link](https://262.ecma-international.org/#sec-topropertykey)|[Link](https://tc39.es/ecma262/#sec-topropertykey)|__DONE__
ToLength();|[Link](https://262.ecma-international.org/#sec-tolength)|[Link](https://tc39.es/ecma262/#sec-tolength)|__DONE__
CanonicalNumericIndexString();|[Link](https://262.ecma-international.org/#sec-canonicalnumericindexstring)|[Link](https://tc39.es/ecma262/#sec-canonicalnumericindexstring)|__DONE__
RequireObjectCoercible();|[Link](https://262.ecma-international.org/#sec-requireobjectcoercible)||__DONE__
ToIndex();|[Link](https://262.ecma-international.org/#sec-toindex)|[Link](https://tc39.es/ecma262/#sec-toindex)|__DONE__
IsArray();|[Link](https://262.ecma-international.org/#sec-isarray)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isarray)|__DONE__
IsCallable();|[Link](https://262.ecma-international.org/#sec-iscallable)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iscallable)|__DONE__
IsConstructor();|[Link](https://262.ecma-international.org/#sec-isconstructor)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isconstructor)|__DONE__
IsExtensible();|[Link](https://262.ecma-international.org/#sec-isextensible-o)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isextensible-o)|__DONE__
IsIntegralNumber();|[Link](https://262.ecma-international.org/#sec-isintegralnumber)||__DONE__
IsRegExp();|[Link](https://262.ecma-international.org/#sec-isregexp)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isregexp)|__DONE__
IsPropertyKey();|[Link](https://262.ecma-international.org/#sec-ispropertykey)||__DONE__
IsStringWellFormedUnicode();|[Link](https://262.ecma-international.org/#sec-isstringwellformedunicode)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isstringwellformedunicode)|__DONE__
SameType();||[Link](https://tc39.es/ecma262/#sec-sametype)|__DONE__
SameValue();|[Link](https://262.ecma-international.org/#sec-samevalue)|[Link](https://tc39.es/ecma262/#sec-samevalue)|__DONE__
SameValueZero();|[Link](https://262.ecma-international.org/#sec-samevaluezero)|[Link](https://tc39.es/ecma262/#sec-samevaluezero)|__DONE__
SameValueNonNumber();|[Link](https://262.ecma-international.org/#sec-samevaluenonnumber)|[Link](https://tc39.es/ecma262/#sec-samevaluenonnumber)|__DONE__
IsLessThan();|[Link](https://262.ecma-international.org/#sec-islessthan)|[Link](https://tc39.es/ecma262/#sec-islessthan)|__DONE__
IsLooselyEqual();|[Link](https://262.ecma-international.org/#sec-islooselyequal)|[Link](https://tc39.es/ecma262/#sec-islooselyequal)|__DONE__
IsStrictlyEqual();|[Link](https://262.ecma-international.org/#sec-isstrictlyequal)|[Link](https://tc39.es/ecma262/#sec-isstrictlyequal)|__DONE__
MakeBasicObject();|[Link](https://262.ecma-international.org/#sec-operations-on-objects)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-makebasicobject)|__DONE__
Get();|[Link](https://262.ecma-international.org/#sec-get-o-p)|[Link](https://tc39.es/ecma262/#sec-get-o-p)|__DONE__
GetV();|[Link](https://262.ecma-international.org/#sec-getv)|[Link](https://tc39.es/ecma262/#sec-getv)|__DONE__
Set();|[Link](https://262.ecma-international.org/#sec-set-o-p-v-throw)|[Link](https://tc39.es/ecma262/#sec-set-o-p-v-throw)|__DONE__
CreateDataProperty();|[Link](https://262.ecma-international.org/#sec-createdataproperty)|[Link](https://tc39.es/ecma262/#sec-createdataproperty)|__DONE__
CreateDataPropertyOrThrow();|[Link](https://262.ecma-international.org/#sec-createdatapropertyorthrow)|[Link](https://tc39.es/ecma262/#sec-createdatapropertyorthrow)|__DONE__
CreateNonEnumerableDataPropertyOrThrow();|[Link](https://262.ecma-international.org/#sec-createnonenumerabledatapropertyorthrow)|[Link](https://tc39.es/ecma262/#sec-createnonenumerabledatapropertyorthrow)|__DONE__
DefinePropertyOrThrow();|[Link](https://262.ecma-international.org/#sec-definepropertyorthrow)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-definepropertyorthrow)|__DONE__
DeletePropertyOrThrow();|[Link](https://262.ecma-international.org/#sec-deletepropertyorthrow)|[Link](https://tc39.es/ecma262/#sec-definepropertyorthrow)|__DONE__
GetMethod();|[Link](https://262.ecma-international.org/#sec-getmethod)|[Link](https://tc39.es/ecma262/#sec-getmethod)|__DONE__
HasProperty();|[Link](https://262.ecma-international.org/#sec-hasproperty)|[Link](https://tc39.es/ecma262/#sec-hasproperty)|__DONE__
HasOwnProperty();|[Link](https://262.ecma-international.org/#sec-hasownproperty)|[Link](https://tc39.es/ecma262/#sec-hasownproperty)|__DONE__
Call();|[Link](https://262.ecma-international.org/#sec-call)|[Link](https://tc39.es/ecma262/#sec-call)|__DONE__
Construct();|[Link](https://262.ecma-international.org/#sec-construct)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-construct)|__DONE__
SetIntegrityLevel();|[Link](https://262.ecma-international.org/#sec-setintegritylevel)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-setintegritylevel)|__DONE__
TestIntegrityLevel();|[Link](https://262.ecma-international.org/#sec-testintegritylevel)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-testintegritylevel)|__DONE__
CreateArrayFromList();|[Link](https://262.ecma-international.org/#sec-createarrayfromlist)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createarrayfromlist)|__DONE__
LengthOfArrayLike();|[Link](https://262.ecma-international.org/#sec-lengthofarraylike)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-lengthofarraylike)|__DONE__
CreateListFromArrayLike();|[Link](https://262.ecma-international.org/#sec-createlistfromarraylike)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createlistfromarraylike)|__DONE__
Invoke();|[Link](https://262.ecma-international.org/#sec-invoke)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-invoke)|__DONE__
OrdinaryHasInstance();|[Link](https://262.ecma-international.org/#sec-ordinaryhasinstance)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ordinaryhasinstance)|__DONE__
SpeciesConstructor();|[Link](https://262.ecma-international.org/#sec-speciesconstructor)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-speciesconstructor)|__DONE__
EnumerableOwnProperties();|[Link](https://262.ecma-international.org/#sec-enumerableownproperties)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-enumerableownproperties)|__DONE__
GetFunctionRealm();|[Link](https://262.ecma-international.org/#sec-getfunctionrealm)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getfunctionrealm)|TODO
CopyDataProperties();|[Link](https://262.ecma-international.org/#sec-copydataproperties)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-copydataproperties)|__DONE__
PrivateElementFind();|[Link](https://262.ecma-international.org/#sec-privateelementfind)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privateelementfind)|TODO
PrivateFieldAdd();|[Link](https://262.ecma-international.org/#sec-privatefieldadd)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privatefieldadd)|TODO
PrivateMethodOrAccessorAdd();|[Link](https://262.ecma-international.org/#sec-privatemethodoraccessoradd)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privatemethodoraccessoradd)|TODO
HostEnsureCanAddPrivateElement();|[Link](https://262.ecma-international.org/#sec-hostensurecanaddprivateelement)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-hostensurecanaddprivateelement)|TODO
PrivateGet();|[Link](https://262.ecma-international.org/#sec-privateget)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privateget)|TODO
PrivateSet();|[Link](https://262.ecma-international.org/#sec-privateset)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-privateset)|TODO
DefineField();|[Link](https://262.ecma-international.org/#sec-definefield)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-definefield)|TODO
InitializeInstanceElements();|[Link](https://262.ecma-international.org/#sec-initializeinstanceelements)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-initializeinstanceelements)|TODO
AddValueToKeyedGroup();|[Link](https://262.ecma-international.org/#sec-add-value-to-keyed-group)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-add-value-to-keyed-group)|__DONE__
GroupBy();|[Link](https://262.ecma-international.org/#sec-groupby)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-groupby)|__DONE__
SetterThatIgnoresPrototypeProperties();||[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-SetterThatIgnoresPrototypeProperties)|__DONE__
GetIteratorDirect();||[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiteratordirect)|__DONE__
GetIteratorFromMethod();|[Link](https://262.ecma-international.org/#sec-getiteratorfrommethod)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiteratorfrommethod)|__DONE__
GetIterator();|[Link](https://262.ecma-international.org/#sec-getiterator)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiterator)|__DONE__
GetIteratorFlattenable();||[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-getiteratorflattenable)|__DONE__
IteratorNext();|[Link](https://262.ecma-international.org/#sec-iteratornext)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratornext)|__DONE__
IteratorComplete();|[Link](https://262.ecma-international.org/#sec-iteratorcomplete)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorcomplete)|__DONE__
IteratorValue();|[Link](https://262.ecma-international.org/#sec-iteratorvalue)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorvalue)|__DONE__
IteratorStep();|[Link](https://262.ecma-international.org/#sec-iteratorstep)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorstep)|__DONE__
IteratorStepValue();|[Link](https://262.ecma-international.org/#sec-iteratorstepvalue)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorstepvalue)|__DONE__
IteratorClose();|[Link](https://262.ecma-international.org/#sec-iteratorclose)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratorclose)|__DONE__
IfAbruptCloseIterator();|[Link](https://262.ecma-international.org/#sec-ifabruptcloseiterator)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-ifabruptcloseiterator)|__DONE__
AsyncIteratorClose();|[Link](https://262.ecma-international.org/#sec-asynciteratorclose)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-asynciteratorclose)|__DONE__
CreateIteratorResultObject();|[Link](https://262.ecma-international.org/#sec-createiterresultobject)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createiterresultobject)|__DONE__
CreateListIteratorRecord();|[Link](https://262.ecma-international.org/#sec-createlistiteratorRecord)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-createlistiteratorRecord)|__DONE__
IteratorToList();|[Link](https://262.ecma-international.org/#sec-iteratortolist)|[Link](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-iteratortolist)|__DONE__
ClearKeptObjects();|[Link](https://262.ecma-international.org/#sec-clear-kept-objects)|[Link](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-clear-kept-objects)|TODO
AddToKeptObjects();|[Link](https://262.ecma-international.org/#sec-addtokeptobjects)|[Link](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-addtokeptobjects)|TODO
CleanupFinalizationRegistry();|[Link](https://262.ecma-international.org/#sec-cleanup-finalization-registry)|[Link](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-cleanup-finalization-registry)|TODO
CanBeHeldWeakly();|[Link](https://262.ecma-international.org/#sec-canbeheldweakly)|[Link](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-canbeheldweakly)|__DONE__
OrdinaryObjectCreate();|[Link](https://262.ecma-international.org/#sec-ordinaryobjectcreate)|[Link](https://tc39.es/ecma262/#sec-ordinaryobjectcreate)|__DONE__
OrdinaryCreateFromConstructor();|[Link](https://262.ecma-international.org/#sec-ordinarycreatefromconstructor)|[Link](https://tc39.es/ecma262/#sec-ordinarycreatefromconstructor)|__DONE__
GetPrototypeFromConstructor();|[Link](https://262.ecma-international.org/#sec-getprototypefromconstructor)|[Link](https://tc39.es/ecma262/#sec-getprototypefromconstructor)|__DONE__
RequireInternalSlot();|[Link](https://262.ecma-international.org/#sec-requireinternalslot)|[Link](https://tc39.es/ecma262/#sec-requireinternalslot)|__DONE__
OrdinaryFunctionCreate();|[Link](https://262.ecma-international.org/#sec-ordinaryfunctioncreate)|[Link](https://tc39.es/ecma262/#sec-ordinaryfunctioncreate)|__DONE__
AddRestrictedFunctionProperties();|[Link](https://262.ecma-international.org/#sec-addrestrictedfunctionproperties)|[Link](https://tc39.es/ecma262/#sec-addrestrictedfunctionproperties)|TODO
MakeConstructor();|[Link](https://262.ecma-international.org/#sec-makeconstructor)|[Link](https://tc39.es/ecma262/#sec-makeconstructor)|__DONE__
MakeClassConstructor();|[Link](https://262.ecma-international.org/#sec-makeclassconstructor)|[Link](https://tc39.es/ecma262/#sec-makeclassconstructor)|TODO
MakeMethod();|[Link](https://262.ecma-international.org/#sec-makemethod)|[Link](https://tc39.es/ecma262/#sec-makemethod)|__DONE__
DefineMethodProperty();|[Link](https://262.ecma-international.org/#sec-definemethodproperty)|[Link](https://tc39.es/ecma262/#sec-definemethodproperty)|__DONE__
SetFunctionName();|[Link](https://262.ecma-international.org/#sec-setfunctionname)|[Link](https://tc39.es/ecma262/#sec-setfunctionname)|__DONE__
SetFunctionLength();|[Link](https://262.ecma-international.org/#sec-setfunctionlength)|[Link](https://tc39.es/ecma262/#sec-setfunctionlength)|__DONE__
FunctionDeclarationInstantiation();|[Link](https://262.ecma-international.org/#sec-functiondeclarationinstantiation)|[Link](https://tc39.es/ecma262/#sec-functiondeclarationinstantiation)|TODO
BuiltinCallOrConstruct();|[Link](https://262.ecma-international.org/#sec-builtincallorconstruct)|[Link](https://tc39.es/ecma262/#sec-builtincallorconstruct)|TODO
CreateBuiltinFunction();|[link](https://262.ecma-international.org/#sec-createbuiltinfunction)|[Link](https://tc39.es/ecma262/#sec-createbuiltinfunction)|TODO
BoundFunctionCreate();|[Link](https://262.ecma-international.org/#sec-boundfunctioncreate)|[Link](https://tc39.es/ecma262/#sec-boundfunctioncreate)|TODO
ArrayCreate();|[Link](https://262.ecma-international.org/#sec-arraycreate)|[Link](https://tc39.es/ecma262/#sec-arraycreate)|__DONE__
ArraySpeciesCreate();|[Link](https://262.ecma-international.org/#sec-arrayspeciescreate)|[Link](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arrayspeciescreate)|__DONE__
ArraySetLength();|[Link](https://262.ecma-international.org/#sec-arraysetlength)|[Link](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arraysetlength)|__DONE__
StringCreate();|[Link](https://262.ecma-international.org/#sec-stringcreate)|[Link](https://tc39.es/ecma262/#sec-stringcreate)|__DONE__
StringGetOwnProperty();|[Link](https://262.ecma-international.org/#sec-stringgetownproperty)|[Link](https://tc39.es/ecma262/#sec-stringgetownproperty)|__DONE__
CreateUnmappedArgumentsObject();|[Link](https://262.ecma-international.org/#sec-createunmappedargumentsobject)|[Link](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-createunmappedargumentsobject)|__DONE__
CreateMappedArgumentsObject();|[Link](https://262.ecma-international.org/#sec-createmappedargumentsobject)|[Link](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-createunmappedargumentsobject)|TODO
MakeTypedArrayWithBufferWitnessRecord();|[Link](https://262.ecma-international.org/#sec-maketypedarraywithbufferwitnessrecord)|[Link](https://tc39.es/ecma262/#sec-maketypedarraywithbufferwitnessrecord)|TODO
TypedArrayCreate();|[Link](https://262.ecma-international.org/#sec-typedarraycreate)|[Link](https://tc39.es/ecma262/#sec-typedarraycreate)|__DONE__
TypedArrayByteLength();|[Link](https://262.ecma-international.org/#sec-typedarraybytelength)|[Link](https://tc39.es/ecma262/#sec-typedarraybytelength)|__DONE__
TypedArrayLength();|[Link](https://262.ecma-international.org/#sec-typedarraylength)|[Link](https://tc39.es/ecma262/#sec-typedarraylength)|__DONE__
IsTypedArrayOutOfBounds();|[Link](https://262.ecma-international.org/#sec-istypedarrayoutofbounds)|[Link](https://tc39.es/ecma262/#sec-istypedarrayoutofbounds)|TODO
IsTypedArrayFixedLength();||[Link](https://tc39.es/ecma262/#sec-istypedarrayfixedlength)|TODO
IsValidIntegerIndex();|[Link](https://262.ecma-international.org/#sec-isvalidintegerindex)|[Link](https://tc39.es/ecma262/#sec-isvalidintegerindex)|__DONE__
TypedArrayGetElement();|[Link](https://262.ecma-international.org/#sec-typedarraygetelement)|[Link](https://tc39.es/ecma262/#sec-typedarraygetelement)|__DONE__
TypedArraySetElement();|[Link](https://262.ecma-international.org/#sec-typedarraysetelement)|[Link](https://tc39.es/ecma262/#sec-typedarraysetelement)|__DONE__
IsArrayBufferViewOutOfBounds();|[Link](https://262.ecma-international.org/#sec-isarraybufferviewoutofbounds)|[Link](https://tc39.es/ecma262/#sec-isarraybufferviewoutofbounds)|TODO
ModuleNamespaceCreate();|[Link](https://262.ecma-international.org/#sec-modulenamespacecreate)|[Link](https://tc39.es/ecma262/#sec-modulenamespacecreate)|TODO
SetImmutablePrototype();|[Link](https://262.ecma-international.org/#sec-set-immutable-prototype)|[Link](https://tc39.es/ecma262/#sec-set-immutable-prototype)|__DONE__
ValidateNonRevokedProxy();|[Link](https://262.ecma-international.org/#sec-validatenonrevokedproxy)|[Link](https://tc39.es/ecma262/#sec-validatenonrevokedproxy)|__DONE__
ProxyCreate();|[Link](https://262.ecma-international.org/#sec-proxycreate)|[Link](https://tc39.es/ecma262/#sec-proxycreate)|__DONE__
UTF16EncodeCodePoint();|[Link](https://262.ecma-international.org/#sec-utf16encodecodepoint)|[Link](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-utf16encodecodepoint)|__DONE__
CodePointsToString();|[Link](https://262.ecma-international.org/#sec-codepointstostring)|[Link](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-codepointstostring)|__DONE__
UTF16SurrogatePairToCodePoint();|[Link](https://262.ecma-international.org/#sec-utf16decodesurrogatepair)|[Link](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-utf16decodesurrogatepair)|__DONE__
CodePointAt();|[Link](https://262.ecma-international.org/#sec-codepointat)|[Link](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-codepointat)|__DONE__
StringToCodePoints();|[Link](https://262.ecma-international.org/#sec-stringtocodepoints)|[Link](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-stringtocodepoints)|__DONE__
ParseText();|[Link](https://262.ecma-international.org/#sec-parsetext)|[Link](https://tc39.es/ecma262/multipage/ecmascript-language-source-code.html#sec-parsetext)|TODO
GetTemplateObject();|[Link](https://262.ecma-international.org/#sec-gettemplateobject)|[Link](https://tc39.es/ecma262/#sec-gettemplateobject)|TODO
KeyForSymbol();|[Link](https://262.ecma-international.org/#sec-keyforsymbol)|[Link](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-keyforsymbol)|__DONE__
InstallErrorCause();|[Link](https://262.ecma-international.org/#sec-installerrorcause)|[Link](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-abstract-operations-for-error-objects)|__DONE__
NumberToBigInt();|[Link](https://262.ecma-international.org/#sec-numbertobigint)|[Link](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-numbertobigint)|__DONE__
TrimString();|[Link](https://262.ecma-international.org/#sec-trimstring)|[Link](https://tc39.es/ecma262/multipage/text-processing.html#sec-trimstring)|__DONE__
CreateArrayIterator();|[Link](https://262.ecma-international.org/#sec-createarrayiterator)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-createarrayiterator)|__DONE__
FindViaPredicate();|[Link](https://262.ecma-international.org/#sec-findviapredicate)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-findviapredicate)|__DONE__
FlattenIntoArray();|[Link](https://262.ecma-international.org/#sec-flattenintoarray)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-flattenintoarray)|__DONE__
SortIndexedProperties();|[Link](https://262.ecma-international.org/#sec-sortindexedproperties)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object)|__DONE__
CompareArrayElements();|[Link](https://262.ecma-international.org/#sec-comparearrayelements)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object)|__DONE__
TypedArraySpeciesCreate();|[Link](https://262.ecma-international.org/#typedarray-species-create)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#typedarray-species-create)|__DONE__
TypedArrayCreateFromConstructor();|[Link](https://262.ecma-international.org/#sec-typedarraycreatefromconstructor)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarraycreatefromconstructor)|__DONE__
TypedArrayCreateSameType();|[Link](https://262.ecma-international.org/#sec-typedarray-create-same-type)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-create-same-type)|__DONE__
ValidateTypedArray();|[Link](https://262.ecma-international.org/#sec-validatetypedarray)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-validatetypedarray)|__DONE__
TypedArrayElementSize();|[Link](https://262.ecma-international.org/#sec-typedarrayelementsize)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-abstract-operations-for-typedarray-objects)|__DONE__
TypedArrayElementType();|[Link](https://262.ecma-international.org/#sec-typedarrayelementtype)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarrayelementtype)|__DONE__
AddEntriesFromIterable();|[Link](https://262.ecma-international.org/#sec-add-entries-from-iterable)|[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-add-entries-from-iterable)|__DONE__
CompareTypedArrayElements();|[Link](https://262.ecma-international.org/#sec-comparetypedarrayelements)|[Link](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarrayelementtype)|__DONE__
CreateMapIterator();|[Link](https://262.ecma-international.org/#sec-createmapiterator)|[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-createmapiterator)|__DONE__
GetSetRecord();||[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-getsetrecord)|__DONE__
SetDataHas();||[Link](https://tc39.es/ecma262/#sec-setdatahas)|__DONE__
SetDataIndex();||[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-setdataindex)|__DONE__
SetDataSize();||[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-setdatasize)|__DONE__
CreateSetIterator();|[Link](https://262.ecma-international.org/#sec-createsetiterator)|[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-createsetiterator)|__DONE__
WeakRefDeref();|[Link](https://262.ecma-international.org/#sec-weakref-abstract-operations)|[Link](https://tc39.es/ecma262/multipage/managing-memory.html#sec-weakrefderef)|__DONE__
CanonicalizeKeyedCollectionKey();||[Link](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-canonicalizekeyedcollectionkey)|__DONE__
CreateAsyncFromSyncIterator();|[Link](https://262.ecma-international.org/#sec-createasyncfromsynciterator)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-createasyncfromsynciterator)|__DONE__
AsyncFromSyncIteratorContinuation();|[Link](https://262.ecma-international.org/#sec-asyncfromsynciteratorcontinuation)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-asyncfromsynciteratorcontinuation)|TODO
CreateResolvingFunctions();|[Link](https://262.ecma-international.org/#sec-createresolvingfunctions)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-createresolvingfunctions)|TODO
FulfillPromise();|[Link](https://262.ecma-international.org/#sec-fulfillpromise)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-fulfillpromise)|TODO
NewPromiseCapability();|[Link](https://262.ecma-international.org/#sec-newpromisecapability)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-newpromisecapability)|TODO
IsPromise();|[Link](https://262.ecma-international.org/#sec-ispromise)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-ispromise)|__DONE__
RejectPromise();|[Link](https://262.ecma-international.org/#sec-rejectpromise)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-rejectpromise)|TODO
TriggerPromiseReactions();|[Link](https://262.ecma-international.org/#sec-triggerpromisereactions)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-triggerpromisereactions)|TODO
HostPromiseRejectionTracker();|[Link](https://262.ecma-international.org/#sec-host-promise-rejection-tracker)|[Link](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-host-promise-rejection-tracker)|TODO
CreateHTML();|[Link](https://262.ecma-international.org/#sec-createhtml)|[Link](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-createhtml)|__DONE__


## License


https://opensource.org/licenses/MIT

MIT License

SPDX short identifier: MIT

Copyright (c) 2025 Ferenc Czigler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


--------


© Copyright 2025 Ferenc Czigler
