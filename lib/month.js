  if (typeof datEasy === "undefined") {
    datEasy = {};
  }

  var Month = datEasy.Month = function (options) {
    this.year = options.year;
    this.ord = options.ord;
  };

  Month.prototype.numDays = function () {
    days = datEasy.Calendar.MONTH_INFO[this.ord].days;

    if (this.monthOrd === 2 && datEasy.Calendar.isALeapYear(this.year)) {
      days += 1;
    }

    return days;
  };

  Month.prototype.next = function () {
    var newYear = this.ord === 11 ? this.year + 1 : this.year;
    var newOrd = this.ord === 11 ? 1 : this.ord + 1;

    return new Month({
      year: newYear,
      ord: newOrd
    });
  };

  Month.prototype.prev = function () {
    var newYear = this.ord === 1 ? this.year - 1 : this.year;
    var newOrd = this.ord === 1 ? 11 : this.ord - 1;

    return new Month({
      year: newYear,
      ord: newOrd
    });
  };

  Month.prototype.name = function () {
    return datEasy.Calendar.MONTH_INFO[this.ord].name;
  };

  Month.prototype.firstWeekDay = function () {
    zellerMonth = this.ord < 3 ? this.ord + 10 : this.ord - 1;
    zellerYear = this.order < 3 ? this.year % 100 - 1 : this.year % 100;
    zellerCentury = Math.floor(this.year / 100);

    var f = 1 +
            Math.floor((13 * zellerMonth - 1) / 5) +
            zellerYear +
            Math.floor(zellerYear/4) +
            Math.floor(zellerCentury/4) -
            2 * zellerCentury;

    var day = f > 0 ? f % 7 : f % 7 + 7;

    if (datEasy.Calendar.isALeapYear(this.year)) {
      day += day === 0 ? 6 : -1;
    }

    return day;
  };
