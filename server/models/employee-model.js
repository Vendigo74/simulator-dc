const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
	idPlayer: { type: String, default: '' },
	hireEmployees: {
		type: Object,
		default: {
			universal: [],
			zakupshik: [],
			prodavec: [],
		},
	},
});

module.exports = model('Employee', EmployeeSchema);
