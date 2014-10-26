//Your library code goes in this file.
function ajaxRequest(url, type, param) {

  var httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    throw 'HttpRequest Error.';
  }

    var success;
    var code;
    var codeDetail;
    var response;

    if (type === 'GET') {
    url += '?' + stringify(param);
    httpRequest.onreadystatechange = function() {
      if (this.readyState === 4) {
        //response code to return
        code = httpRequest.status;
        codeDetail = httpRequest.statusText;
        response = httpRequest.responseText;
        if (httpRequest.status === 200) {
          success = true;
        }
        else {
          success = false;
        }
      }
    };
    httpRequest.open('GET', url, false);
    httpRequest.send();
  }
  else if (type === 'POST') {
    httpRequest.onreadystatechange = function() {
      if (this.readyState === 4) {
        //response code to return
        code = httpRequest.status;
        codeDetail = httpRequest.statusText;
        response = httpRequest.responseText;
        if (httpRequest.status === 200) {
          success = true;
        }
        else {
          success = false;
        }
      }
    };
    httpRequest.open('POST', url, false);
    httpRequest.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
    httpRequest.send(stringify(param));
  }

  return {
    'success': success,
    'code': code,
    'codeDetail': codeDetail,
    'response': response
  };
}

//from lecture
function stringify(obj) {
  var str = [];
  for (var prop in obj) {
      str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
  }
  return str.join('&');
}
