const http = require("http");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const config = require("config");
const fs = require("fs");
const path = require("path");

const routes = require("./routes");
const errorHandler = require("./utils/errorHandler");
const session = require("./config/session");
const proxyConfig = require("./config/proxy");
const moment = require("moment");

const app = express();

//middleware
app.use(session());
app.use(helmet());
app.use(cors(config.get("cors")));
app.use(express.json());
app.use(morgan(":date[web] - [:method] :url :status :response-time[1] ms", {
	// stream: fs.createWriteStream(path.join(__dirname, `logs/${moment().format("HH:mm DD-MM-YYYY")}.log`), { flags: 'a' })
}));

//api routes
app.use(routes);

//proxy
// app.all("/8016/*", proxyConfig());

//not found route
app.use((req, res) => {
	res.sendStatus(404);
});

//error handler
app.use(errorHandler);

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
	console.log("LISTENING ON PORT :", port);
});

module.exports = server;