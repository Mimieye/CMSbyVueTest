import moment from 'moment/moment'

let formatDate01 = value => {
	if (value) {
		return moment(value).format('YYYY/MM/DD')
	}
}
let formatDate02 = value => {
	if (value) {
		return moment(value).format('YYYY/MM/DD HH:mm')
	}
}
let formatDate03 = value => {
	if (value) {
		return moment(value).format('YYYY/MM/DD HH:mm:ss')
	}
}

export { formatDate01, formatDate02, formatDate03 }