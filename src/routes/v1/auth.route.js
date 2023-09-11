const routes = require("express").Router();
const controller = require("../../controllers/auth.controller");
const auth = require("../../middlewares/auth.midlleware");

routes.post("/login", controller.login);
routes.get("/auth", auth, controller.auth);

module.exports = routes;