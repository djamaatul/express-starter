const { Worker } = require("worker_threads");

exports.jwtVerifier = async (token) => {
	return new Promise((res, rej) => {
		const worker = new Worker("./src/workers/jwtVerifyWorker.js", {
			workerData: { token, secret: process.env.JWT_SECRET }
		});
		worker.addListener("message", (data) => {
			res(data);
		});
		worker.addListener("error", (error) => {
			rej(error);
		});
	});
};

exports.jwtSigner = async (data) => {
	return new Promise((res, rej) => {
		const worker = new Worker("./src/workers/jwtSignWorker.js", {
			workerData: { data, secret: process.env.JWT_SECRET, options: { expiresIn: "24h" } }
		});
		worker.addListener("message", (data) => {
			res(data);
		});
		worker.addListener("error", (error) => {
			rej(error);
		});
	});
};

exports.generateSecretKey = async (data) => {
	return new Promise((res, rej) => {
		const worker = new Worker("./src/workers/generateSecretKey.js", {
			workerData: { data }
		});
		worker.addListener("message", (data) => {
			res(data);
		});
		worker.addListener("error", (error) => {
			rej(error);
		});
	});
};

exports.encrypter = async (data, secretKey = "+)_(&*^$%#!@") => {
	return new Promise((res, rej) => {
		const worker = new Worker("./src/workers/encryptWorker.js", {
			workerData: { data, secretKey: process.env.SECRET_KEY + "_" + secretKey }
		});
		worker.addListener("message", (data) => {
			res(data);
		});
		worker.addListener("error", (error) => {
			rej(error);
		});
	});
};

exports.decrypter = async (data, secretKey = "+)_(&*^$%#!@") => {
	return new Promise((res, rej) => {
		const worker = new Worker("./src/workers/decryptWorker.js", {
			workerData: { data, secretKey: process.env.SECRET_KEY + "_" + secretKey }
		});
		worker.addListener("message", (data) => {
			res(data);
		});
		worker.addListener("error", (error) => {
			rej(error);
		});
	});
};