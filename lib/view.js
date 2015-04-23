if (typeof datEasyTime === "undefined") {
  datEasyTime = {};
}

  datEasyTime.defaults = {
    el: null,
    defaultDate: new Date(),
    nextSym: '>',
    prevSym: '<',
    xSym: 'X',
    militaryTime: false,
    minuteStep: 15,
    className: 'dateasytime',
    inputName: 'dateeasytime'
  };

 var Picker = datEasyTime.Picker = function (options) {
    var settings = datEasyTime.Util.mergeDefaults(datEasyTime.defaults, options);

    this.className = settings.className;

    this.el = settings.el;
    this.el.className += ' ' + this.className + '-picker';

    this.currentMonth = new datEasyTime.Month({
      year: settings.defaultDate.getFullYear(),
      ord: settings.defaultDate.getMonth()
    });

    this.returnVals = {
      year: this.currentMonth.year,
      month: this.currentMonth.ord + 1,
      date: settings.defaultDate.getDate(),
      hour: settings.defaultDate.getHours(),
      minute: settings.defaultDate.getMinutes(),
      offset: settings.defaultDate.getTimezoneOffset() / 60
    };

    this.militaryTime = settings.militaryTime;
    this.minuteStep = settings.minuteStep;

    this.inputName = settings.inputName;

    this.prevSym = settings.prevSym;
    this.nextSym = settings.nextSym;
    this.xSym = settings.xSym;

    this._addPickerButton();
};

Picker.prototype.renderPickerBox = function () {
  this._resetPickerBox();

  this.el.appendChild(this._newPickerBox());
};

Picker.prototype._newPickerBox = function () {
  var pickerBox = document.createElement('figure');
  pickerBox.className = this.className + '-picker-box group';
  pickerBox.id = 'dateasytime-picker-box';

  this._attachButtonsTo(pickerBox);

  this._attachHeaderTo(pickerBox);

  this._attachCalUlTo(pickerBox);

  this._attachTimePickersTo(pickerBox);

  if (!document.getElementById('dateasytime-picker-input')){
    this._attachHiddenInput();
  }

  return pickerBox;
};

Picker.prototype.next = function (event) {
  this.currentMonth = this.currentMonth.next();
  this.renderPickerBox();
};

Picker.prototype.prev = function (event) {
  this.currentMonth = this.currentMonth.prev();
  this.renderPickerBox();
};

Picker.prototype.selectDate = function (event) {
  var prevSelected = document.getElementById('dateasytime-calendar-selected-li');

  if (prevSelected) {
    prevSelected.className = '';
    prevSelected.id = '';
    }

  event.currentTarget.className = 'selected';
  event.currentTarget.id = 'dateasytime-calendar-selected-li';
};

Picker.prototype._addPickerButton = function (event) {
  var button = document.createElement('button');
  button.className += 'render-button';
  button.id = "pickerbox-start-button";

  button.addEventListener('click', this.renderPickerBox.bind(this));
  this.el.appendChild(button);
};

Picker.prototype._resetPickerBox = function () {
  ['pickerbox-start-button', 'dateasytime-picker-box'].forEach(function (id) {
    var el = document.getElementById(id);
    el && el.remove();
  });
};

Picker.prototype._attachCalUlTo = function (pickerBox) {
  var calUl = document.createElement('ul');
  calUl.className = this.className + "-calendar group";
  calUl.id = "dateasytime-calendar";

  var defer = this.currentMonth.firstWeekDay();
  var numLis = this.currentMonth.numDays() + defer;

  for (i = 0; i < numLis; i++) {
    var li = document.createElement('li');

    if (i >= defer) {
      var dateNum = i - defer + 1;
      li.textContent = dateNum;

      if (dateNum == this.returnVals.date &&
          this.currentMonth.ord == this.returnVals.month - 1) {
        li.className = 'selected';
        li.id = 'dateasytime-calendar-selected-li';
      }
    }

    calUl.appendChild(li);
  }

  calUl.addEventListener('click', this.selectDate.bind(this));

  pickerBox.appendChild(calUl);
};

Picker.prototype._attachButtonsTo = function (pickerBox) {
  var buttonInfo = {next: {sym: this.nextSym, func: this.next.bind(this)},
                    prev: {sym: this.prevSym, func: this.prev.bind(this)},
                    xout: {sym: this.xSym, func: this.remove.bind(this, pickerBox)}};

  for (var dir in buttonInfo) {
    var button = document.createElement('button');
    button.className = 'dateasytime-button-' + dir;
    button.textContent = buttonInfo[dir].sym;

    pickerBox.appendChild(button);
    button.addEventListener('click', buttonInfo[dir].func);
  }
};

Picker.prototype._attachHeaderTo = function (pickerBox){
  var calTitle = document.createElement('h3');
  calTitle.textContent = this.currentMonth.name() + ' ' + this.currentMonth.year;

  pickerBox.appendChild(calTitle);
};

Picker.prototype._attachTimePickersTo = function (pickerBox) {
  var timePickerBox = document.createElement('section');

  this._attachHourDropdownTo(timePickerBox);
  this._attachMinuteDropdownTo(timePickerBox);
  !this.militaryTime && this._attachAMPMTo(timePickerBox);

  timePickerBox.addEventListener('change', this.selectTimeDropdownValue.bind(this));

  pickerBox.appendChild(timePickerBox);
};

Picker.prototype._attachHourDropdownTo = function (pickerBox) {
  var hourDropdown = document.createElement('select');
  hourDropdown.id = 'dateasytime-time-picker-hour';

  var firstOption = document.createElement('option');
      firstOption.textContent = 'Hour';
      hourDropdown.appendChild(firstOption);

  var maxHour = this.militaryTime ? 24 : 12;

  for (var i = 0; i < maxHour; i++) {
    var option = document.createElement('option');
    option.textContent = i + 1;

    if ((i < 13 && i === this.returnVals.hour)||
       (this.militaryTime && i === this.returnVals.hour) ||
       (i === this.returnVals.hour - 13)) {
      option.setAttribute('selected', true);
    }

    hourDropdown.appendChild(option);
  }

  pickerBox.appendChild(hourDropdown);
};

Picker.prototype._attachMinuteDropdownTo = function (pickerBox) {
  var minuteDropdown = document.createElement('select');
  minuteDropdown.id = 'dateasytime-time-picker-minute';

  var firstOption = document.createElement('option');
      firstOption.textContent = 'Min';
      minuteDropdown.appendChild(firstOption);

  for (var i = 0; i < 60; i += this.minuteStep) {
    var option = document.createElement('option');
    option.textContent = i < 10 ? '0' + i : i;

    if (i == this.returnVals.minute) {
      option.setAttribute('selected', true);
    }
    minuteDropdown.appendChild(option);
  }

  pickerBox.appendChild(minuteDropdown);
};

Picker.prototype._attachAMPMTo = function (pickerBox) {
  var ampmDropdown = document.createElement('select');
  ampmDropdown.id = 'dateasytime-time-picker-ampm';

  ['AM', 'PM'].forEach(function(meridian) {
    var option = document.createElement('option');
    option.textContent = meridian;

    if ((meridian == 'AM' && this.returnVals.hour < 12 )||
        (meridian == 'PM' && this.returnVals.hour > 12)) {
          option.setAttribute('selected', true);
    }
    ampmDropdown.appendChild(option);
  }.bind(this));

  pickerBox.appendChild(ampmDropdown);
};

Picker.prototype.selectDate = function (event) {
    if (event.target.tagName == 'UL'){ return; }

    var prevSelected = document.getElementById('dateasytime-calendar-selected-li');
    if (prevSelected) {
      prevSelected.className = '';
      prevSelected.id = '';
    }

    event.target.className = 'selected';
    event.target.id = 'dateasytime-calendar-selected-li';

    this.returnVals.year = this.currentMonth.year;
    this.returnVals.month = this.currentMonth.ord + 1;
    this.returnVals.date = event.target.textContent;

    this.updateInput();
};

Picker.prototype.selectTimeDropdownValue = function (event) {
    var dropdown = event.target;
    var idx = dropdown.selectedIndex;
    var attr = dropdown.id.slice(24);
    var val = dropdown.children[idx].textContent;

    if (attr == 'minute') {
      this.returnVals[attr] = val;
    } else if (attr == 'hour'){
      var ampmIdx = document.getElementById('dateasytime-time-picker-ampm')
                            .selectedIndex;
      this.returnVals[attr] = parseInt(val) + (12 * ampmIdx);
    } else if (idx === 0) {
      this.returnVals.hour -= 12;
    } else {
      this.returnVals.hour += 12;
    }

    this.updateInput();
};

Picker.prototype._attachHiddenInput = function () {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', this.inputName);
    input.id = 'dateasytime-picker-input';

    this.el.appendChild(input);
};

Picker.prototype.updateInput = function () {
  input = document.getElementById('dateasytime-picker-input');

  input.setAttribute('value', this._valString());
};

Picker.prototype._valString = function () {
  return this.returnVals.year + '-' +
         this.returnVals.month + '-' +
         this.returnVals.date + '-' +
         this.returnVals.hour + '-' +
         this.returnVals.minute + '-' +
         0 + '-' +
         "\'+" + this.returnVals.offset + "\'";
};

Picker.prototype.remove = function (pickerBox) {
  pickerBox.remove();
  this._addPickerButton();
};
