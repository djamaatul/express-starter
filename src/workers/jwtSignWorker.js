const { parentPort, workerData } = require("worker_threads")
const jwt = require("jsonwebtoken")

jwt.sign(workerData.data, workerData.secret, workerData.options, cb)

function cb(err, decoded) {
	if (err) throw err
	parentPort.postMessage(decoded)
	parentPort.close()
}