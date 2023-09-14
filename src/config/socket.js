const { createAdapter } = require("@socket.io/redis-adapter");
const socketIo = require('socket.io');

const redisClient = require('./redis');

const io = socketIo();

(async () => {
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}

	const pubClient = redisClient.duplicate();
	const subClient = pubClient.duplicate();

	await Promise.all([pubClient.connect(), subClient.connect()]);

	io.adapter(createAdapter(pubClient, subClient));
})();

io.on('connection', function (socket) {
	console.log("Some user connected on ID: ", socket.id)
});

module.exports = io;