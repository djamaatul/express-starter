const { createClient } = require('redis');

//1 server 1 connection redis
const redisClient = createClient({
	url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
	disableOfflineQueue: true,
	pingInterval: 4 * 60 * 1000, //ping every 4 minute to keep alive before timeout
	socket: {
		reconnectStrategy: function (retries) {
			console.error(`${retries} : RECONNECTING  TO REDIS SERVER : `);
			// retries > 4 = wait 10 second
			if (retries > 4) {
				return 10 * 1000;
			}
			//try reconnect retries * 1000
			return retries * 1000;
		},
	},
})
	.on("connect", () => console.error(`CONNECTING TO REDIS SERVER ON HOST : ${process.env.REDIS_HOST} ..`))
	.on("ready", () => console.error(`REDIS SERVER CONNNECTED`))
	.on("error", (err) => console.error("ERROR REDIS. ", err.message));

// (async () => {
// 	//prevent server stopped
// 	try {
// 		//initial connection
// 		await redisClient.connect();
// 	} catch (err) {
// 		console.error(new Date().toJSON(), ' : RE/CONNECT TO REDIS SERVER FAILED ', err);
// 	}
// })();

module.exports = redisClient;