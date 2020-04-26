const auth = require('./routes/auth')
const users = require('./routes/users')
const lenguajes = require('./routes/lenguajes')
const books = require('./routes/books')

module.exports = [auth, users, lenguajes, books]
