"use strict";
/* WORKFLOW EXAMPLE */
/*
    fetched data as string may contain an object or
    an array of objects.
    
    e.g. [] --> https://jsonplaceholder.typicode.com/posts
    e.g. {} --> https://api.wheretheiss.at/v1/satellites/25544

    Parameter "contentType" is "application/x-www-form-urlencoded" by default.
    Other header "Content-Type" may be set to	comply with the targeted API,
    e.g. "text/html", "application/json", "multipart/form-data", etc.
*/
// refs
var input = document.getElementById("input-url");
var btnFetch = document.getElementById("btn-fetch");
var btnAbort = document.getElementById("btn-abort");
var outlet = document.getElementById("outlet");
// 1. options -> method + url are compulsory!
var options = {
    method: "GET",
    url: "",
};
// 2. new connection + printer
var culex = new Culex();
var printer = new Printer();
// 3. EVENTS - fetch data || abort
btnFetch.addEventListener("click", function () {
    options.url = input.value; // set up url dynamically
    // fetch with options
    culex.request(options).response(function (data) {
        // toDOM(data);
        // toDOM(JSON.stringify(data));
        // toConsole(data);
        // toConsole(JSON.stringify(data));
        // toAlert(JSON.stringify(data));
        // toAlert(data);
    });
});
btnAbort.addEventListener("click", function () {
    culex.abort();
});
// setTimeout(() => culex.abort(), 50); // TEST ~async
// SR => class Printer {}
function toDOM(data) {
    var printable = "";
    var toString = Object.prototype.toString;
    if (toString.call(data) === "[object String]")
        printable = data;
    if (toString.call(data) === "[object Object]")
        printable = travereseObjectDOM(data);
    if (toString.call(data) === "[object Array]")
        printable = travereseArrayDOM(data);
    // toString + CSS
    outlet.innerHTML = printable;
    outlet.classList.add("outlet-dynamic");
}
function toConsole(data) {
    console.log(data);
}
function toAlert(data) {
    var printable = "";
    var warningMsg = "Array too long to alert().\nTry another output method, like console.log()";
    if (toString.call(data) === "[object String]")
        printable = data.length <= 1750 ? data : warningMsg;
    if (toString.call(data) === "[object Object]")
        printable = travereseObjectAlert(data);
    if (toString.call(data) === "[object Array]")
        printable = warningMsg;
    alert(printable);
}
/* AUX */
function travereseObjectDOM(data) {
    var printable = "";
    for (var key in data) {
        printable += "<p><span>" + key + "</span>: " + data[key] + "</p>"; // data[key] is any
    }
    return "<li>" + printable + "</li>";
}
function travereseArrayDOM(data) {
    var printable = "";
    // array
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var obj = data_1[_i];
        // object
        printable += "<li>";
        for (var key in obj) {
            printable += "<p><span>" + key + "</span>: " + obj[key] + "</p>"; // data[key] is any
        }
        printable += "</li>";
    }
    return printable;
}
function travereseObjectAlert(data) {
    var printable = "";
    for (var key in data) {
        printable += key + ": " + data[key] + "\n"; // data[key] is any
    }
    return printable;
}
