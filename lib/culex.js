"use strict";
/*
    
XMLHttpRequest "readyState"
            0: unset
            1: open() is called
            2: send() is called -> headers + status available
            3: downloading... -> responseText holds partial data
            4: downloading complete -> now we can maipulate data

SOLID:
    -	Single Responsability

NOTE:
    *	Culex only fetches JSON data / .responseText
        -> .responseXML not implemented

    *	Credentials for authenticated endpoints not implemented
        -> options { user:null, pass:null }

*/
var Culex = /** @class */ (function () {
    // prettier-ignore
    function Culex() {
        window.XMLHttpRequest
            ? (this.XHR = new XMLHttpRequest())
            : (this.XHR = new ActiveXObject("Microsoft.XMLHTTP"));
    }
    // methods ~async
    Culex.prototype.request = function (options) {
        var method = options.method, url = options.url, contentType = options.contentType, user = options.user, pass = options.pass;
        if (!contentType)
            contentType = "application/x-www-form-urlencoded";
        if (!user)
            user = null;
        if (!pass)
            pass = null;
        this.XHR.open(method, url, true, user, pass); // async:true
        // console.log("request open");
        // this.XHR.onprogress = function () {
        // 	console.log("downloading from API...");
        // };
        // this.XHR.setRequestHeader("Content-Type", contentType);;
        this.XHR.send(null); // x:null if GET / x:object if POST
        // this.XHR.onload = function () {
        // 	console.log("download completed");
        // };
        return this;
    };
    // methods ~await
    Culex.prototype.response = function (callback) {
        var _this = this;
        this.XHR.onreadystatechange = function () {
            // HEADERS_RECEIVED
            if (_this.XHR.readyState === 2 && _this.XHR.status === 200) {
                console.log(_this.XHR.getResponseHeader("Content-Type"));
            }
            // ERROR handling
            if (_this.XHR.readyState === 4 && _this.XHR.status === 200) {
                try {
                    callback(JSON.parse(_this.XHR.responseText));
                }
                catch (_a) {
                    console.warn("options invalid or unexistent");
                }
            }
        };
    };
    // methods
    Culex.prototype.abort = function () {
        this.XHR.abort();
        console.warn("connection aborted");
    };
    return Culex;
}());
var Printer = /** @class */ (function () {
    function Printer() {
    }
    return Printer;
}());
