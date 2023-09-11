exports.login = (joi) => joi.object({
	username: joi.string().required(),
	password: joi.string().required()
});