const ErrorResponse = require("../utils/ErrorResponse");
const handler = require("../utils/handler");
const safe = require("../utils/safe");

const { jwtVerifier } = require("../workers");

const auth = handler(async (req) => {
	const { authorization = "" } = req.headers;

	const session = req.session.user;

	const token = authorization.match(/(?<=Bearer\s).+/)?.[0] || null;

	if (!token && !session && req.baseUrl !== "/v1/auth/auth") throw new ErrorResponse("No Authorization", 401);

	if (session) {
		req.headers.authorization = `Bearer ${session.token}`;
		req.user = session;
	} else {
		const [_, user] = await safe(() => jwtVerifier(token));
		req.user = user;
	}
});

module.exports = auth;