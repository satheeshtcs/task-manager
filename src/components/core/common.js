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