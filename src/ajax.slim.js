"use strict";
/*
  "name": "culex.js",
  "version": "v.0_beta",
  "description": "Lightweight XHR-based TS-coded library to make HTTP requests",
  "author": "Isaac Bejarano",
  "license": "GPL v.3"
*/
var Culex = /** @class */ (function () {
    // public body: string = "";
    function Culex() {
        // Culex.list.push(this);
        // prettier-ignore
        window.XMLHttpRequest
            ? (this.XHR = new XMLHttpRequest())
            : (this.XHR = new ActiveXObject("Microsoft.XMLHTTP"));
    }
    // getters
    // get getXHR() {
    // 	return this.XHR;
    // }
    // static get getList(): Culex[] {
    // 	return Culex.list;
    // }
    // methods
    // ~async
    Culex.prototype.request = function (options) {
        var method = options.method, url = options.url, _a = options.user, user = _a === void 0 ? null : _a, _b = options.pass, pass = _b === void 0 ? null : _b;
        this.XHR.open(method, url, true, user, pass);
        console.log("request open");
        this.XHR.onprogress = function () {
            console.log("downloading from API...");
        };
        this.XHR.send(null);
        console.log("request sent");
        this.XHR.onload = function () {
            console.log("download completed");
        };
        return this;
    };
    // ~await
    Culex.prototype.response = function (callback) {
        var _this = this;
        this.XHR.onreadystatechange = function () {
            if (_this.XHR.readyState === 4 && _this.XHR.status === 200)
                callback(_this.XHR.responseText); // str
        };
    };
    Culex.prototype.abort = function () {
        this.XHR.abort();
        console.warn("connection aborted");
    };
    return Culex;
}());
// ready(outlet?: HTMLElement | undefined): void {
// onreadystatechange is AWAIT, every time status changes it 's called
// ready(): void {
// 	this.XHR.onreadystatechange = function () {
// 		// let state = this.XHR.readyState;
// 		// let status = this.XHR.status;
// 		// let statusText = this.XHR.statusText;
// 		console.log("readyState", this.readyState, "status", this.status);
// 		// data available
// 		if (this.readyState === 3 && this.status === 200) {
// 			console.log("downloading...");
// 			console.log("body 3", this.statusText);
// 		}
// 		if (this.readyState === 4 && this.status === 200) {
// 			// switch (state) {
// 			// 	case 0:
// 			// 		console.error(`request not initialized
// 			// 				\nstatus: ${status}. ${statusText}`);
// 			// 		break;
// 			// 	case 1:
// 			// 		console.log(`Server connection established \
// 			// 				\nstatus: ${status}. ${statusText}`);
// 			// 		break;
// 			// 	case 2:
// 			// 		console.log(`Request received \
// 			// 				\nstatus: ${status}. ${statusText}`);
// 			// 		break;
// 			// 	case 3:
// 			// 		console.log(`Processing request... \
// 			// 				\nstatus: ${status}. ${statusText}`);
// 			// 		break;
// 			// 	case 4:
// 			// 		console.log(`Response ready \
// 			// 				\nstatus: ${status}. ${statusText}`);
// 			// 		break;
// 			// 	default:
// 			// 		console.log(`Wrong request \
// 			// 				\nstatus: ${status}. ${statusText}`);
// 			// }
// 			console.log("HEADERS\n", this.getAllResponseHeaders()); // this.getResponseHeader()
// 			// toString
// 			// if (outlet && this.XHR.responseText) outlet.innerHTML = this.XHR.responseText;
// 			console.log("body 4", this.statusText);
// 		}
// 		if (this.statusText !== "") console.log("END", this.statusText);
// 	};
// 	// piping
// 	// return this;
// }
// open(options: i_Options): Ajax {
// 	let { method, url, async = true, user, pass } = options; // async default
// 	this.XHR.open(method.toUpperCase(), url, async, user, pass);
// 	// piping
// 	return this;
// }
// send(bodyPOST?: string): Ajax {
// 	this.XHR.send(bodyPOST);
// 	// piping
// 	return this;
// }
// abort(): void {
// 	this.XHR.abort();
// }
// setCredentials
// async: true,
// user: null,
// pass: null,
/*

// https://jsonplaceholder.typicode.com/

"readyState"
            0: unset
            1: open() is called
            2: send() is called -> headers + status available
            3: downloading... -> responseText holds partial data
            4: downloading complete -> now we can maipulate data


// 0. outlet is optional
const outlet1 = document.getElementById("outlet") as HTMLElement;
const urn = "https://jsonplaceholder.typicode.com/";
const endpoint = "posts";

// 1. options are compulsory
const options = {
    method: "GET",
    url: urn + endpoint,
    async: true, // always
};

// 2. new XHR connection
const XHR = new XMLHttpRequest();

// 3. ~ASYNC
XHR.open(
    // prettier-ignore
    options.method,
    options.url,
    options.async
    // options.user,
    // options.pass,
);
console.log("OPENED", XHR.readyState);

XHR.onprogress = function () {
    console.log("LOADING...", XHR.readyState); // readyState will be 3
};

XHR.onload = function () {
    console.log("DONE", XHR.readyState); // readyState will be 4
};

XHR.send(null);

// 4. ~AWAIT
XHR.onreadystatechange = () => {
    if (XHR.readyState === 4 && XHR.status === 200) outputter(XHR.responseText);
};

// 5. single responsability
function outputter(body: string): void {
    toDOM(JSON.parse(body));
    toConsole(JSON.parse(body));
}

// AUX

function toDOM(body: []) {
    // define DOM injection here

    for (let obj of body) {
        outlet1.innerHTML += `
            <h2>${obj["title"]}</h2>
            <p>${obj["body"]}</p>
        `;
    }
}

function toConsole(body: object[]) {
    console.log(body);
}

// EVENT -> abort connection
function abortXHR() {
    XHR.abort();
    console.warn("connection aborted");
}

*/
