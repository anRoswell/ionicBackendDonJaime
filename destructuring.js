//Punto nro 1
const jsonPlaceHodler = require('./data/jsonPlaceHolder.json')

// for (let key in jsonPlaceHodler) {
// 	if (key === 2) {
// 		console.log(`Data de la posición nro 3 es: `, jsonPlaceHodler[key])
// 	}
// }
// const userData = jsonPlaceHodler.find((data) => data.id === 3)
// console.log(`Usuario posición 3: `, userData)

// //Punto nro 2
jsonPlaceHodler.map((data) => {
	if (data.address.zipcode.includes('53919-4257')) {
		let family = {
			family: [
				{ id: 123456, relationship: 'tio', nombre: 'Uncle Charles' },
				{ id: 123457, relationship: 'tia', nombre: 'Aunt Yomi' },
				{ id: 123458, relationship: 'prima', nombre: 'Cousin Naty' },
			],
		}
		Object.assign(data, family)
	}
})
console.log(`Nuevo json modificado: `, jsonPlaceHodler)

//Punto numero 3 y 4
jsonPlaceHodler.map((data) => {
	if ([6, 7, 8, 9].includes(data.id)) {
		const atributo1 = { tieneCoronavirus: false }
		const atributo2 = { alimentacionSana: true }
		const atributo3 = { haceEjercicio: false }
		Object.assign(data, atributo1, atributo2, atributo3)
	}
})
console.log(
	`Nuevos atributos: `,
	jsonPlaceHodler.filter((item) => [6, 7, 8, 9].includes(item.id)),
)

// for (let user of jsonPlaceHodler) {
// 	console.log(user)
// }
