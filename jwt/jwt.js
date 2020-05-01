require('dotenv').config()

const jwt = require('jsonwebtoken')
const moment = require('moment')
const encryptor = require('simple-encryptor')(process.env.JWT_ENCRYPT)

module.exports = {
	createToken: (user) => {
		try {
			const payload = {
				sub: encryptor.encrypt(user),
				name: user.name,
				iat: moment().add(3, 'hour').unix(),
			}
			return jwt.sign(payload, process.env.JWT_SESSION)
		} catch (e) {
			return false
		}
	},
	isAuth: (req, res, next) => {
		try {
			const {
				headers,
				headers: { authorization },
			} = req
			if (!authorization) {
				res.status(403).json({ status: 'error', error: 'Acceso no permitido' })
			} else {
				const token = authorization.split(' ').pop()
				const payload = jwt.verify(token, process.env.JWT_SESSION)
				if (!payload || (payload && payload.iat < moment().unix())) {
					res.status(401).json({ status: 'error', error: 'Acceso no permitido' })
				} else {
					req.body.user = encryptor.decrypt(payload.sub)
					next()
				}
			}
		} catch (error) {
			res.status(403).json({ status: 'error', error: 'Acceso no permitido' })
		}
	},
}
