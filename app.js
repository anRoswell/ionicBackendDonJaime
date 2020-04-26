const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const PORT = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

const routes = require('./routing/routes')
app.use('/api/v1.0/', routes)

/**************************************+*/
// const bookDB = new DB('BOOKS')

// app.get('/books/:id', async (req, res) => {
// 	try {
// 		const {
// 			params: { id },
// 		} = req
// 		const [users] = await bookDB.getOne(id)
// 		res.json({ users })
// 	} catch (error) {
// 		res.json({ error })
// 	}
// })

// app.get('/books', async (req, res) => {
// 	try {
// 		const books = await bookDB.getAll()
// 		res.json({ books })
// 	} catch (error) {
// 		res.json({ error })
// 	}
// })

// app.post('/books', async (req, res) => {
// 	try {
// 		const data = req.body
// 		const response = await bookDB.create(data)
// 		res.json({ status: 'ok', response })
// 	} catch (error) {
// 		res.json({ status: 'error', error })
// 	}
// })

// app.put('/books/:id', async (req, res) => {
// 	try {
// 		const { body: data } = req
// 		const {
// 			params: { id },
// 		} = req
// 		const response = await bookDB.update(data, id)
// 		res.json({ status: 'ok', response })
// 	} catch (error) {
// 		res.json({ status: 'error', error })
// 	}
// })

// app.delete('/books/:id', async (req, res) => {
// 	try {
// 		const {
// 			params: { id },
// 		} = req
// 		const response = await bookDB.destroy(id)
// 		res.json({ status: 'ok', response })
// 	} catch (error) {
// 		res.json({ status: 'error', error })
// 	}
// })

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
})
