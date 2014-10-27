window.onload = function() {
  //get options from local
  var obj = request('onload');
  generateTableFromLocal(obj);
  //build table and display
};


function curWeatherObj(temp, tempMax, tempMin, speed, direction) {
  this.temp = temp;
  this.tempMax = tempMax;
  this.tempMin = tempMin;
  this.speed = speed;
  this.direction = direction;
}

function request(type) {
  //validate httpRequest
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest) {
    throw 'HttpRequest Error.';
  }
  if(type != 'onload') {
    var elem = document.getElementById('stateSelect');
    var selected = elem.options[elem.selectedIndex].value;
    //implement better error handling
     if(document.getElementById('city').value === '') {
      throw 'Empty City Search.';
     }
  }

  //return object
  var url = 'http://api.openweathermap.org/data/2.5/weather';
  var cur = {};
  if(type === 'onload') {
    url += '?q=' + localStorage.getItem('city') +
     ',' + localStorage.getItem('state');
  }
  else {
    url += '?q=' + document.getElementById('city').value + ',' + selected;
  }
  httpRequest.onreadystatechange = function() {
    if(this.readyState === 4 && httpRequest.status === 200) {
      //parse string, place into variables, place into object
      var weather = JSON.parse(this.responseText);
      var temp = weather.main.temp;
      var tempMax = weather.main.temp_max;
      var tempMin = weather.main.temp_min;
      var speed = weather.wind.speed;
      var direction = weather.wind.deg;
      cur = new curWeatherObj(temp, tempMax, tempMin, speed, direction);
    }
  };

  httpRequest.open('GET', url, false);
  httpRequest.send();
  return cur;
}

/*modified from:
http://mzl.la/1tXS04d
*/
function generate_table(curWeather) {
  // get the reference for the body
  var body = document.getElementsByTagName('body')[0];
  // creates <sec>, <table>, and <tbody> elements
  var sec = document.createElement('section');
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  //creates header row
  var row = document.createElement('tr');
  //if(localStorage.getItem(localStorage.key(i)) != 'false') {

  //city header
  var cellHead = document.createElement('th');
  var cHeadText = document.createTextNode('City');
  cellHead.appendChild(cHeadText);
  row.appendChild(cellHead);

  //state header
  var cellHead = document.createElement('th');
  var cHeadText = document.createTextNode('State');
  cellHead.appendChild(cHeadText);
  row.appendChild(cellHead);

  //temp header
  if(document.getElementsByName('temp')[0].checked === true) {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Temperature (F)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //tempMax header
  if(document.getElementsByName('tempMax')[0].checked === true) {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Max Temp (F)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //tempMin header
  if(document.getElementsByName('tempMin')[0].checked === true) {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Min Temp (F)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //Wind Header
  if(document.getElementsByName('wind')[0].checked === true) {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Wind Speed (mps)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Wind Direction (degrees)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //add the row to the table
  tblBody.appendChild(row);

  //creates content row
  row = document.createElement('tr');
  var cell = document.createElement('td');
  var cellText = document.createTextNode(document.getElementById('city').value);
  cell.appendChild(cellText);
  row.appendChild(cell);

  var elem = document.getElementById('stateSelect');
  var selected = elem.options[elem.selectedIndex].value;
  cell = document.createElement('td');
  cellText = document.createTextNode(selected);
  cell.appendChild(cellText);
  row.appendChild(cell);

  if(document.getElementsByName('temp')[0].checked === true) {
    cell = document.createElement('td');
    cellText = document.createTextNode(parseFloat(
      ((curWeather.temp - 273.15) * 1.8 + 32)).toPrecision(4));
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  if(document.getElementsByName('tempMax')[0].checked === true) {
    cell = document.createElement('td');
    cellText = document.createTextNode(parseFloat(
      ((curWeather.tempMax - 273.15) * 1.8 + 32)).toPrecision(4));
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  if(document.getElementsByName('tempMin')[0].checked === true) {
    cell = document.createElement('td');
    cellText = document.createTextNode(parseFloat(
      ((curWeather.tempMin - 273.15) * 1.8 + 32)).toPrecision(4));
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  if(document.getElementsByName('wind')[0].checked === true) {
    //speed
    cell = document.createElement('td');
    cellText = document.createTextNode(curWeather.speed);
    cell.appendChild(cellText);
    row.appendChild(cell);
    //direction
    cell = document.createElement('td');
    cellText = document.createTextNode(curWeather.direction);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  //add elements back into structure
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  sec.appendChild(tbl);
  body.appendChild(sec);
}

/*modified from:
http://mzl.la/1tXS04d
*/
function generateTableFromLocal(curWeather) {
  // get the reference for the body
  var body = document.getElementsByTagName('body')[0];
  // creates <sec>, <table>, and <tbody> elements
  var sec = document.createElement('section');
  var tbl = document.createElement('table');
  var tblBody = document.createElement('tbody');

  //creates header row
  var row = document.createElement('tr');
  //if(localStorage.getItem(localStorage.key(i)) != 'false') {

  //city header
  var cellHead = document.createElement('th');
  var cHeadText = document.createTextNode('City');
  cellHead.appendChild(cHeadText);
  row.appendChild(cellHead);

  //state header
  var cellHead = document.createElement('th');
  var cHeadText = document.createTextNode('State');
  cellHead.appendChild(cHeadText);
  row.appendChild(cellHead);

  //temp header
  if(localStorage.getItem('temp') === 'true') {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Temperature (F)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //tempMax header
  if(localStorage.getItem('temp_max') === 'true') {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Max Temp (F)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //tempMin header
  if(localStorage.getItem('temp_min') === 'true') {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Min Temp (F)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //Wind Header
  if(localStorage.getItem('wind') === 'true') {
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Wind Speed (mps)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
    var cellHead = document.createElement('th');
    var cHeadText = document.createTextNode('Wind Direction (degrees)');
    cellHead.appendChild(cHeadText);
    row.appendChild(cellHead);
  }

  //add the row to the table
  tblBody.appendChild(row);

  /*creates content row*/

  //city
  row = document.createElement('tr');
  var cell = document.createElement('td');
  var cellText = document.createTextNode(localStorage.getItem('city'));
  cell.appendChild(cellText);
  row.appendChild(cell);

  //state
  cell = document.createElement('td');
  var cellText = document.createTextNode(localStorage.getItem('state'));
  cell.appendChild(cellText);
  row.appendChild(cell);

  //cur temp
  if(localStorage.getItem('temp') === 'true') {
    cell = document.createElement('td');
    cellText = document.createTextNode(parseFloat(
      ((curWeather.temp - 273.15) * 1.8 + 32)).toPrecision(4));
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  //temp max
  if(localStorage.getItem('temp_max') === 'true') {
    cell = document.createElement('td');
    cellText = document.createTextNode(parseFloat(
      ((curWeather.tempMax - 273.15) * 1.8 + 32)).toPrecision(4));
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  //temp min
  if(localStorage.getItem('temp_min') === 'true') {
    cell = document.createElement('td');
    cellText = document.createTextNode(parseFloat(
      ((curWeather.tempMin - 273.15) * 1.8 + 32)).toPrecision(4));
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  //wind
  if(localStorage.getItem('wind') === 'true') {
    //speed
    cell = document.createElement('td');
    cellText = document.createTextNode(curWeather.speed);
    cell.appendChild(cellText);
    row.appendChild(cell);
    //direction
    cell = document.createElement('td');
    cellText = document.createTextNode(curWeather.direction);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  //add elements back into structure
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  sec.appendChild(tbl);
  body.appendChild(sec);
}

function displayResults() {
  var obj = request('');
  //console.log(obj.temp);
  generate_table(obj);
}

function saveToLocal() {
  if (document.getElementsByName('city')[0].value != null) {
    localStorage.setItem('city', document.getElementsByName('city')[0].value);
  }
  else {
    throw 'No City Entered';
  }
  var el = document.getElementById('stateSelect');
  var selected = el.options[el.selectedIndex].value;

  localStorage.setItem('state', selected);
  localStorage.setItem('temp', document.getElementsByName('temp')[0].checked);
  localStorage.setItem('temp_max',
   document.getElementsByName('tempMin')[0].checked);
  localStorage.setItem('temp_min',
   document.getElementsByName('tempMax')[0].checked);
  localStorage.setItem('wind', document.getElementsByName('wind')[0].checked);
}
