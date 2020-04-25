const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3001
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

const DB = require('./db/db')
const userDB = new DB('USERS')

app.get('/users/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		const [users] = await userDB.getOne(id)
		res.json({ users })
	} catch (error) {
		res.json({ error })
	}
})

app.get('/users', async (req, res) => {
	try {
		const users = await userDB.getAll()
		res.json({ users })
	} catch (error) {
		res.json({ error })
	}
})

app.post('/users', async (req, res) => {
	try {
		const data = req.body
		const response = await userDB.create(data)
		res.json({ status: 'ok', response })
	} catch (error) {
		res.json({ status: 'error', error })
	}
})

app.put('/users/:id', async (req, res) => {
	try {
		const { body: data } = req
		const {
			params: { id },
		} = req
		const response = await userDB.update(data, id)
		res.json({ status: 'ok', response })
	} catch (error) {
		res.json({ status: 'error', error })
	}
})

app.delete('/users/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		const response = await userDB.destroy(id)
		res.json({ status: 'ok', response })
	} catch (error) {
		res.json({ status: 'error', error })
	}
})

/**************************************+*/
const bookDB = new DB('BOOKS')

app.get('/books/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		const [users] = await bookDB.getOne(id)
		res.json({ users })
	} catch (error) {
		res.json({ error })
	}
})

app.get('/books', async (req, res) => {
	try {
		const books = await bookDB.getAll()
		res.json({ books })
	} catch (error) {
		res.json({ error })
	}
})

app.post('/books', async (req, res) => {
	try {
		const data = req.body
		const response = await bookDB.create(data)
		res.json({ status: 'ok', response })
	} catch (error) {
		res.json({ status: 'error', error })
	}
})

app.put('/books/:id', async (req, res) => {
	try {
		const { body: data } = req
		const {
			params: { id },
		} = req
		const response = await bookDB.update(data, id)
		res.json({ status: 'ok', response })
	} catch (error) {
		res.json({ status: 'error', error })
	}
})

app.delete('/books/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		const response = await bookDB.destroy(id)
		res.json({ status: 'ok', response })
	} catch (error) {
		res.json({ status: 'error', error })
	}
})

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
})
