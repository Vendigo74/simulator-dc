const { Schema, model } = require("mongoose");

const KpiSchema = new Schema({
	id: { type: String, unique: true, default: '', required: true },
	kpi: { type: Object, default: {} },
	/* efficiency: { type: Object, default: {} },
	efficiencyReception: { type: Object, default: {} },
	efficiencyReceptionEthernet: { type: Object, default: {} },
	efficiencyReceptionTradeInNA: { type: Object, default: {} },
	efficiencyReceptionTradeIn: { type: Object, default: {} },
	efficiencySales: { type: Object, default: {} },

	traffic: { type: Object, default: {} },
	trafficForEvaluation: { type: Object, default: {} },
	trafficForEvaluationVisit: { type: Object, default: {} },
	trafficForEvaluationEthernet: { type: Object, default: {} },
	trafficForEvaluationCalls: { type: Object, default: {} },
	trafficForSales: { type: Object, default: {} },
	trafficForSalesVisit: { type: Object, default: {} },
	trafficForSalesEthernet: { type: Object, default: {} },
	trafficForSale: { type: Object, default: {} },
	trafficForSalesCalls: { type: Object, default: {} },

	profitToTrade: { type: Object, default: {} },
	spendingOnMarketing: { type: Object, default: {} },
	margin: { type: Object, default: {} },
	salesValue: { type: Object, default: {} },
	receptionValue: { type: Object, default: {} }, */
});

module.exports = model("Kpi", KpiSchema);
