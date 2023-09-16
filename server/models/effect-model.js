const { Schema, model } = require('mongoose');

const EffectSchema = new Schema({
	trafficForEvaluationVisit: { type: Number, default: 0 },
	trafficForEvaluationEthernet: { type: Number, default: -2 },
	trafficForEvaluationCalls: { type: Number, default: 0 },
	trafficForSalesVisit: { type: Number, default: 0 },
	trafficForSalesEthernet: { type: Number, default: -2 },
	trafficForSalesCalls: { type: Number, default: 0 },
});

module.exports = model('Effect', EffectSchema);
