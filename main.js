/******************
 * YOUR CODE HERE *
 ******************/
const call = function (funk){
  funk()
}

const callTwice = function (funk){
  funk()
  funk()
}

const callXTimes = function (funk, num){
  if (num>0){
  for (let i = 0 ;i <num;i++){
    funk()
  }
}
}
const returnFromFunc = function(funk){
  return funk()
}
const modifyString = function(str,funk){
  return funk(str)
}
const modifyNumber = function(num,funk){
  return funk(num)
}
const modifyAnything = function(any,funk){
  return funk(any)
}
const twoFuncs = function(funk1,funk2){
  
  return funk2(funk1())

}
const threeFuncs = function(funk1,funk2,funk3){
  return funk3(funk2(funk1()))
}
const twoValues = function(array, num, funk){
  return funk(array,num)
}
const twoValuesRTL = function(num, array,funk){
  return funk(array, num)
}
/********************************
 * OUR CODE HERE - DON'T TOUCH! *
 ********************************/

if (typeof call === 'undefined') {
  call = undefined;
}

if (typeof callTwice === 'undefined') {
  callTwice = undefined;
}

if (typeof callXTimes === 'undefined') {
  callXTimes = undefined;
}

if (typeof returnFromFunc === 'undefined') {
  returnFromFunc = undefined;
}

if (typeof modifyString === 'undefined') {
  modifyString = undefined;
}

if (typeof modifyNumber === 'undefined') {
  modifyNumber = undefined;
}

if (typeof modifyAnything === 'undefined') {
  modifyAnything = undefined;
}

if (typeof twoFuncs === 'undefined') {
  twoFuncs = undefined;
}

if (typeof threeFuncs === 'undefined') {
  threeFuncs = undefined;
}

if (typeof twoValues === 'undefined') {
  twoValues = undefined;
}

if (typeof twoValuesRTL === 'undefined') {
  twoValuesRTL = undefined;
}


module.exports = {
  call,
  callTwice,
  callXTimes,
  returnFromFunc,
  modifyString,
  modifyNumber,
  modifyAnything,
  twoFuncs,
  threeFuncs,
  twoValues,
  twoValuesRTL,
}
