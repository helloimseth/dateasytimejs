if (typeof datEasyTime === "undefined") {
  datEasyTime = {};
}

var Util = datEasyTime.Util = function (options) {
};

datEasyTime.Util.MONTH_INFO = {
  0: {days: 31, name: 'Jan'},
  1: {days: 28, name: 'Feb'},
  2: {days: 31, name: 'Mar'},
  3: {days: 30, name: 'Apr'},
  4: {days: 31, name: 'May'},
  5: {days: 30, name: 'Jun'},
  6: {days: 31, name: 'Jul'},
  7: {days: 31, name: 'Aug'},
  8: {days: 30, name: 'Sep'},
  9: {days: 31, name: 'Oct'},
  10: {days: 30, name: 'Nov'},
  11: {days: 31, name: 'Dec'}
};

datEasyTime.Util.isALeapYear = function (year) {
  if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
       return true;
     }

  return false;
};

datEasyTime.Util.mergeDefaults = function (obj1, obj2) {
  var returnObj = {};

  for (var key in obj1) {
    returnObj[key] = obj2[key] ? obj2[key] : obj1[key];
  }

  return returnObj;
};
