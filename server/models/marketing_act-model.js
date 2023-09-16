const { Schema, model } = require("mongoose");

const MarketingActionsSchema = new Schema({
	id: { type: Number, unique: true, default: 0, required: true },
	idCategory: { type: Number, default: 0 },
	name: { type: Array, default: [] },
	price: { type: Array, default: [] },
	rent: { type: Array, default: [] },
	forEachEmployee: { type: Array, default: [] },
	impact: { type: Object, default: {}, required: true },
	preparationPrice: { type: Array, default: [] },
	lock: { type: Object, default: {} },
	action: { type: Object, default: {} },
	lvl: { type: Number, default: 0 },
});

module.exports = model("MarketingActions", MarketingActionsSchema);
