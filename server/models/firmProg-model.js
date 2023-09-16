const { Schema, model } = require('mongoose');

const FirmProgSchema = new Schema({
	id: { type: String, default: '' },
	brand: { type: String, default: '' },
	model: { type: String, default: '' },
	year: { type: Number, default: 0 },
	mileage: { type: Number, default: 0 },
});

module.exports = model('FirmProg', FirmProgSchema);
