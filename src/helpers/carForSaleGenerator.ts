import { percentageChance } from './randomizer';

export const carForSaleGenerator = (prepClients, kpi) => {

	const result = [];
	prepClients.Reception.map(el => {
		result.push(
			percentageChance(
				[{}, el],
				[100 - kpi.efficiencyReception.newValue, kpi.efficiencyReception.newValue]
			)
		);
	});
	return result;
};
