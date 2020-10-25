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
const input = document.getElementById("input-url") as HTMLInputElement;
const btnFetch = document.getElementById("btn-fetch") as HTMLButtonElement;
const btnAbort = document.getElementById("btn-abort") as HTMLButtonElement;
const outlet = document.getElementById("outlet") as HTMLElement;

// 1. options -> method + url are compulsory!
let options: i_Options = {
	method: "GET",
	url: "",
	// contentType: "application/x-www-form-urlencoded",
	// user: "",
	// pass: "",
};

// 2. new connection + printer
let culex = new Culex();
let printer = new Printer();

// 3. EVENTS - fetch data || abort
btnFetch.addEventListener("click", function () {
	options.url = input.value; // set up url dynamically

	// fetch with options
	culex.request(options).response((data: string) => {
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
function toDOM(data: object | string) {
	let printable: string = "";
	const toString = Object.prototype.toString;

	if (toString.call(data) === "[object String]") printable = data as string;
	if (toString.call(data) === "[object Object]") printable = travereseObjectDOM(data as object);
	if (toString.call(data) === "[object Array]") printable = travereseArrayDOM(data as object[]);

	// toString + CSS
	outlet.innerHTML = printable;
	outlet.classList.add("outlet-dynamic");
}

function toConsole(data: object | string) {
	console.log(data);
}

function toAlert(data: object | string) {
	let printable = "";
	let warningMsg = "Array too long to alert().\nTry another output method, like console.log()";

	if (toString.call(data) === "[object String]")
		printable = (data as string).length <= 1750 ? (data as string) : warningMsg;
	if (toString.call(data) === "[object Object]") printable = travereseObjectAlert(data as object);
	if (toString.call(data) === "[object Array]") printable = warningMsg;

	alert(printable);
}

/* AUX */

function travereseObjectDOM(data: object | any): string {
	let printable = "";

	for (let key in data) {
		printable += `<p><span>${key}</span>: ${data[key]}</p>`; // data[key] is any
	}

	return `<li>${printable}</li>`;
}

function travereseArrayDOM(data: (object | any)[]): string {
	let printable = "";
	// array
	for (let obj of data) {
		// object
		printable += "<li>";
		for (let key in obj) {
			printable += `<p><span>${key}</span>: ${obj[key]}</p>`; // data[key] is any
		}
		printable += "</li>";
	}

	return printable;
}

function travereseObjectAlert(data: object | any): string {
	let printable = "";

	for (let key in data) {
		printable += `${key}: ${data[key]}\n`; // data[key] is any
	}

	return printable;
}
