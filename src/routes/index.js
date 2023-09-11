const routes = require("express").Router();

routes.use("/v1", require("./v1/index"));

routes.get("/", (req, res) => {
	res.json({
		name: "PARAMA-APP",
		uptime: process.uptime()
	})
});

module.exports = routes;