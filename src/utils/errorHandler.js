const errorHandler = (error, req, res, next) => {

	console.log(error);

	let code = error.code || 500;
	let message = error.message;
	let detail = null;

	//when error axios
	if (error.response) {
		code = error.response.status;
		message = message;
		detail = error.response.data;
	}

	return res.status(+code || 500).json({
		code: 0,
		message: message,
		detail
	});
};

module.exports = errorHandler;