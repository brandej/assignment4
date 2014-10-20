Ajax-Assignment
===============
In this assignment you will do two things. The first is to make a simple Ajax and Local Storage library that can easily be tested the other is to implement a custom weather display page that can remember the users configuration between visits.

Library
-------
The main Ajax function in your library should be a function called `ajaxRequest(URL, Type, Parameters)`. The URL is the base URL that the request will be made to (eg. http://foo.com/page.php). Type will be either the string 'POST' or 'GET' depending on if it is a POST or GET request. Parameters will be an object containing pairs of strings that are key value pairs. So the object literal `{'name':'sally','profession':'doctor'}` would be a valid input parameter `{'doStuff':function (){...}}` would not be legal because a function is not a string. Likewise `{'item':'book','count':50}` would not be legal because 50 is not a string.

This function should return an object of the following format:
```
{
'success': boolean,
'code': string,
'codeDetail': string,
'response': string
}
```
The `success` property should be true if the response had a code corresponding with [success](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success) and false otherwise. `code` should hold the response code. `codeDetail` should hold the text associated with the particular status code. `response` should be the string representation of the response received from the server.

If the type is a `POST` request the data should be sent as 'application/x-www-form-urlencoded'. This involves setting the content type in the header. An example is given in the Getting Started with Ajax reading on [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started#Step_5_.E2.80.93_Working_with_data).

If the type is a `GET` then the proper URL string should be created and used within your function. The key value pairings coming from the URL and Parameter inputs.

The local storage portion of the library will be a simple test to determine if local storage works. This should be a function called `localStorageExists()`. It will return a boolean. If you are able to write and read from local storage, it should return true, otherwise it should return false.

Automated tests will follow later in the week.

Weather
-------
This portion of the assignment is less specific in its requirements. It will use [OpenWeatherMap](http://openweathermap.org/api) as a source of data. Your requirement is to let the user input a city and state as well as select from a number of weather measurements to display. It will be graded using a manual testing protocol by 3 of your classmates. (So that means you will also be manually testing 3 other students sites)
