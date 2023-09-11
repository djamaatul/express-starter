const proxy = require("express-http-proxy");

const proxyConfig = (url) =>
	proxy(url, {
		proxyReqPathResolver: (req) => {
			const path = req.originalUrl.replace(/\/\d+(?=\/)/, "");
			return path;
		},
		userResHeaderDecorator(headers, req) {
			headers["access-control-allow-origin"] = req.headers["origin"] || "null";
			return headers;
		}
	});

module.exports = proxyConfig;