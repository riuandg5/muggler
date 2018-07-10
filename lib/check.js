let check = {};

check.forAuth = (info, cb) => {
	if (typeof info !== 'object') {
		return cb(`MugErr: Object parameter expected!\nUnexpected parameter: '${info}' is ${typeof info}`)
	} else if (Object.keys(info).length < 1 || !info.hasOwnProperty('email') || !info.hasOwnProperty('key')) {
		return cb(`MugErr: Query needed!\nMissing: 'email' [required] or 'key' [required]`)
	} else if (typeof info.email !== 'string' || typeof info.key !== 'string') {
		return cb(`MugErr: Array or String value expected for both 'email' and 'key'!`)
	} else if (info.email.length < 1 || info.key.length < 1) {
		return cb(`MugErr: Query empty! Provide 'email' and 'key' both`)
	} else {
		return cb(null)
	}
}

check.forUpOne = (info, cb) => {
	if (typeof info !== 'object') {
		return cb(`MugErr: Object parameter expected!\nUnexpected parameter: '${info}' is ${typeof info}`)
	} else if (Object.keys(info).length < 1 || !info.hasOwnProperty('fromfield') || !info.hasOwnProperty('infolder')) {
		return cb(`MugErr: Query needed!\nMissing: 'fromfield' [required] or 'infolder' [required]`)
	} else if (typeof info.fromfield !== 'string') {
		return cb(`MugErr: Array or String value expected for 'fromfield'!\nUnexpected value: ${typeof info.fromfield}`)
	} else if (info.fromfield.length < 1) {
		return cb(`MugErr: Query empty! No 'fromfield' specified`)
	} else if (!Array.isArray(info.infolder) && typeof info.infolder !== 'string') {
		return cb(`MugErr: Array or String value expected for 'infolder'!\nUnexpected value: ${typeof info.infolder}`)
	} else if (info.infolder.length < 1) {
		return cb(`MugErr: Query empty! No 'infolder' specified`)
	} else {
		return cb(null)
	}
}

check.forListAll = (info, cb) => {
	if (typeof info !== 'object') {
		return cb(`MugErr: Object parameter expected!\nUnexpected parameter: '${info}' is ${typeof info}`)
	} else if (Object.keys(info).length < 1 || !info.hasOwnProperty('infolder')) {
		return cb(`MugErr: Query needed!\nMissing: 'infolder' [required]`)
	} else if (!Array.isArray(info.infolder) && typeof info.infolder !== 'string') {
		return cb(`MugErr: Array or String value expected for 'infolder'!\nUnexpected value: ${typeof info.infolder}`)
	} else if (info.infolder.length < 1) {
		return cb(`MugErr: Query empty! No 'infolder' specified`)
	} else {
		return cb(null)
	}
}

check.forDelOne = (info, cb) => {
	if (typeof info !== 'object') {
		return cb(`MugErr: Object parameter expected!\nUnexpected parameter: '${info}' is ${typeof info}`)
	} else if (Object.keys(info).length < 1 || !info.hasOwnProperty('fileid')) {
		return cb(`MugErr: Query needed!\nMissing: 'fileid' [required]`)
	} else if (typeof info.fileid !== 'string') {
		return cb(`MugErr: String value expected for 'fileid'!\nUnexpected value: ${typeof info.fileid}`)
	} else if (info.fileid.length < 1) {
		return cb(`MugErr: Query empty! No 'fileid' specified`)
	} else {
		return cb(null)
	}
}

module.exports = check;