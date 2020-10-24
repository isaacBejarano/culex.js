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
const input = document.getElementById("input-url") as HTMLInputElement;
const btnFetch = document.getElementById("btn-fetch") as HTMLButtonElement;
const btnAbort = document.getElementById("btn-abort") as HTMLButtonElement;
const outlet = document.getElementById("outlet") as HTMLElement;

// 1. options
const options: i_Options = {
	method: "GET",
	url: "",
	async: true, // always
};

// 2. new XHR connection
let XHR = new Culex();

// 3. EVENTS - fetch data || abort
btnFetch.addEventListener("click", function () {
	// get url
	options.url = input.value;

	// prettier-ignore
	XHR
	.request(options)
	.response((data: string) => {
		let body = JSON.parse(data); // -> object	


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
function toDOM(body: object | string) {
	let printable: string = "";
	const toString = Object.prototype.toString;

	if (toString.call(body) === "[object String]") printable = body as string;
	if (toString.call(body) === "[object Object]") printable = travereseObject(body as object);
	// if (toString.call(body) === "[object Array]") printable = travereseArray(body as object[]);

	// toString + CSS
	outlet.innerHTML = printable;
	outlet.classList.add("outlet-dynamic");
}

function travereseObject(body: object | any): string {
	let printable = "";

	for (let key in body) {
		printable += `<span>${key}</span>: ${body[key]}<br/>`; // any
	}

	return printable;
}

function toConsole(body: object | string) {
	console.log(body);
}

// TEST ~async
// setTimeout(() => XHR.abort(), 50);
