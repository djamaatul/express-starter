const Joi = require("joi");

const ErrorResponse = require("./ErrorResponse");

const CustomJoi = Joi.defaults((schema) => {
	switch (schema.type) {
		case 'string':
			return schema.allow('');
		case 'object':
			return schema.unknown(true);
		default:
			return schema;
	}
});

const validator = async (data, cb) => {
	const { error, ...result } = await cb(CustomJoi).validateAsync(data, {
		abortEarly: false
	});

	if (error) throw new ErrorResponse(error.message, 500);

	return { error, ...result };
};

module.exports = validator;
