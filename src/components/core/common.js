/*
---------------   Common --------------
@description: Common Methods
*/

/*
 * @function: store
 * @description: Storing data into local storage and return the available data's from local storage
 * @param: sessionKey unique key for local storage
 * @param: data - list of data to update in local storage
 * @return :store - list of the from local storage
 */
export function store(sessionKey, data) {
	if (data) return localStorage[sessionKey] = JSON.stringify(data);

	let store = {};
	if (typeof window !== 'undefined') {
		store = localStorage[sessionKey];
		return store && JSON.parse(store) || [];
	} else {
		return [];
	}
}

/*
 * @function: uniqueid
 * @description: Creating unique id for identify the local store objects
 * @param: none
 * @return : uniqueid - random unique id
 */
export function uniqueid() {
	let uniqueid = '';
	for (let i = 0; i < 32; i++) {
		let random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uniqueid += '-';
		}
		uniqueid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
	}
	return uniqueid;
}