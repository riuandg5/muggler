let handle = {};

handle.type = (e) => {
	if (typeof e === 'string') {
		return [e]
	} else if (Array.isArray(e)) {
		return e
	}
}

handle.query = (e) => {
	e = handle.type(e);
	if (e.length === 1) {
		return `'${e}' in parents`
	} else if (e.length > 1) {
		let full = ``, or = ``;
		for (let f in e) {
			full = full + or + `'${e[f]}' in parents`;
			or = ` or `;
		}
		return full;
	}
}

module.exports = handle;