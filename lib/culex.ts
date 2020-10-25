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

interface i_Options {
	method: string;
	url: string;
	async?: boolean;
	user?: string | null;
	pass?: string | null;
}

class Culex {
	public XHR: XMLHttpRequest;
	// prettier-ignore
	constructor() {
		window.XMLHttpRequest
			? (this.XHR = new XMLHttpRequest())
			: (this.XHR = new ActiveXObject("Microsoft.XMLHTTP"));
	}

	// methods ~async
	request(options: i_Options): Culex {
		let { method, url, async = true, user = null, pass = null } = options;

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
	}

	// methods ~await
	response(callback: Function): void {
		//
		this.XHR.onreadystatechange = () => {
			// ERROR handling
			if (this.XHR.readyState === 4 && this.XHR.status === 200) {
				try {
					callback(JSON.parse(this.XHR.responseText));
				} catch {
					console.warn("options invalid or unexistent");
				}
			}
		};
	}

	// methods
	abort(): void {
		this.XHR.abort();
		console.warn("connection aborted");
	}
}

class Printer {
	// toDOM(data);
	// toDOM(JSON.stringify(data));
	// toConsole(data);
	// toConsole(JSON.stringify(data));
}
