const database = require('./db/poolOracle')

const oracle = async () => {
	try {
		console.log('Initializing database module')
		database
			.then((response) => {
				console.log(response)
			})
			.catch((error) => console.log(error))
		//let connection = await database.getConnection()
	} catch (err) {
		console.error(err)

		process.exit(1) // Non-zero failure code
	}
}

oracle()
