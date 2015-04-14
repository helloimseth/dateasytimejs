  if (typeof datEasyTime === "undefined") {
    datEasy = {};
  }

  var Month = datEasyTime.Month = function (options) {
    this.year = options.year;
    this.ord = options.ord;
  };

  Month.prototype.numDays = function () {
    days = datEasyTime.Calendar.MONTH_INFO[this.ord].days;

    if (this.monthOrd === 2 && datEasyTime.Calendar.isALeapYear(this.year)) {
      days += 1;
    }

    return days;
  };

  Month.prototype.next = function () {
    var newYear = this.ord === 11 ? this.year + 1 : this.year;
    var newOrd = this.ord === 11 ? 0 : this.ord + 1;

    return new Month({
      year: newYear,
      ord: newOrd
    });
  };

  Month.prototype.prev = function () {
    var newYear = this.ord === 0 ? this.year - 1 : this.year;
    var newOrd = this.ord === 0 ? 11 : this.ord - 1;

    return new Month({
      year: newYear,
      ord: newOrd
    });
  };

  Month.prototype.name = function () {
    return datEasyTime.Calendar.MONTH_INFO[this.ord].name;
  };

  Month.prototype.firstWeekDay = function () {
    return new Date(this.year, this.ord, 1).getDay();
  };
