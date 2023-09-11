const routes = require("express").Router();

routes.use("/auth", require("./auth.route"));

module.exports = routes;