import { Kpi } from '../../../types/marketing';

export const kpi: Kpi = {
	efficiency: { default: 0, newValue: 0, border: 25 },
	efficiencyReception: { default: 10, newValue: 10, border: 25 },
	efficiencyReceptionEthernet: { default: 10, newValue: 10, border: 25 },
	efficiencyReceptionTradeIn: { default: 10, newValue: 10, border: 25 },
	efficiencyReceptionTradeInNA: { default: 10, newValue: 10, border: 25 },
	efficiencySales: { default: 10, newValue: 10, border: 25 },

	traffic: { default: 60, newValue: 60, border: 25 },
	trafficForEvaluation: { default: 10, newValue: 10, border: 25 },
	trafficForEvaluationVisit: { default: 10, newValue: 10, border: 25 },
	trafficForEvaluationEthernet: { default: 10, newValue: 10, border: 25 },
	trafficForEvaluationCalls: { default: 10, newValue: 10, border: 25 },
	trafficForSales: { default: 10, newValue: 10, border: 25 },
	trafficForSalesVisit: { default: 10, newValue: 10, border: 25 },
	trafficForSalesEthernet: { default: 10, newValue: 10, border: 25 },
	trafficForSalesCalls: { default: 10, newValue: 10, border: 25 },

	profitToTrade: { default: 10000, newValue: 10000, border: 25 },
	spendingOnMarketing: { default: 0, newValue: 0, border: 25 },
	margin: { default: 8, newValue: 8, border: 25 },
	salesValue: { default: 0, newValue: 0, border: 25 },
	receptionValue: { default: 0, newValue: 0, border: 25 },
};

const descriptionKpi = {
	efficiency: 'Эффективность',
	efficiencyReception: 'Эффективность по каналу приёма',
	efficiencyReceptionEthernet: 'Эффективность по каналу приёма в интернете',
	efficiencyReceptionTradeIn: 'Эффективности по приему Trade-in',
	efficiencyReceptionTradeInNA: 'Эффективности по приему Trade-in НА',
	efficiencySales: 'Эффективность продаж',

	traffic: 'Трафик',
	trafficForEvaluation: 'Трафик на оценку',
	trafficForSales: 'Трафик на продажу',
	trafficForEvaluationEthernet: 'Трафик на оценку из интернета',
	trafficForEvaluationCalls: 'Трафик на оценку со звонков',
	trafficForSalesEthernet: 'Трафик на продажу из интернета',
	trafficForSalesCalls: 'Трафик на продажу со звонков',

	profitToTrade: 'Доходность к сделке',
	spendingOnMarketing: 'Затраты по маркетингу',
	margin: 'Маржа',
	salesValue: 'Стоимость продажи',
	receptionValue: 'Стоимость выкупа',
};
