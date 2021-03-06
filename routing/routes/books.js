const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('BOOKS')
const ruta = 'books'
const validator = require('../../validate/validator')
const jwt = require('../../jwt/jwt')

const refreshToken = (user, res) => {
	const token = jwt.createToken(user)
	res.setHeader('Authorization', `Bearer ${token}`)
}

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
	.post(`/${ruta}`, jwt.isAuth, async (req, res) => {
		refreshToken(req.body.user, res)
		const data = validator('books').cleanData(req.body)
		const errors = validator('books').isValid(data)
		if (errors) {
			res.status(401).json({ status: 'error', error: errors })
		} else {
			try {
				const data = req.body
				const response = await db.create(data)
				res.json({ status: 'ok', response })
			} catch (error) {
				res.json({ status: 'error', error })
			}
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
