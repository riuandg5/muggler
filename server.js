const customError = require("./lib/customError");
const check       = require("./lib/check");
const processForm = require("./lib/processForm");
const handle      = require("./lib/handle");
const fs          = require('fs');
const {google}    = require('googleapis');
const drive       = google.drive({version: 'v3'});

function Muggler (email, key) {
	this.jwtClient = new google.auth.JWT(
		email,
		null,
		key,
		['https://www.googleapis.com/auth/drive'],
		null
	)
	this.jwtClient.authorize(function(err){
		if (err) {
			console.log(customError(`MugErr: Google Drive authorization failed!\n${err}`));
		}
	})
}

Muggler.prototype.upOne = function (info, req, cb) {
	check.forUpOne(info, (err) => {
		if (err) {
			return cb(customError(err), {
				status: `Encountered error`,
				mug: []
			})
		} else {
			processForm(info.fromfield, req, (err) => {
				if (err) {
					return cb(customError(`MugErr: Form processing failed!\n${err}`), {
						status: `Encountered error`,
						mug: []
					})
				} else {
					info.infolder = handle.type(info.infolder);
					var fileMetadata = {name: req.file.originalname, parents: info.infolder};
				    var media = {
				        mimeType: req.file.mimetype,
				        body: fs.createReadStream(`./tempUploads/${req.file.originalname}`)
				    };
					drive.files.create({auth: this.jwtClient, resource: fileMetadata, media, fields: 'id, parents'}, (err, res) => {
						if (err){
							return cb(customError(`MugErr: File uploading failed! Couldn't connect to google drive.\n${err}`), {
								status: `Encountered error`,
								mug: []
							})
						} else {
							fs.unlink(`./tempUploads/${req.file.originalname}`, (err) => {})
							var Mug = {
								file: req.file,
								status: `File uploaded`,
								mug: {
									id: res.data.id,
									name: req.file.originalname,
									mimeType: req.file.mimetype,
									size: req.file.size,
									parents: res.data.parents,
									url: `https://drive.google.com/file/d/${res.data.id}/view`
								},
								body: req.body
							};
							delete req.file;
							delete req.body;
							return cb(null, Mug)
						}
					})
				}
			})
		}
	})
}

Muggler.prototype.listAll = function (info, cb) {
	check.forListAll(info, (err) => {
		if (err) {
			return cb(customError(err), {
				status: `Encountered error`,
				mug: []
			})
		} else {
			info.infolder = handle.query(info.infolder);
			drive.files.list({auth: this.jwtClient, q: `${info.infolder} and mimeType!='application/vnd.google-apps.folder'`}, (err, res) => {
				if (err) {
					return cb(customError(`MugErr: Files listing failed! Couldn't connect to google drive.\n${err}`), {
						status: `Encountered error`,
						mug: []
					})
				} else {
					return cb(null, {
						status: `Files founded`,
						mug: res.data.files
					})
				}
			})
		}
	})
}

Muggler.prototype.delOne = function (info, cb) {
	check.forDelOne(info, (err) => {
		if (err) {
			return cb(customError(err), {
				status: `Encountered error`,
				mug: []
			})
		} else {
			drive.files.delete({ auth: this.jwtClient, fileId: info.fileid}, (err, res) => {
		        if (err) {
					return cb(customError(`MugErr: File deletion failed! Couldn't connect to google drive.\n${err}`), {
						status: `Encountered error`,
						mug: []
					})
		        } else {
		        	return cb(null, {
		        		status: `File deleted`,
		        		mug: []
		        	})
		        }
		    })
		}
	})
}

function muggler (info) {
	return check.forAuth(info, (err) => {
		if (err) {
			throw customError(err)
		} else {
			return new Muggler (info.email, info.key)
		}
	})
}

module.exports = muggler;