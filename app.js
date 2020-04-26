const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const PORT = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

app.get('/', (req, res) => {
	res.json({ status: 'success' })
})

const routes = require('./routing/routes')
app.use('/api/v1.0/', routes)

app.get('*', (req, res) => {
	rres.status(401).json({ status: 'error' })
})

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
})
