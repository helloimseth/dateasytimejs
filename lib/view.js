if (typeof datEasyTime === "undefined") {
  datEasyTime = {};
}

  datEasyTime.defaults = {
    el: null,
    defaultDate: new Date(),
    nextSym: '>',
    prevSym: '<',
    militaryTime: false,
    className: 'dateasytime'
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

    this.prevSym = settings.prevSym;
    this.nextSym = settings.nextSym;

    this._addPickerButton();
};

Picker.prototype.renderPickerBox = function () {
  this._resetPickerBox();

  this.el.appendChild(this._newPickerBox());

  console.log(this.returnVals);
};

Picker.prototype._newPickerBox = function () {
  var pickerBox = document.createElement('figure');
  pickerBox.className = this.className + '-picker-box group';
  pickerBox.id = 'dateasytime-picker-box';

  this._attachNavButtonsTo(pickerBox);

  this._attachHeaderTo(pickerBox);

  this._attachCalUlTo(pickerBox);

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

    if (i >= defer) { li.textContent = i - defer + 1; }

    calUl.appendChild(li);
  }

  calUl.addEventListener('click', this.selectDate.bind(this));

  pickerBox.appendChild(calUl);
};

Picker.prototype._attachNavButtonsTo = function (pickerBox) {
  var buttonInfo = {next: {sym: this.nextSym, func: this.next.bind(this)},
                    prev: {sym: this.prevSym, func: this.prev.bind(this)}};

  for (var dir in buttonInfo) {
    var button = document.createElement('button');
    button.className = dir;
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

Picker.prototype.selectDate = function (event) {
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
};
