const { parentPort, workerData } = require("worker_threads")
const cryptoJs = require("crypto-js");
const ErrorResponse = require("../utils/ErrorResponse");

const decrypted = cryptoJs.AES.decrypt(workerData.data, workerData.secretKey)
let data
try {
	data = decrypted.toString(cryptoJs.enc.Utf8)
	data = JSON.parse(data)
	parentPort.close()
} catch (error) {
	throw new ErrorResponse(`Forbidden: Access Denied`,403)
}

parentPort.postMessage(data)