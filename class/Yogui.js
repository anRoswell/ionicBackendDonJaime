const Lamas = require('./Lamas')

class Yogui extends Lamas {
	constructor() {
		super('Sabananda')
		this.barba = true
		this.nuevoSaldo = 0
	}

	meditar() {
		return `Nuevo saldo: ${this.nuevoSaldo}`
	}

	static anacoreta() {
		return `I am retired`
	}
}

module.exports = Yogui
