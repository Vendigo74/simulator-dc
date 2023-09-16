const transformEmployees = emp => {
	const result = [];
	emp.zakupshik.map(el => {
		result.push({
			employee: el.id,
			kpi: {
				efficiencyReception: Object.entries(el.impact)[1][1][0].value,
				efficiencyReceptionTradeIn: Object.entries(el.impact)[0][1][0].value,
			},
		});
	});
	emp.prodavec.map(el => {
		result.push({
			employee: el.id,
			kpi: {
				efficiencySales: Object.entries(el.impact)[0][1][0].value,
			},
		});
	});
	emp.universal.map(el => {
		result.push({
			employee: el.id,
			kpi: {
				efficiencyReception: Object.entries(el.impact)[1][1][0].value,
				efficiencySales: Object.entries(el.impact)[0][1][0].value,
			},
		});
	});
	return result;
};

export default transformEmployees;
