const service = require("../services/auth.service");
const schema = require("../schemas/auth.schema");

const handler = require("../utils/handler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.login = handler(
	async function (req) {
		
		// req.onError = (error) => {
		// 	console.log("SOME ERROR", error);
		// };

		const data = await service.login(req.body);

		req.session.user = data;

		return {
			data
		};
	},
	() => ({
		body: schema.login
	})
);

exports.auth = handler(async (req) => {
	const session = req.user;

	if (!session) throw new ErrorResponse("Session has expired or session not found", 401);

	const { token, ...data } = session;

	return {
		data
	};
});