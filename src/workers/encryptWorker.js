const { parentPort, workerData } = require("worker_threads")
const cryptoJs = require("crypto-js")

const encrypted = cryptoJs.AES.encrypt(workerData.data, workerData.secretKey)

parentPort.postMessage(encrypted.toString())
parentPort.close()