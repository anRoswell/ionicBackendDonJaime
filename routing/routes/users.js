const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('USERS')

router
	.get('/users', async (req, res) => {
		try {
			const users = await db.getAll()
			res.json({ users })
		} catch (error) {
			res.json({ error })
		}
	})
	.get('/users/:id', async (req, res) => {
		try {
			const {
				params: { id },
			} = req
			const [users] = await db.getOne(id)
			res.json({ users })
		} catch (error) {
			res.json({ error })
		}
	})
	.post('/users', async (req, res) => {
		try {
			const data = req.body
			const response = await db.create(data)
			res.json({ status: 'ok', response })
		} catch (error) {
			res.json({ status: 'error', error })
		}
	})
	.put('/users/:id', async (req, res) => {
		try {
			const { body: data } = req
			const {
				params: { id },
			} = req
			const response = await db.update(data, id)
			res.json({ status: 'ok', response })
		} catch (error) {
			res.json({ status: 'error', error })
		}
	})
	.delete('/users/:id', async (req, res) => {
		try {
			const {
				params: { id },
			} = req
			const response = await db.destroy(id)
			res.json({ status: 'ok', response })
		} catch (error) {
			res.json({ status: 'error', error })
		}
	})

module.exports = router
