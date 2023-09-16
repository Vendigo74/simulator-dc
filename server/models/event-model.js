const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
	name: {type: String, default: ''},
	description: { type: String, default: '' },
	price: { type: Number, default: 0 },
	rent: { type: Number, default: 0 },

});

module.exports = model('Event', EventSchema);
