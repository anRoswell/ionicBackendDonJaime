class Lamas {
	constructor(name = '') {
		this.name = name
		this.birthDay = ''
		console.log(`Soy el constructor de Person`)
	}

	alimentacion() {
		return 'Me alimento bn'
	}

	static concentracion() {
		return `Intento conentrarme...`
	}
}

module.exports = Lamas
