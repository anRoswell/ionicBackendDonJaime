const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('USERS')
const validator = require('../../validate/validator')
const jwt = require('../../jwt/jwt')

const refreshToken = (user, res) => {
	const token = jwt.createToken(user)
	res.setHeader('Authorization', `Bearer ${token}`)
}

router
	.get('/users', async (req, res) => {
		console.log(req)
		try {
			const users = await db.getAll()
			res.json({ users })
		} catch (error) {
			res.json({ error })
		}
	})
	.get('/users/:id', async (req, res) => {
		console.log(req)
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
			refreshToken(req.body.user, res)
			const data = validator('users').cleanData(req.body)
			const errors = validator('users').isValid(data)
			if (errors) {
				res.status(401).json({ status: 'error', error: errors })
			} else {
				data.access = bcrypt.hashSync(data.access, 10)
				const response = await db.create(data)
				res.json({ status: 'ok', response })
			}
		} catch (error) {
			console.log(error)
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
