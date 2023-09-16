const { Schema, model } = require("mongoose");

const MarketingCategorySchema = new Schema({
	id: { type: Number, unique: true, default: 0 },
	category: { type: String },
	subCategory: { type: String },
	leaderAction: { type: String },
	reason: { type: String },
	actions: { type: Array, default: [] },
});

module.exports = model("MarketingCategory", MarketingCategorySchema);
