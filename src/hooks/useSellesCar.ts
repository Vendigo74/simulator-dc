import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { delatePrepClient } from '../feature/client/clientSlice';
import { increaseBudget, setProfit } from '../feature/player/playerSlice';
import { sellCartoClient } from '../feature/stands/carsAndStandsSlice';
import { percentageChance } from '../helpers/randomizer';

import transformEmployees from '../helpers/transformEmployees';

export function useSellesCar(counterDay) {
	const dispatch = useAppDispatch();

	const { hireEmployees } = useAppSelector(state => state.employees);
	const { playerCars } = useAppSelector(state => state.stands);

	const { kpi } = useAppSelector(state => state.marketing);
	const { prepClients, month } = useAppSelector(state => state.client);

	React.useEffect(() => {
		const sallesCar = (prepClients, kpi) => {
			const result = [];

			const newClients = prepClients.Sales.map(car =>
				percentageChance(
					[{}, car],
					[
						100 - kpi.efficiencyReception.newValue + kpi.efficiency.newValue,
						kpi.efficiencyReception.newValue + kpi.efficiency.newValue,
					]
				)
			).filter(el => el.id);

			dispatch(delatePrepClient({ place: prepClients.Sales, name: 'Sales' }));
			newClients.map(el => {
				const employees = transformEmployees(hireEmployees);
				const [kpiCar] = employees.filter(el1 => el1.employee === el.idEmployee);
				playerCars.map(car => {
					if (el.wantCar.id === car.id && car.standCar) {
						const chance =
							kpiCar.kpi.efficiencySales +
							(car?.efficiencySales ? car?.efficiencySales : 0) +
							(car?.post?.impact?.efficiencySales ? car?.post?.impact?.efficiencySales : 0);
						const newCar = percentageChance(
							[{}, car],
							[100 - (chance > 100 ? 100 : chance), chance > 100 ? 100 : chance]
						);
						if (newCar?.id) {
							result.push(newCar);
						}
					}
				});
			});

			const newResut = result.filter(
				(v, i, a) => a.findIndex(t => t.idResult === v.idResult) === i
			);

			newResut.map(car => {
				const margin =
					(kpi.margin?.newValue + (car.post?.impact.margin ? car.post?.impact.margin : 0) + 100) /
					100;
				const salesValue =
					((car.post?.impact.salesValue ? car.post?.impact.salesValue : 0) + 100) / 100;
				const profit = Math.round(
					(car.priceBuy * margin +
						kpi.profitToTrade.newValue +
						(car.firmProg ? (car.priceBuy / 100) * car.priceFirmProg : 0)) *
						salesValue -
						(car.post?.price ? car.post.price : 0) * ((100 + kpi.salesValue.newValue) / 100) -
						car.priceBuy
				);
				dispatch(
					increaseBudget(
						car
							? (car.priceBuy * margin +
									kpi.profitToTrade.newValue +
									(car.firmProg ? (car.priceBuy / 100) * car.priceFirmProg : 0)) *
									salesValue -
									(car.post?.price ? car.post.price : 0) * ((100 + kpi.salesValue.newValue) / 100)
							: 0
					)
				);
				dispatch(setProfit({ month, profit }));
				dispatch(sellCartoClient(car));
			});

			return result;
		};

		if (playerCars.length > 0) sallesCar(prepClients, kpi);
	}, [counterDay]);
}
