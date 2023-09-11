const { parentPort, workerData } = require("worker_threads")
const jwt = require("jsonwebtoken")

jwt.verify(workerData.token, workerData.secret, cb)

function cb(err, decoded) {
	if (err) throw err
	parentPort.postMessage(decoded)
	parentPort.close()
}