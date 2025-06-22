
/** polyfills **/

/* Error.isError(); */
if (!("isError" in Error)) {
  Error.isError = function isError (v) {
    let s = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    return (s === "error" || s === "domexception");
  };
}


/* Object.is(); SameValue */
if (!Object.is) {
  Object.is = function (x, y) {
    if (x===y) { return x!==0 || 1/x === 1/y; } else { return x!==x && y!==y; }
  };
}

function getReadableJSON (value, space) {
  function JSONreplacer(_key, value) {
    if (value == null) { return String(value); }
    if (typeof value === "bigint") { return value.toString()+"n"; }
    if (typeof value === "function") { return String(value); }
    if (typeof value === "symbol") { return String(value); }
    if (value instanceof Set) { return "new Set("+[...value].toString()+");"; }
    if (value instanceof Map) { return "new Map("+[...value].toString()+");"; }
    if (Error.isError(value)) {
      var error = {};
      for (let propName of Object.getOwnPropertyNames(value)) {
        error[propName] = value[propName];
      };
      return error;
    }
    return value;
  }
  return JSON.stringify(value, JSONreplacer, space);
}

/** classes **/


class TestSuite {
  #testCases;
  // constructor
  constructor() { this.#testCases = []; }
  // add testcase
  addTestCase (...args) {
    for (let testCase of args) { this.#testCases.push(testCase); }
  }
  // clear testsuite
  clear () { this.#testCases = []; }
  // clear testsuite results
  clearResults () {
    for (let testCase of this.#testCases) {
      testCase.resultValue = undefined;
      testCase.success = false;
      testCase.errorObject = undefined;
    }
  }
  // run testsuite
  run () {
    this.clearResults();
    for (let testCase of this.#testCases) {
      try {
        testCase.resultValue = testCase.callback();
        // only primitive values !!!
        if (!testCase.hasError &&
          Object.is(testCase.resultValue, testCase.expectedvalue)) {
          testCase.success = true;
        }
      } catch (e) {
        testCase.errorObject = e;
        testCase.resultValue = undefined;
        testCase.success = testCase.hasError;
      }
    }
  }
  // get all testcases
  *getAllTestCases () {
    for (let testCase of this.#testCases) { yield { ...testCase }; }
  }
  // get success testcases
  *getSuccessTestCases () {
    for (let testCase of this.#testCases) {
      if (testCase.success) { yield { ...testCase }; }
    }
  }
  // get failed testcases
  *getFailedTestCases () {
    for (let testCase of this.#testCases) {
      if (!testCase.success) { yield { ...testCase }; }
    }
  }
  // get error testcases
  *getErrorTestCases () {
    for (let testCase of this.#testCases) {
      if (Error.isError(testCase.errorObject)) { yield { ...testCase }; }
    }
  }
  // get error success testcases
  *getErrorSuccessTestCases () {
    for (let testCase of this.#testCases) {
      if (testCase.success && Error.isError(testCase.errorObject)) {
        yield { ...testCase };
      }
    }
  }
  // get error failed testcases
  *getErrorFailedTestCases () {
    for (let testCase of this.#testCases) {
      if (!testCase.success && Error.isError(testCase.errorObject)) {
        yield { ...testCase };
      }
    }
  }
  // get error failed testcases
  //getJSON () { return JSON.stringify(this.#testCases, JSONreplacer, " "); }
  getJSON () { return getReadableJSON(this.#testCases, " "); }
}


class TestCase {
  constructor (name, callback, expectedvalue, hasError = false) {
    this.name = name;
    this.callback = callback;
    this.expectedvalue = expectedvalue;
    this.resultValue = undefined;
    this.success = false;
    this.errorObject = undefined;
    this.hasError = hasError;
  }
}

let defaultTestSuite = new TestSuite();
// dont change this line!

var token1 = 0, token2 = 0, token3 = 0, token4 = 0, token5 = 0;
var token6 = 0, token7 = 0, token8 = 0, token9 = 0, token10 = 0;
