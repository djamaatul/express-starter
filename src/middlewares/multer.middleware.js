const multer = require("multer");

const fileFilter = (req, file, cb) => {
	if (!file.originalname.toLowerCase().match(/\.(ppt|pptx|pdf|xls|xlsx|mp4|zip|txt|csv|doc|docm|docx|docx|jpg|png|gif|apng|svg|bmp|ico)$/)) {
		req.fileValidationError = 'Upload Denied: Extention File not valid';
		return cb(null, false);
	}
	return cb(null, true);
};

const upload = multer({
	fileFilter,
	limits: {
		fileSize: 25 * 1024 * 1024, //25mb
		fieldSize: 4 * 1024 * 1024,
	},
}).any();

exports.uploadToMemory = (req, res, next) => {
	upload(req, res, err => {
		if (req.fileValidationError) {
			return res.status(403).send({
				code: 403,
				message: req.fileValidationError
			});
		}
		if (err instanceof multer.MulterError || err) {
			next({
				name: err.code,
				code: 400,
				message: err.name
			});
		} else {
			next();
		}
	});
}
