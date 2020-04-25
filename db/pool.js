const mysql = require('mysql')

const pool = mysql.createPool({
	connectionLimit: 10,
	host: '209.126.4.101',
	user: 'app_user',
	password: 'A3ZpTwIOS6iD2ByWaCs-K64&8yHsP.',
	database: 'PROYECTO_APP',
})

module.exports = pool
