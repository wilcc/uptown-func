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


describe('call', () => {
  it(`calls the given function`, () => {
    const return5 = function() {
      return 5;
    }

    const mockFunc = jest.fn(return5);

    call(mockFunc);
    expect(mockFunc.mock.calls.length).toBe(1)
  })
})


describe('callTwice', () => {
  it(`calls the given function twice`, () => {
    const return5 = function() {
      return 5;
    }

    const mockFunc = jest.fn(return5);

    call(mockFunc);
    call(mockFunc);
    expect(mockFunc.mock.calls.length).toBe(2)
  })
});


describe('callXTimes', () => {
  it(`calls the given function the given number of times`, () => {
    const return5 = function() {
      return 5;
    }

    const mockFunc = jest.fn(return5);
    
    callXTimes(mockFunc, 0);
    expect(mockFunc.mock.calls.length).toEqual(0);

    callXTimes(mockFunc, 5);
    expect(mockFunc.mock.calls.length).toEqual(5);

    callXTimes(mockFunc, 50);
    expect(mockFunc.mock.calls.length).toEqual(55);
  })
});


describe('returnFromFunc', () => {
  it(`returns the return value of the function it's given`, () => {
    const return5 = function() {
      return 5;
    }

    const return10 = function() {
      return 10;
    }

    expect(returnFromFunc(return5)).toEqual(5);
    expect(returnFromFunc(return10)).toEqual(10);
    expect(returnFromFunc(return10)).toEqual(10);
  })
});


describe('modifyString', () => {
  it(`modifies the given string according to the given function`, () => {
    const addExclamationPoint = function(str) {
      return str + '!';
    }

    const gimmeFirstHalf = function(str) {
      return str.length % 2 === 0
        ? str.slice(0, str.length / 2)
        : str.slice(0, str.length / 2 + 1);
    }

    const gimmeTwo = function(str) {
      return str + str;
    }

    expect(modifyString('functional programming', addExclamationPoint)).toEqual('functional programming!');
    expect(modifyString('functional programming', gimmeFirstHalf)).toEqual('functional ');
    expect(modifyString('functional programming', gimmeTwo)).toEqual('functional programmingfunctional programming')
  })
});


describe('modifyNumber', () => {
  it(`modifies the given number according to the given function`, () => {
    const add5 = function(x) {
      return x + 5;
    }

    const add7 = function(x) {
      return x + 7;
    }

    expect(modifyNumber(5, add5)).toEqual(10);
    expect(modifyNumber(8, add7)).toEqual(15)
  })
});


describe('modifyAnything', () => {
  it(`will modify the given value according to the given function no matter what type the value is`, () => {
    const gimmeTwo = function(str) {
      return str + str;
    }

    const addExclamationPoint = function(str) {
      return str + '!';
    }

    const isColinAtSchool = function(rollCall) {
      return rollCall.includes('Colin');
    }

    const isEven = function(num) {
      return num % 2 === 0;
    }

    const colinIsAtSchool = function(rollCall) {
      rollCall.push('Colin');
    }


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
    const sayHello = function() {
      return 'hello';
    }

    const addQuestionMark = function(str) {
      return str + '?';
    }

    const gimmeTwo = function(str) {
      return str + str;
    }

    const return5 = function() {
      return 5;
    }

    const add5 = function(x) {
      return x + 5;
    }

    const return10 = function() {
      return 10;
    }

    const add7 = function(x) {
      return x + 7;
    }

    expect(twoFuncs(sayHello, addQuestionMark)).toEqual('hello?')
    expect(twoFuncs(sayHello, gimmeTwo)).toEqual('hellohello')
    expect(twoFuncs(return5, add5)).toEqual(10)
    expect(twoFuncs(return10, add5)).toEqual(15)
    expect(twoFuncs(return10, add7)).toEqual(17)
  })
});


describe('twoValues', () => {
  it(`runs both given values through the given function, returning the result`, () => {
    const addToStart = function(list, value) {
      list.unshift(value);
    }

    const addToEnd = function(list, value) {
      list.push(value);
    }

    const makeFullName = function(firstName, lastName) {
      return `${firstName} ${lastName}`;
    }

    const fibs = [1, 2, 3, 5, 8]
    twoValues(fibs, 1, addToStart);
    twoValues(fibs, 13, addToEnd);
    expect(fibs).toEqual([1, 1, 2, 3, 5, 8, 13]);

    expect(twoValues('Colin', 'Jaffe', makeFullName)).toEqual('Colin Jaffe')
  })
});

describe('twoValuesRTL', () => {
  it(`runs both given values through the given function in reverse order, returning the result`, () => {
    const addToStart = function(list, value) {
      list.unshift(value);
    }

    const addToEnd = function(list, value) {
      list.push(value);
    }

    const makeFullName = function(firstName, lastName) {
      return `${firstName} ${lastName}`;
    }

    const fibs = [1, 2, 3, 5, 8]
    twoValuesRTL(1, fibs, addToStart);
    twoValuesRTL(13, fibs, addToEnd);
    expect(fibs).toEqual([1, 1, 2, 3, 5, 8, 13]);

    expect(twoValuesRTL('Jaffe', 'Colin', makeFullName)).toEqual('Colin Jaffe')
  })
});
