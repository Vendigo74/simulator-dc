const { Schema, model } = require('mongoose');

const LogSchema = new Schema(
	{
		message: { type: String },
		type: { type: String },
		budget: { type: Number },
		rent: { type: Number },
		price: { type: String },
		time: { type: Number },
		timeGame: { type: Number },
		playerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{ timestamps: true }
);

module.exports = model('Log', LogSchema);
