if (typeof datEasyTime === "undefined") {
  datEasyTime = {};
}

 var Picker = datEasyTime.Picker = function (options) {
    this.el = options.el;

    this.currentMonth = new datEasyTime.Month({
      year: options.defaultDate.getFullYear(),
      ord: options.defaultDate.getMonth()
    });

    this.prevSym = options.prevSym;
    this.nextSym = options.nextSym;

    this.el.className += ' dateasytime-picker';
    this.el.addEventListener('click', this.renderPickerBox.bind(this));

    return this;
};

Picker.prototype.renderPickerBox = function () {
  document.getElementById('dateasytime-picker-box') &&
  document.getElementById('dateasytime-picker-box').remove();
  
  this.el.appendChild(this._newPickerBox());

  [['next', this.next.bind(this)],
   ['prev', this.prev.bind(this)]].forEach(function (actionInfo) {
    document.getElementById('dateasytime-' + actionInfo[0])
            .addEventListener('click', actionInfo[1]);
  });

  return this;
};

Picker.prototype._newPickerBox = function () {
  var pickerBox = document.createElement('figure');
  pickerBox.className = 'dateasytime-picker-box group';
  pickerBox.id = 'dateasytime-picker-box';

  [['prev', this.prevSym], ['next', this.nextSym]].forEach(function(buttonParts) {
    var button = document.createElement('figure');
    button.className = buttonParts[0];
    button.id = "dateasytime-" + buttonParts[0];
    button.textContent = buttonParts[1];

    pickerBox.appendChild(button);
  });

  var calTitle = document.createElement('h3');
  calTitle.textContent = this.currentMonth.name() + ' ' + this.currentMonth.year;

  pickerBox.appendChild(calTitle);

  var calUl = document.createElement('ul');
  calUl.className = "dateasytime-calendar group";
  calUl.id = "dateasytime-calendar";

  var defer = this.currentMonth.firstWeekDay();
  var numLis = this.currentMonth.numDays() + defer;

  for (i = 0; i < numLis; i++) {
    if (i < this.currentMonth.firstWeekDay()) {
      calUl.appendChild(document.createElement('li'));
    } else {
      var li = document.createElement('li');
      li.textContent = i - defer + 1;
      calUl.appendChild(li);
    }
  }

  pickerBox.appendChild(calUl);

  return pickerBox;
};

Picker.prototype.next = function () {
  this.currentMonth = this.currentMonth.next();
  this.renderPickerBox();
};

Picker.prototype.prev = function () {
  this.currentMonth = this.currentMonth.prev();
  this.renderPickerBox();
};
