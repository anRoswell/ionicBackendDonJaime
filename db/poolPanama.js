const mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST_Panama,
	user: process.env.DB_USER_Panama,
	password: process.env.DB_PASSWORD_Panama,
	database: process.env.DB_NAME_Panama,
})

module.exports = pool
