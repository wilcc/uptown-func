const {
  call,
  callTwice,
  callXTimes,
  returnFromFunc,
  modifyString,
  modifyNumber,
  modifyAnything,
  twoFuncs,
  twoValues,
  twoValuesRTL,
} = require('./main.js')


function return5() {
  return 5;
}

function return10() {
  return 10;
}

function add5(x) {
  return x + 5;
}

function add7(x) {
  return x + 7;
}

function sayHello() {
  return 'hello';
}

function addExclamationPoint(str) {
  return str + '!';
}

function addQuestionMark(str) {
  return str + '?';
}

function gimmeFirstHalf(str) {
  return str.length % 2 === 0
    ? str.slice(0, str.length / 2)
    : str.slice(0, str.length / 2 + 1);
}

function gimmeTwo(str) {
  return str + str;
}

function isColinAtSchool(rollCall) {
  return rollCall.includes('Colin');
}

function colinIsAtSchool(rollCall) {
  rollCall.push('Colin');
}

function isEven(num) {
  return num % 2 === 0;
}

function addToStart(list, value) {
  list.unshift(value);
}

function addToEnd(list, value) {
  list.push(value);
}

function makeFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}


let emptyFunc;

beforeEach(() => {
  emptyFunc = jest.fn(function() {});
})


describe('call', () => {
  it(`calls the given function`, () => {
    call(emptyFunc);
    expect(emptyFunc.mock.calls.length).toBe(1)
  })
})


describe('callTwice', () => {
  it(`calls the given function twice`, () => {
    callTwice(emptyFunc);
    expect(emptyFunc.mock.calls.length).toEqual(2);
  })
});


describe('callXTimes', () => {
  it(`calls the given function the given number of times`, () => {
    callXTimes(emptyFunc, 0);
    expect(emptyFunc.mock.calls.length).toEqual(0);
    callXTimes(emptyFunc, 5);
    expect(emptyFunc.mock.calls.length).toEqual(5);
    callXTimes(emptyFunc, 50);
    expect(emptyFunc.mock.calls.length).toEqual(55);
  })
});


describe('returnFromFunc', () => {
  it(`returns the return value of the function it's given`, () => {
    expect(returnFromFunc(return5)).toEqual(5);
    expect(returnFromFunc(return10)).toEqual(10);
    expect(returnFromFunc(return10)).toEqual(10);
  })
});


describe('modifyString', () => {
  it(`modifies the given string according to the given function`, () => {
    expect(modifyString('functional programming', addExclamationPoint)).toEqual('functional programming!');
    expect(modifyString('functional programming', gimmeFirstHalf)).toEqual('functional ');
    expect(modifyString('functional programming', gimmeTwo)).toEqual('functional programmingfunctional programming')
  })
});


describe('modifyNumber', () => {
  it(`modifies the given number according to the given function`, () => {
    expect(modifyNumber(5, add5)).toEqual(10);
    expect(modifyNumber(8, add7)).toEqual(15)
  })
});


describe('modifyAnything', () => {
  it(`will modify the given value according to the given function no matter what type the value is`, () => {
    expect(modifyAnything(5, gimmeTwo)).toEqual(10);
    expect(modifyAnything(5, addExclamationPoint)).toEqual("5!");
    expect(modifyAnything(['Mesuara', 'Colin'], isColinAtSchool)).toEqual(true);
    expect(modifyAnything(['Mesuara', 'Genghis'], isColinAtSchool)).toEqual(false);
    expect(modifyAnything(4, isEven)).toEqual(true)
    expect(modifyAnything(7, isEven)).toEqual(false)

    const school = ['Mesuara', 'Genghis']
    modifyAnything(school, colinIsAtSchool);
    expect(school).toEqual(['Mesuara', 'Genghis', 'Colin'])
    modifyAnything(school, colinIsAtSchool);
    expect(school).toEqual(['Mesuara', 'Genghis', 'Colin', 'Colin'])
    
  })
});


describe('twoFuncs', () => {
  it(`passes the first given function's return value to the second, then returns the result`, () => {
    expect(twoFuncs(sayHello, addQuestionMark)).toEqual('hello?')
    expect(twoFuncs(sayHello, gimmeTwo)).toEqual('hellohello')
    expect(twoFuncs(return5, add5)).toEqual(10)
    expect(twoFuncs(return10, add5)).toEqual(15)
    expect(twoFuncs(return10, add7)).toEqual(17)
  })
});


describe('twoValues', () => {
  it(`runs both given values through the given function, returning the result`, () => {
    const fibs = [1, 2, 3, 5, 8]
    twoValues(fibs, 1, addToStart);
    twoValues(fibs, 13, addToEnd);
    expect(fibs).toEqual([1, 1, 2, 3, 5, 8, 13]);

    expect(twoValues('Colin', 'Jaffe', makeFullName)).toEqual('Colin Jaffe')
  })
});

describe('twoValuesRTL', () => {
  it(`runs both given values through the given function in reverse order, returning the result`, () => {
    const fibs = [1, 2, 3, 5, 8]
    twoValuesRTL(1, fibs, addToStart);
    twoValuesRTL(13, fibs, addToEnd);
    expect(fibs).toEqual([1, 1, 2, 3, 5, 8, 13]);

    expect(twoValuesRTL('Jaffe', 'Colin', makeFullName)).toEqual('Colin Jaffe')
  })
});