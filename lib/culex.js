"use strict";
/*
    
XHttpRequest "readyState"
            0: unset
            1: open() is called
            2: send() is called -> headers + status available
            3: downloading... -> responseText holds partial data
            4: downloading complete -> now we can maipulate data

SOLID used:
- Single Responsability
- Interface Segregation

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
        var method = options.method, url = options.url, _a = options.async, async = _a === void 0 ? true : _a, _b = options.user, user = _b === void 0 ? null : _b, _c = options.pass, pass = _c === void 0 ? null : _c;
        this.XHR.open(method, url, async, user, pass);
        // console.log("request open");
        // this.XHR.onprogress = function () {
        // 	console.log("downloading from API...");
        // };
        this.XHR.send(null);
        // this.XHR.onload = function () {
        // 	console.log("download completed");
        // };
        return this;
    };
    // methods ~await
    Culex.prototype.response = function (callback) {
        var _this = this;
        //
        this.XHR.onreadystatechange = function () {
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
