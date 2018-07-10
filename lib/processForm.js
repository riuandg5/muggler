const multer = require("multer");
const upload = multer({
	storage: multer.diskStorage({
		destination: "./tempUploads",
		filename: (req, file, cb) => {cb(null, file.originalname)}
	})
});

function processForm (field, req, cb) {
	upload.single(field)(req, {}, (err, processed) => {
		if (err) {
			return cb(err, null)
		} else {
			return cb(null, req)
		}
	})
}

module.exports = processForm;