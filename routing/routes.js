const auth = require('./routes/auth')
const users = require('./routes/users')
const lenguajes = require('./routes/lenguajes')
const books = require('./routes/books')
const cuentas = require('./routes/cuentas')

module.exports = [auth, users, lenguajes, books, cuentas]
