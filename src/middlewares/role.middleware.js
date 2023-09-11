const handler = require("../utils/handler");
const ErrorResponse = require("../utils/ErrorResponse");

const role = (roles) => handler(async (req) => {
	if (Array.isArray(roles) && !roles.includes(req.user.roleCode)) throw new ErrorResponse("ACCESS DENIED");
	if (roles !== req.user.roleCode) throw new ErrorResponse("ACCESS DENIED");
});

module.exports = role;