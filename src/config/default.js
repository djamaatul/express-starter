const os = require("os")
const CPUS = os.cpus().length

process.env.UV_THREADPOOL_SIZE = CPUS * 2; // set thread worker

module.exports = {
	cors: {
		credentials: true,
		origin: [
		]
	}
};