(function ($) {

   $.fn.datEasyTime = function (options) {
      this.currentMonth = new datEasyTime.Month({
        year: options.defaultDate.getFullYear(),
        ord: options.defaultDate.getMonth()
      });

      this.prevSym = options.prevSym;
      this.nextSym = options.nextSym;

      this.addClass('dateasytime-picker');
      this.one('click', this.renderPickerBox.bind(this));

      return this;
  };

  $.fn.renderPickerBox = function () {
    this.html(this._newPickerBox());

    $('#dateasytime-next').one('click', this.next.bind(this));
    $('#dateasytime-prev').one('click', this.prev.bind(this));


    return this;
  };

  $.fn._newPickerBox = function () {
    var pickerBox = $('<figure>').addClass('dateasytime-picker-box group');

    pickerBox.prepend('<figure id="dateasytime-prev" class="prev">' + this.prevSym + '</figure>' +
                      '<figure id="dateasytime-next" class="next">' + this.nextSym + '</figure>' +
                      '<h3>' + this.currentMonth.name() + ' ' + this.currentMonth.year +'</h3>' );

    var $calUl = $('<ul id="dateasytime-calendar" class="dateasytime-calendar group">');

    for (var i = 0; i < this.currentMonth.firstWeekDay(); i++) {
      $calUl.append('<li>');
    }

    for (i = 0; i < this.currentMonth.numDays(); i++) {
      $calUl.append('<li>' + (i + 1) + '</li>');
    }

    pickerBox.append($calUl);

    return pickerBox;
  };

  $.fn.next = function () {
    this.currentMonth = this.currentMonth.next();
    this.renderPickerBox();
  };

  $.fn.prev = function () {
    this.currentMonth = this.currentMonth.prev();
    this.renderPickerBox();
  };

}(jQuery));
