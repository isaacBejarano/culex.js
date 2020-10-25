"use strict";
/* WORKFLOW EXAMPLE */
// refs
var input = document.getElementById("input-url");
var btnFetch = document.getElementById("btn-fetch");
var btnAbort = document.getElementById("btn-abort");
var outlet = document.getElementById("outlet");
// 1. options
var options = {
    method: "GET",
    url: "",
};
// 2. new connection
var culex = new Culex();
// 3. EVENTS - fetch data || abort
btnFetch.addEventListener("click", function () {
    // set url
    options.url = input.value;
    // fetch with options
    culex.request(options).response(function (data) {
        // handle response at will
        toDOM(data);
        // toDOM(JSON.stringify(data));
        // toConsole(data);
        // toConsole(JSON.stringify(data));
    });
});
btnAbort.addEventListener("click", function () {
    culex.abort();
});
// setTimeout(() => XHR.abort(), 50); // TEST ~async
// SR => class Printer {}
function toDOM(data) {
    var printable = "";
    var toString = Object.prototype.toString;
    if (toString.call(data) === "[object String]")
        printable = data;
    if (toString.call(data) === "[object Object]")
        printable = travereseObject(data);
    if (toString.call(data) === "[object Array]")
        printable = travereseArray(data);
    // toString + CSS
    outlet.innerHTML = printable;
    outlet.classList.add("outlet-dynamic");
}
function travereseObject(data) {
    var printable = "";
    for (var key in data) {
        printable += "<p><span>" + key + "</span>: " + data[key] + "</p>"; // data[key] is any
    }
    return "<li>" + printable + "</li>";
}
function travereseArray(data) {
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
function toConsole(data) {
    console.log(data);
}
