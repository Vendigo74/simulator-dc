const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	login: { type: String, unique: true, required: true },
	name: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	cars: { type: Array, default: [] },
	stands: { type: Array, default: [] },
	employees: { type: Array, default: [] },
	budget: { type: Number, default: 20000000 },
	budgetBorder: { type: Number, default: -10000000 },
	rent: { type: Number, default: 0 },
	profit: { type: Array, default: [] },
	role: { type: String, default: 'PLAYER' },
	trainerId: { type: String },

});

module.exports = model('User', UserSchema, 'users');
