const MarketingActionsModel = require('../models/marketing_act-model');
const MarketingCategoryModel = require('../models/marketing_cat-model');
const EffectModel = require('../models/effect-model');
const KpiModel = require('../models/kpi-model');
const FirmProgModel = require('../models/firmProg-model');
const marketingActions = require('../data/marketingActions');
const marketingCategory = require('../data/marketingCategory');
const ApiError = require('../exceptions/api-error');

class kpiService {
	/* await KpiModel.create({
		id: 1,
		kpi: {
			efficiency: { default: 0, newValue: 0, border: 25 },
			efficiencyReception: { default: 10, newValue: 10, border: 25 },
			efficiencyReceptionEthernet: { default: 10, newValue: 10, border: 25 },
			efficiencyReceptionTradeIn: { default: 10, newValue: 10, border: 25 },
			efficiencyReceptionTradeInNA: { default: 10, newValue: 10, border: 25 },
			efficiencySales: { default: 10, newValue: 10, border: 25 },

			traffic: { default: 80, newValue: 80 },
			trafficForEvaluation: { default: 10, newValue: 10 },
			trafficForEvaluationVisit: { default: 10, newValue: 10 },
			trafficForEvaluationEthernet: { default: 10, newValue: 10 },
			trafficForEvaluationCalls: { default: 10, newValue: 10 },
			trafficForSales: { default: 10, newValue: 10 },
			trafficForSalesVisit: { default: 10, newValue: 10 },
			trafficForSalesEthernet: { default: 10, newValue: 10 },
			trafficForSalesCalls: { default: 10, newValue: 10 },

			profitToTrade: { default: 10000, newValue: 10000 },
			spendingOnMarketing: { default: 0, newValue: 0 },
			margin: { default: 8, newValue: 8 },
			salesValue: { default: 0, newValue: 0 },
			receptionValue: { default: 0, newValue: 0 },
		},
	}); */

	async getKpi(trainerId, id) {
		const kpi = await KpiModel.findOne({ id: trainerId });

		await KpiModel.findOneAndUpdate({ id: id }, { $set: { kpi: kpi.kpi } }, function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Successfully Updated');
			}
		});

		const playerKpi = await KpiModel.findOne({ id: id });
		return { playerKpi };
	}

	async updateTrainerKpi(trainerId, trainerKpi) {
		console.log(trainerKpi);
		await KpiModel.findOneAndUpdate(
			{ id: trainerId },
			{ $set: { kpi: trainerKpi } },
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Successfully Updated');
				}
			}
		);

		const kpi = await KpiModel.findOne({ id: trainerId });
		return { kpi };
	}

	async setKpi(kpi) {
		const kpiServer = await KpiModel.findOne({ id: kpi.idPlayer });
		console.log(kpi);
		const changeKpiAction = Object.keys(kpi.item.impact);
		changeKpiAction.map(async item1 => {
			const { value } = kpi.item.impact[`${item1}`][kpi.lvl];

			if (item1.includes('traffic')) {
				if (kpi.lvl === 0) {
					if (value < 36) {
						kpiServer.kpi[`${item1}`].newValue +=
							(kpiServer.kpi[`${item1}`].newValue / 100) * value;
					} else {
						kpiServer.kpi[`${item1}`].newValue += Number(value);
					}
					kpiServer.kpi.traffic.newValue += kpiServer.kpi[`${item1}`].newValue;
				}

				if (kpi.lvl === 1) {
					if (value < 36) {
						kpiServer.kpi[`${item1}`].newValue -=
							(kpiServer.kpi[`${item1}`].default / 100) * kpi.item.impact[`${item1}`][0].value;
						kpiServer.kpi[`${item1}`].newValue +=
							(kpiServer.kpi[`${item1}`].newValue / 100) * value;
					} else {
						kpiServer.kpi[`${item1}`].newValue -= kpi.item.impact[`${item1}`][0].value;
						kpiServer.kpi[`${item1}`].newValue += Number(value);
					}
				}
				if (kpi.lvl === 2) {
					if (value < 36) {
						kpiServer.kpi[`${item1}`].newValue -=
							(kpiServer.kpi[`${item1}`].default / 100) * kpi.item.impact[`${item1}`][1].value;
						kpiServer.kpi[`${item1}`].newValue +=
							(kpiServer.kpi[`${item1}`].newValue / 100) * value;
					} else {
						kpiServer.kpi[`${item1}`].newValue -= kpi.item.impact[`${item1}`][1].value;
						kpiServer.kpi[`${item1}`].newValue += Number(value);
					}
				}
			} else if (kpi.item.id !== 56 && kpi.item.id !== 57) {
				if (kpi.lvl === 0) {
					if (kpiServer.kpi[`${item1}`].newValue > 1000) {
						kpiServer.kpi[`${item1}`].newValue +=
							(kpiServer.kpi[`${item1}`].newValue / 100) * value;
					} else {
						kpiServer.kpi[`${item1}`].newValue += Number(value);
					}
				}

				if (kpi.lvl === 1) {
					if (kpi.item.impact[`${item1}`][0].value < 0) {
						kpiServer.kpi[`${item1}`].newValue;
					} else {
						kpiServer.kpi[`${item1}`].newValue -= kpi.item.impact[`${item1}`][0].value;
					}

					kpiServer.kpi[`${item1}`].newValue += Number(value);
				}

				if (kpi.lvl === 2) {
					kpiServer.kpi[`${item1}`].newValue -= kpi.item.impact[`${item1}`][1].value;
					kpiServer.kpi[`${item1}`].newValue += Number(value);
				}

				if (kpi.lvl === 3) {
					kpiServer.kpi[`${item1}`].newValue -= kpi.item.impact[`${item1}`][2].value;
					kpiServer.kpi[`${item1}`].newValue += Number(value);
				}
			}
			//Граница для kpi
			if (
				kpiServer.kpi[`${item1}`].newValue >= kpiServer.kpi[`${item1}`].border &&
				!item1.includes('margin')
			) {
				kpiServer.kpi[`${item1}`].newValue = kpiServer.kpi[`${item1}`].border;
			}

			kpiServer.kpi[`${item1}`].newValue = Math.floor(
				Number(kpiServer.kpi[`${item1}`].newValue)
			);
		});

		const tepmKpi = Object.entries(kpiServer.kpi);
		kpiServer.kpi.traffic.newValue -= kpiServer.kpi.traffic.newValue;
		tepmKpi.map(el => {
			if (el[0].includes('traffic') && el[0] !== 'traffic') {
				kpiServer.kpi[`${el[0]}`];
				kpiServer.kpi.traffic.newValue += el[1].newValue;
			}
		});

		await KpiModel.findOneAndUpdate({ id: kpi.idPlayer }, kpiServer);

		return kpiServer;
	}
}

module.exports = new kpiService();
