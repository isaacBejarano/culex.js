"use strict";
/*
  "name": "ajaxslim.js",
  "version": "v.0_beta",
  "description": "XHR-based TS-coded library to make HTTP requests",
  "author": "Isaac Bejarano",
  "license": "GPL v.3"
*/
var AjaxSlim = /** @class */ (function () {
    function AjaxSlim() {
        AjaxSlim.list.push(this);
        // prettier-ignore
        window.XMLHttpRequest
            ? (this.XHR = new XMLHttpRequest())
            : (this.XHR = new ActiveXObject("Microsoft.XMLHTTP"));
    }
    Object.defineProperty(AjaxSlim.prototype, "getXHR", {
        // getters
        get: function () {
            return this.XHR;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AjaxSlim, "getList", {
        get: function () {
            return AjaxSlim.list;
        },
        enumerable: false,
        configurable: true
    });
    // methods
    AjaxSlim.prototype.ready = function (outlet) {
        var _this = this;
        // readySatate
        this.XHR.onreadystatechange = function () {
            var state = _this.XHR.readyState;
            var status = _this.XHR.status;
            var statusText = _this.XHR.statusText;
            switch (state) {
                case 0:
                    console.error("request not initialized\n\t\t\t\t\t\t\t\nstatus: " + status + ". " + statusText);
                    break;
                case 1:
                    console.log("Server connection established \t\t\t\t\t\t\t\nstatus: " + status + ". " + statusText);
                    break;
                case 2:
                    console.log("Request received \t\t\t\t\t\t\t\nstatus: " + status + ". " + statusText);
                    break;
                case 3:
                    console.log("Processing request... \t\t\t\t\t\t\t\nstatus: " + status + ". " + statusText);
                    break;
                case 4:
                    console.log("Response ready \t\t\t\t\t\t\t\nstatus: " + status + ". " + statusText);
                    break;
                default:
                    console.log("Wrong request \t\t\t\t\t\t\t\nstatus: " + status + ". " + statusText);
            }
            if (state === 4 && status === 200) {
                console.log(_this.XHR.getAllResponseHeaders()); // this.getResponseHeader()
                console.log(_this.XHR.responseText);
                // toString
                if (outlet && _this.XHR.responseText)
                    outlet.innerHTML = _this.XHR.responseText;
            }
        };
        // piping
        return this;
    };
    AjaxSlim.prototype.open = function (options) {
        var method = options.method, url = options.url, _a = options.async, async = _a === void 0 ? true : _a, user = options.user, pass = options.pass; // async default
        this.XHR.open(method.toUpperCase(), url, async, user, pass);
        // piping
        return this;
    };
    AjaxSlim.prototype.send = function (bodyPOST) {
        this.XHR.send(bodyPOST);
        // piping
        return this;
    };
    AjaxSlim.prototype.abort = function () {
        this.XHR.abort();
    };
    AjaxSlim.list = [];
    return AjaxSlim;
}());
/*

/// Example 1 -> tipical fetch flow ///

window.onload = () => {
    // outlet is optional
    const outlet = document.getElementById("my-outlet") as HTMLElement | undefined;

    // 1. options are compulsory
    const options = {
        method: "GET", // is toUpperCase
        url: "https://api.wheretheiss.at/v1/satellites/25544",
        async: true,
        user: null,
        pass: null,
    };

    // 2. instance of new XHR Ajax connection
    const ajax = new AjaxSlim();

    // 3. use piped methods in following order
    ajax
        .ready(outlet) // OR ready()
        .open(options)
        .send(); // OR send(body)

    // 4. error handling
    if (!new RegExp(/^(GET|POST|PUT|DELETE)$/i).test(options.method)) {
        ajax.abort();
        console.warn(`method "${options.method}" is wrong formulated`);
    }
};


/// Example 2 --> event to abort ///

document.getElementById("btn-abort-ajax")?.addEventListener("click", abortLastConnection);

function abortLastConnection() {
    const lastConnection: AjaxSlim = AjaxSlim.getList[AjaxSlim.getList.length - 1];
    lastConnection.getXHR.abort();
    console.warn(`connection aborted.	\nstatus: ${lastConnection.getXHR.readyState}`);
}

*/
