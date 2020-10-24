"use strict";
/*
https://jsonplaceholder.typicode.com/users	[]
https://api.wheretheiss.at/v1/satellites/25544/tles	{}

    "readyState"
            0: unset
            1: open() is called
            2: send() is called -> headers + status available
            3: downloading... -> responseText holds partial data
            4: downloading complete -> now we can maipulate data

SOLID used:
- Single Responsability
*/
// refs
var input = document.getElementById("input-url");
var btnFetch = document.getElementById("btn-fetch");
var btnAbort = document.getElementById("btn-abort");
var outlet = document.getElementById("outlet");
// 1. options
var options = {
    method: "GET",
    url: "",
    async: true,
};
// 2. new XHR connection
var XHR = new Culex();
// 3. EVENTS - fetch data || abort
btnFetch.addEventListener("click", function () {
    // get url
    options.url = input.value;
    // prettier-ignore
    XHR
        .request(options)
        .response(function (data) {
        var body = JSON.parse(data); // -> object	
        toDOM(body);
        // toDOM(JSON.stringify(body));
        // toConsole(body);
        // toConsole(JSON.stringify(body));
    }); // 4. parse data to object to use it in instructions
});
btnAbort.addEventListener("click", function () {
    XHR.abort();
});
// AUX - Single Responsability
function toDOM(body) {
    var printable = "";
    var toString = Object.prototype.toString;
    if (toString.call(body) === "[object String]")
        printable = body;
    if (toString.call(body) === "[object Object]") {
        printable = travereseObject(body);
    }
    if (toString.call(body) === "[object Array]") {
        printable = travereseArray(body);
        // function newFunction() {
        // 	return 0;
        // }
        // {
        // 	for (let obj of body) {
        // 		outlet.innerHTML += `
        // 		<h4>${obj["title"]}</h4>
        // 		<p>${obj["body"]}</p>
        // 		`;
        // 	}
        // }
    }
    // toString
    outlet.innerHTML = printable;
    outlet.classList.add("outlet-dynamic");
}
function travereseObject(body) {
    var printable = "";
    // for (let [key, value] of Object.entries(body)) {
    // if (body.hasOwnProperty(key)) {
    // printable += `${key}: ${value}<br/>`;
    // }
    // }
    for (var key in body) {
        // if (Object.prototype.hasOwnProperty.call(body, key)) {
        var value = body[key];
        printable += "<span>" + key + "</span>: " + value + "<br/>";
        // }
    }
    return printable;
}
function travereseArray(body) {
    var printable = "";
    console.log(body[0]);
    return printable;
}
function toConsole(body) {
    console.log(body);
}
// TEST ~async
// setTimeout(() => XHR.abort(), 50);
