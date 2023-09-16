const { Schema, model } = require("mongoose");

const StatsSchema = new Schema({
	id: { type: String, unique: true, default: '', required: true },
	trainerId: { type: String, unique: false, default: ''},
	stats: { type: {}, default: {} },
});

module.exports = model("Stats", StatsSchema);
