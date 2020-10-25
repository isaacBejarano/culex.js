/* WORKFLOW EXAMPLE */

// refs
const input = document.getElementById("input-url") as HTMLInputElement;
const btnFetch = document.getElementById("btn-fetch") as HTMLButtonElement;
const btnAbort = document.getElementById("btn-abort") as HTMLButtonElement;
const outlet = document.getElementById("outlet") as HTMLElement;

// 1. options
let options: i_Options = {
	method: "GET",
	url: "",
	// url e.g.[] https://jsonplaceholder.typicode.com/posts
	// url e.g.{} https://api.wheretheiss.at/v1/satellites/25544
};

// 2. new connection
let culex = new Culex();

// 3. EVENTS - fetch data || abort
btnFetch.addEventListener("click", function () {
	// set url
	options.url = input.value;

	// fetch with options
	culex.request(options).response((data: string) => {
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
function toDOM(data: object | string) {
	let printable: string = "";
	const toString = Object.prototype.toString;

	if (toString.call(data) === "[object String]") printable = data as string;
	if (toString.call(data) === "[object Object]") printable = travereseObject(data as object);
	if (toString.call(data) === "[object Array]") printable = travereseArray(data as object[]);

	// toString + CSS
	outlet.innerHTML = printable;
	outlet.classList.add("outlet-dynamic");
}

function travereseObject(data: object | any): string {
	let printable = "";

	for (let key in data) {
		printable += `<p><span>${key}</span>: ${data[key]}</p>`; // data[key] is any
	}

	return `<li>${printable}</li>`;
}

function travereseArray(data: (object | any)[]): string {
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

function toConsole(data: object | string) {
	console.log(data);
}
