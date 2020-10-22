/*
  "name": "ajaxslim.js",
  "version": "v.0_beta",
  "description": "XHR-based TS-coded library to make HTTP requests",
  "author": "Isaac Bejarano",
  "license": "GPL v.3"
*/

// interface segregation
interface i_Options {
	method: string;
	url: string;
	async?: boolean;
	user?: string | null;
	pass?: string | null;
}

class AjaxSlim {
	private static list: AjaxSlim[] = [];
	private XHR: XMLHttpRequest;

	constructor() {
		AjaxSlim.list.push(this);
		// prettier-ignore
		window.XMLHttpRequest
			? (this.XHR = new XMLHttpRequest())
			: (this.XHR = new ActiveXObject("Microsoft.XMLHTTP"));
	}

	// getters
	get getXHR() {
		return this.XHR;
	}

	static get getList(): AjaxSlim[] {
		return AjaxSlim.list;
	}

	// methods
	ready(outlet?: HTMLElement | undefined): AjaxSlim {
		// readySatate
		this.XHR.onreadystatechange = () => {
			const state = this.XHR.readyState;
			const status = this.XHR.status;
			const statusText = this.XHR.statusText;

			switch (state) {
				case 0:
					console.error(`request not initialized
							\nstatus: ${status}. ${statusText}`);
					break;
				case 1:
					console.log(`Server connection established \
							\nstatus: ${status}. ${statusText}`);
					break;
				case 2:
					console.log(`Request received \
							\nstatus: ${status}. ${statusText}`);
					break;
				case 3:
					console.log(`Processing request... \
							\nstatus: ${status}. ${statusText}`);
					break;
				case 4:
					console.log(`Response ready \
							\nstatus: ${status}. ${statusText}`);
					break;
				default:
					console.log(`Wrong request \
							\nstatus: ${status}. ${statusText}`);
			}

			if (state === 4 && status === 200) {
				console.log(this.XHR.getAllResponseHeaders()); // this.getResponseHeader()
				console.log(this.XHR.responseText);

				// toString
				if (outlet && this.XHR.responseText) outlet.innerHTML = this.XHR.responseText;
			}
		};

		// piping
		return this;
	}

	open(options: i_Options): AjaxSlim {
		let { method, url, async = true, user, pass } = options; // async default
		this.XHR.open(method.toUpperCase(), url, async, user, pass);

		// piping
		return this;
	}

	send(bodyPOST?: string): AjaxSlim {
		this.XHR.send(bodyPOST);

		// piping
		return this;
	}

	abort(): void {
		this.XHR.abort();
	}

	// setCredentials

	// async: true,
	// user: null,
	// pass: null,
}


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




