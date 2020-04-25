const oracledb = require('oracledb')

const stringConnection = `Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=172.18.41.15)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=SISPASEO)))`

const pool = oracledb.createPool({
	user: process.env.HR_USER || 'apppanama',
	password: process.env.HR_PASSWORD || 'P4n4m42020',
	connectString: process.env.HR_CONNECTIONSTRING || stringConnection,
	poolMin: 10,
	poolMax: 10,
	poolIncrement: 0,
})

module.exports = pool
