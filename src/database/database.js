const mariadb = require('mariadb');

require('dotenv').config();


const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PWD,
	database: process.env.DB_DATABASE,
});

module.exports = {pool: pool};