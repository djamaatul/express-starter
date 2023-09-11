const service = require("../services/auth.service");
const schema = require("../schemas/auth.schema");

const validator = require("../utils/validator");
const handler = require("../utils/handler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.login = handler(async (req) => {

	await validator(req.body, schema.login);

	const data = await service.login(req.body);

	req.session.user = data

	return {
		data
	};
});

exports.auth = handler(async (req) => {
	const session = req.user;

	if (!session) throw new ErrorResponse("Session has expired or session not found", 401);

	const { token, ...data } = session;

	return {
		data
	};
});