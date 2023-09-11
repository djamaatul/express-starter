const db = require("../config/database");
const handler = require("../utils/handler");

const transaction = (name) => handler(async (req, _, next) => {
	req.t = await db[name].transaction({
		autoCommit: false,
		autoCommitTransactionalOFF: true,
	});
	next();
});

module.exports = transaction;