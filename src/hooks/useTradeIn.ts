import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { delatePrepClient } from '../feature/client/clientSlice';
import { setBudgetEvent } from '../feature/events/eventsSlice';
import { changeBudget, increaseBudget, setProfit } from '../feature/player/playerSlice';
import {
	addPostToCar,
	buyCar,
	carToStand,
	changeCar,
	changeCarStand,
	sellCartoClient,
} from '../feature/stands/carsAndStandsSlice';
import { isBudgetEvelible } from '../helpers/isBudgetEvelible';
import { percentageChance } from '../helpers/randomizer';
import { standGeneretor } from '../helpers/standGeneretor';

import transformEmployees from '../helpers/transformEmployees';

export function useTradeIn(counterDay) {
	const dispatch = useAppDispatch();

	const { hireEmployees } = useAppSelector(state => state.employees);
	const { playerCars, capacity, stands } = useAppSelector(state => state.stands);

	const budget = useAppSelector(state => state.player.player.budget);
	const budgetBorder = useAppSelector(state => state.player.player.budgetBorder);

	const { kpi } = useAppSelector(state => state.marketing);
	const { prepClients, month } = useAppSelector(state => state.client);

	React.useEffect(() => {
		let i = capacity - playerCars.length;
		const tradeIn = (prepClients, kpi) => {
			const result = [];

			const newClients = prepClients.ReceptionTradeIn.map(car =>
				percentageChance(
					[{}, car],
					[
						100 - kpi.efficiencyReceptionTradeIn.newValue + kpi.efficiency.newValue,
						kpi.efficiencyReceptionTradeIn.newValue + kpi.efficiency.newValue,
					]
				)
			).filter(el => el.id);
			dispatch(delatePrepClient({ place: prepClients.ReceptionTradeIn, name: 'ReceptionTradeIn' }));

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
							result.push({ idResult: el.myCar.idResult, wantCar: newCar, sallesCar: el.myCar });
						}
					}
				});
			});

			const newResut = result.filter(
				(v, i, a) => a.findIndex(t => t.idResult === v.idResult) === i
			);

			newResut.map(({ wantCar, sallesCar }) => {
				if (i >= 0) {
					i -= 1;
					const margin =
						(kpi.margin?.newValue +
							(wantCar.post?.impact.margin ? wantCar.post?.impact.margin : 0) +
							100) /
						100;

					const salesValue =
						((wantCar.post?.impact.salesValue ? wantCar.post?.impact.salesValue : 0) + 100) / 100;

					const price = wantCar
						? (wantCar.priceBuy * margin +
								kpi.profitToTrade.newValue +
								(wantCar.firmProg ? (wantCar.priceBuy / 100) * wantCar.priceFirmProg : 0)) *
								salesValue -
						  (wantCar.post?.price ? wantCar.post.price : 0) *
								((100 + kpi.salesValue.newValue) / 100)
						: 0;
					const profit = Math.round(price - wantCar.priceBuy);
					if (isBudgetEvelible({ price }, budget, budgetBorder)) {
						// Продажа машины
						dispatch(increaseBudget(price));
						dispatch(setProfit({ month, profit }));
						// dispatch(sellCartoClient(wantCar));
						dispatch(changeCar({ wantCar, sallesCar }));
						// Покупка машины
						const stand = standGeneretor(stands);
						dispatch(
							changeBudget({
								price: sallesCar.priceBuy * ((100 - kpi.receptionValue.newValue) / 100),
							})
						);
						// dispatch(buyCar(sallesCar));
						// dispatch(carToStand({ standForSell: wantCar.standCar, car: sallesCar }));
						// dispatch(changeCarStand({ standCar: wantCar.standCar, idResult: sallesCar.idResult }));
						dispatch(addPostToCar({ id: sallesCar.idResult }));
					} else {
						dispatch(
							setBudgetEvent({
								event: {
									title: 'Вам не хватает денег',
									description: `Нужно, что бы на вашем счету было больше денег`,
								},
								isEvent: true,
							})
						);
					}
				}
			});

			return result;
		};

		if (playerCars.length > 0) tradeIn(prepClients, kpi);
	}, [counterDay]);
}
