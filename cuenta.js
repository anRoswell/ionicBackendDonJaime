'use strict'
class Cuenta {
	constructor() {
		this.nuevoSaldo = 0
	}

	consignacion() {
		return this.nuevoSaldo
	}
}

const laCuenta = new Cuenta('Alfonso')
console.log(laCuenta.consignacion())
