const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const DB = require('../../db/db')

router.post('/auth', async (req, res) => {
	try {
		const { username, password } = req.body
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
        WHERE u.username=?;
      `
		const [user] = await DB.query(sql, username)
		if (!user) {
			res.json({ status: 'error', error: 'Datos de acceso incorrectos' })
		} else {
			const validatePassword = bcrypt.compareSync(password, user.access)
			if (!validatePassword) {
				res.json({ status: 'error', error: 'Datos de acceso incorrectos' })
			} else {
				await DB.query(`UPDATE ?? SET last_login=? WHERE id=?`, ['USERS', new Date(), user.id])
				delete user['access']
				res.json(user)
			}
		}
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'Datos de acceso incorrectos' })
	}
})

module.exports = router
