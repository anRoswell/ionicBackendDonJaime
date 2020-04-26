/**
 * @name DB
 * @type class
 * @description Clase encargada de realizar las tareas del CRUD en la base de datos
 * @author Jaime Castrillón <jaimecastrillon@gmail.com>
 */

const execute = require('./execute')

class DB {
	constructor(table) {
		this.table = table
	}

	async getOne(id) {
		const sql = 'SELECT * FROM ?? WHERE id=?'
		return await execute(sql, [this.table, id])
	}

	async getAll() {
		const sql = 'SELECT * FROM ??'
		return await execute(sql, [this.table])
	}

	async create(data) {
		const sql = 'INSERT INTO ?? SET ?'
		return await execute(sql, [this.table, data])
	}

	async update(data, id) {
		const sql = 'UPDATE ?? SET ? WHERE id = ?'
		return await execute(sql, [this.table, data, id])
	}

	async destroy(id) {
		const sql = 'DELETE FROM ?? WHERE id=?'
		return await execute(sql, [this.table, id])
	}

	static query(sql, params) {
		return execute(sql, params)
	}
}

module.exports = DB
