import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { delatePrepClient } from '../feature/client/clientSlice';
import { setBudgetEvent } from '../feature/events/eventsSlice';
import { changeBudget, collectingStats } from '../feature/player/playerSlice';
import {
	addPostToCar,
	buyCar,
	carToStand,
	changeCarStand,
} from '../feature/stands/carsAndStandsSlice';
import { isBudgetEvelible } from '../helpers/isBudgetEvelible';
import { percentageChance } from '../helpers/randomizer';
import { standGeneretor } from '../helpers/standGeneretor';
import transformEmployees from '../helpers/transformEmployees';

export function useBuyCar(counterDay) {
	const dispatch = useAppDispatch();

	const { hireEmployees } = useAppSelector(state => state.employees);
	const { playerCars, capacity, stands } = useAppSelector(state => state.stands);

	const budget = useAppSelector(state => state.player.player.budget);
	const budgetBorder = useAppSelector(state => state.player.player.budgetBorder);

	const { kpi } = useAppSelector(state => state.marketing);
	const { prepClients } = useAppSelector(state => state.client);

	React.useEffect(() => {
		const carForSaleGenerator = (prepClients, kpi) => {
			let i = capacity - playerCars.length;

			const newClients = prepClients.Reception.map(car => {
				if (car.source.includes('Visit') || car.source.includes('Calls')) {
					return percentageChance(
						[{}, car],
						[
							100 - kpi.efficiencyReception.newValue + kpi.efficiency.newValue,
							kpi.efficiencyReception.newValue + kpi.efficiency.newValue,
						]
					);
				}
				if (car.source.includes('Ethernet')) {
					return percentageChance(
						[{}, car],
						[
							100 - kpi.efficiencyReceptionEthernet.newValue,
							kpi.efficiencyReceptionEthernet.newValue,
						]
					);
				}
			}).filter(el => el.id);
			dispatch(delatePrepClient({ place: prepClients.Reception, name: 'Reception' }));

			newClients.map(car => {
				const employees = transformEmployees(hireEmployees);

				const [kpiCar] = employees.filter(el => el.employee === car.idEmployee);

				const chanсe = kpiCar?.kpi?.efficiencyReception ? kpiCar?.kpi?.efficiencyReception : 0;

				const newCar = {
					...percentageChance([{}, car.myCar], [100 - chanсe, chanсe]),
					idResult: car.myCar.idResult,
				};
				if (i > 0) {
					if (newCar.id) {
						if (isBudgetEvelible({ price: newCar.priceBuy }, budget, budgetBorder)) {
							const stand = standGeneretor(stands);

							i -= 1;
							const price = newCar.priceBuy * ((100 - kpi.receptionValue.newValue) / 100);
							dispatch(changeBudget({ price }));
							dispatch(buyCar(newCar));
							dispatch(carToStand({ standForSell: stand, car: newCar }));
							dispatch(changeCarStand({ standCar: stand, idResult: newCar.idResult }));
							dispatch(addPostToCar({ id: newCar.idResult }));
							dispatch(collectingStats({ buyCars: price }));
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
				}
			});
		};

		carForSaleGenerator(prepClients, kpi);
	}, [counterDay]);
}
