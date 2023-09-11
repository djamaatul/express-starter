const { Sequelize } = require("sequelize");

let config = {
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	logging: false,
	pool: {
		max: 5,
		min: 2,
		idle: 20000,
		acquire: 20000,
	},
	// logging: process.env.LOCAL ? console.log : false
};

const parama = new Sequelize(
	process.env.DB_SCHEMA,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	config
);

parama.authenticate().then(() => {
	console.log("CONNECTED TO DB");
}).catch((error) => {
	console.log("FAIL CONNECTING TO DB", error);
});

module.exports = parama;
