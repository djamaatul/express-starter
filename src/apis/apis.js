const axios = require("axios");

const fetcher = (method, url) => (config = {}) => {

	config = {
		url,
		method,
		...config
	};

	if (["POST", "PUT", "PATCH"].includes(method)) {
		config.data = config.payload;
	} else {
		config.params = config.payload;
	}

	return axios(config);
};

const APIS = {
};

module.exports = APIS