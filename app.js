const express = require('express')
const app = express()
const routes = require('./routing/routes')
const cors = require('cors')

const bodyParser = require('body-parser')
const PORT = 3001

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

app.get('/', (req, res) => {
	res.json({ status: 'success' })
})

app.use('/api/v1.0/', routes)

app.get('*', (req, res) => {
	res.status(401).json({ status: 'error' })
})

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
})
