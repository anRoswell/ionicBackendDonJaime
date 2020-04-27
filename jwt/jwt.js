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

	validateToken: (token) => {},
}
