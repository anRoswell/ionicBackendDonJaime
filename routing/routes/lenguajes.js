const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('LENGUAJES')
const ruta = 'lenguajes'

router
	.get(`/${ruta}`, async (req, res) => {
		try {
			const lenguajes = await db.getAll()
			res.json({ lenguajes })
		} catch (error) {
			res.json({ error })
		}
	})
	.get(`/${ruta}/:id`, async (req, res) => {
		try {
			const {
				params: { id },
			} = req
			const [lenguaje] = await db.getOne(id)
			res.json({ lenguaje })
		} catch (error) {
			res.json({ error })
		}
	})
	.post(`/${ruta}`, async (req, res) => {
		try {
			const data = req.body
			const response = await db.create(data)
			res.json({ status: 'ok', response })
		} catch (error) {
			res.json({ status: 'error', error })
		}
	})
	.put(`/${ruta}/:id`, async (req, res) => {
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
	.delete(`/${ruta}/:id`, async (req, res) => {
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
