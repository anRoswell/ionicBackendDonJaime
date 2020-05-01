const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')
const validator = require('../../validate/validator')

router.post('/auth', async (req, res) => {
	try {
		const data = req.body
		const errors = validator('auth').isValid(data)
		if (errors) {
			res.status(401).json({ status: 'error', error: errors })
		} else {
			const { username, access } = data
			const sql = `
						SELECT
							u.id,
							u.name,
							u.username,
							u.email,
							u.access,
							u.last_login,
							p.name profile,
							u.status
						FROM USERS u
						INNER JOIN PROFILES p ON p.id = u.profile_id
						WHERE u.username=?
						`
			const [user] = await DB.query(sql, username)
			if (!user) {
				res.json({ status: 'error', error: 'Datos de acceso incorrectos: Usuario' })
			} else {
				const validatePassword = bcrypt.compareSync(access, user.access)
				if (!validatePassword) {
					res.status(400).json({ status: 'error', error: 'Datos de acceso incorrectos: Password' })
				} else {
					await DB.query(`UPDATE ?? SET last_login=? WHERE id=?`, ['USERS', new Date(), user.id])
					delete user['access']
					const token = jwt.createToken(user)
					if (token) {
						res.setHeader('Authorization', `Bearer ${token}`)
					}
					//console.log('Token: ', token)
					res.status(200).json({ status: 'ok', user })
				}
			}
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ status: 'error', error: 'Datos de acceso incorrectos' })
	}
})

module.exports = router
