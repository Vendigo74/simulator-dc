import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addClients, changeClient, changeMonth, changeTime } from '../feature/client/clientSlice';

import { changeBudget, collectingStats, fetchUpdateStats } from '../feature/player/playerSlice';
import { refreshCountPost } from '../feature/stands/carsAndStandsSlice';
import { addClientIdEmployee } from '../helpers/addClientIdEmployee';
import createClients from '../helpers/clietnsGenerator';
import { randomInteger } from '../helpers/randomInteger';

export function useGeneratorClient() {
	const dispatch = useAppDispatch();

	const time = 720;
	const requestCount = 30;

	const { isAuth, role } = useAppSelector(state => state.player.auth);
	const stats = useAppSelector(state => state.player.stats);
	const trainerId = useAppSelector(state => state.player.player.trainerId);
	const id = useAppSelector(state => state.player.player.id);

	const { hireEmployees } = useAppSelector(state => state.employees);
	const { rent, budget, profit } = useAppSelector(state => state.player.player);
	const { kpi, effect } = useAppSelector(state => state.marketing);
	const { countClients } = useAppSelector(state => state.client);
	const { cars, countSellCars, countBuyCars, capacity, posts, playerCars } = useAppSelector(
		state => state.stands
	);

	const [counter, setCounter] = React.useState(0);

	const [counterClient, setCounterClient] = React.useState(time - 2);
	const [counterDay, setCounterDay] = React.useState(requestCount);
	const [marketingTraffic, setmarketingTraffic] = React.useState(80);

	React.useEffect(() => {
		if (isAuth && role === 'PLAYER') {
			setCounter(time);
		}
	}, [isAuth]);

	React.useEffect(() => {
		const countClient = kpi.traffic?.newValue
			? kpi.traffic?.newValue > countClients
				? countClients / requestCount
				: kpi.traffic?.newValue / requestCount
			: marketingTraffic > countClients
			? countClients / requestCount
			: marketingTraffic / requestCount;

		dispatch(changeTime(counter));

		if (isAuth && role === 'PLAYER' && counterDay < 30) {
			const profitTotal = profit.reduce((acc: any, el: any) => {
				acc = acc + el.profit;
				return acc
			}, 0);
			dispatch(
				collectingStats({
					id,
					hiredKeyEmployees: hireEmployees,
					profitTotal,
					budget,
					rent,
					countSellCars,
					countBuyCars,
					countStands: capacity - playerCars.length,
					countPosts:
						posts[0].count[0].countPost + posts[0].count[1].countPost + posts[0].count[2].countPost,
				})
			);
			dispatch(fetchUpdateStats({stats, trainerId}))
		}
		if (kpi.traffic?.newValue) {
			setmarketingTraffic(kpi.traffic?.newValue - +countClient.toFixed() * counterDay);
		}

		let timer;

		if (counter > 0) {
			timer = setTimeout(() => setCounter(c => c - 1), 1000);
			dispatch(changeClient(randomInteger(1, +countClient.toFixed())));
		}

		if (counterClient === counter && counterClient > 0) {
			setCounterClient(counter - 2);

			const clients = createClients({
				count: +countClient.toFixed(),
				source: {
					traffic: kpi.traffic,
					trafficForEvaluationVisit: kpi.trafficForEvaluationVisit,
					trafficForEvaluationEthernet: kpi.trafficForEvaluationEthernet,
					trafficForEvaluationCalls: kpi.trafficForEvaluationCalls,
					trafficForSalesVisit: kpi.trafficForSalesVisit,
					trafficForSalesEthernet: kpi.trafficForSalesEthernet,
					trafficForSalesCalls: kpi.trafficForSalesCalls,
				},
				effect,
				cars,
			});

			const newClients = addClientIdEmployee(clients, hireEmployees, counterDay, requestCount);
			newClients.map(el => (el ? dispatch(addClients(el)) : ''));

			if (counterDay === 1) {
				setCounterDay(requestCount);
				setmarketingTraffic(kpi.traffic?.newValue);
				dispatch(changeMonth(1));
				dispatch(changeBudget({ rentMinus: rent }));
				dispatch(refreshCountPost());
			} else {
				setCounterDay(c => c - 1);
			}

			setmarketingTraffic(c => c - +countClient.toFixed());
		}
		return () => {
			clearTimeout(timer);
		};
	}, [counter]);
	return [counterDay, counter];
}
