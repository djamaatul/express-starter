const RedisStore = require('connect-redis').default;
const redisClient = require("./redis");
const session = require("express-session");

// const redisStore = new RedisStore({
// 	client: redisClient,//default ttl 24hour,
// });

const SESSION_CONFIG = {
	// store: redisStore,
	secret: process.env.JWT_SECRET,
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: (7 * 60 * 60 * 1000) + (59 * 60 * 1000), // same with praya token, 7.59 hour
		httpOnly: true,
		secure: false,
		path: "/",
		sameSite: true
	},
	name: "_",
	unset: 'destroy'
};

if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
	SESSION_CONFIG.cookie.secure = true;
}

module.exports = () => session(SESSION_CONFIG);