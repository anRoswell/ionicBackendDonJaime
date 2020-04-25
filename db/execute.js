/**
 * @name execute
 * @type function
 * @description Función encargada de realizar la ejecución de las consultas en la base de datos
 * @author Jaime Castrillón <jaimecastrillon@gmail.com>
 */

const pool = require('./pool')

const execute = async (sql, params = []) => {
	return new Promise((resolve, reject) => {
		try {
			pool.getConnection((error, connection) => {
				if (error || !connection) {
					console.log('Error:', error)
					reject(error)
				}

				const query = connection.query(sql, params, (error, results) => {
					if (error) {
						reject(error)
					}
					connection.release()
					resolve(results)
				})

				console.log(query.sql)
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = execute
