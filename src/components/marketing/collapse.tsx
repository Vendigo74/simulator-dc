import React from 'react';
import { Button, Collapse, Descriptions } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeActionItem, fetchSetKpi, setMonth } from '../../feature/marketing/marketingSlice';
import { changeBudget, collectingStats, setProfit } from '../../feature/player/playerSlice';
import { addNewStandToStand } from '../../feature/stands/carsAndStandsSlice';
import { isBudgetEvelible } from '../../helpers/isBudgetEvelible';
import { setBudgetEvent } from '../../feature/events/eventsSlice';
import LogService from '../../services/LogService';

const { Panel } = Collapse;

function CollapseMarketing({ stateItem }) {
	const dispatch = useAppDispatch();
	const { marketing } = useAppSelector(state => state.marketing);
	const { kpi } = useAppSelector(state => state.marketing);

	const month = useAppSelector(state => state.client.month);
	const idPlayer = useAppSelector(state => state.player.player.id);
	const budget = useAppSelector(state => state.player.player.budget);
	const budgetBorder = useAppSelector(state => state.player.player.budgetBorder);

	const state = stateItem;

	const getItemMarket = (item, lvl, stateId) => {
		dispatch(
			collectingStats({
				countManegementDecisions: 1,
			})
		);
		const trueRent = level => {
			if (level === 0) {
				return item.rent[level];
			}
			if (level === 1) {
				return item.rent[level] - item.rent[level - 1];
			}
			if (level === 2) {
				return item.rent[level] - item.rent[level - 1];
			}
		};

		let marketingPrice;
		let marketingRent;
		if (
			item.id === 16 ||
			item.id === 17 ||
			item.id === 24 ||
			item.id === 25 ||
			item.id === 29 ||
			item.id === 30 ||
			item.id === 31
		) {
			marketingPrice =
				(item.price[lvl] ? item.price[lvl] : 0) * ((100 + kpi.spendingOnMarketing.newValue) / 100);
			marketingRent = trueRent(lvl) * ((100 + kpi.spendingOnMarketing.newValue) / 100);
		} else {
			marketingPrice = item.price[lvl] ? item.price[lvl] : 0;
			marketingRent = trueRent(lvl);
		}

		const budegetPlayer = {
			price: item.id !== 58 ? marketingPrice : 9900000,
			rent: marketingRent,
			item,
		};

		if (isBudgetEvelible(budegetPlayer, budget, budgetBorder)) {
			const itemWithLvl = { item, lvl, idPlayer };
			const itemWithLvlId = { item, lvl, stateId };
			console.log(item);

			dispatch(changeActionItem(itemWithLvlId));
			dispatch(changeBudget(budegetPlayer));
			dispatch(fetchSetKpi(itemWithLvl));
			dispatch(setProfit({ month, profit: -marketingPrice }));
			LogService.info(
				`МАРКЕТИНГ ${item.name[lvl]}`,
				`${budegetPlayer.price}`,
				budegetPlayer.rent ? budegetPlayer.rent : 0
			);

			if ((item.id >= 45 && item.id <= 49) || item.id === 22 || item.id === 35) {
				dispatch(
					collectingStats({
						salaryOfSecondaryEmployees: marketingRent,
						countManegementDecisions: 1,
					})
				);
			} else {
				dispatch(
					collectingStats({
						constMarketingAction: budegetPlayer.price,
						countManegementDecisions: 1,
					})
				);
			}

			if (item.id === 56 || item.id === 57) {
				console.log(item.impact);
				dispatch(
					addNewStandToStand({ effect: item.impact.efficiencySales[lvl].value, id: item.id })
				);
				dispatch(collectingStats({ buyStands: budegetPlayer.price }));
			}
			if (item.id === 52 || item.id === 53 || item.id === 51) {
				dispatch(setMonth(month));
			}
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
	};

	return (
		<Collapse defaultActiveKey={['1']} accordion>
			{state &&
				state.actions.map(item => {
					if (item.id === 26 || item.id === 27 || item.id === 28) {
						console.log();
					} else {
						const kpiName = Object.keys(item.impact);
						const dis = marketing
							.flatMap(item1 => {
								return item1.actions.map(el => {
									return el.action;
								});
							})
							.filter(item => item);

						return (
							<>
								<Panel header={item.name[0]} key={item._id}>
									<div style={{ marginBottom: '20px' }}>
										<Descriptions
											bordered
											column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
											layout='vertical'
										>
											<Descriptions.Item label='Стоимость'>
												{item.price[0] ? item.price[0] : 0}
											</Descriptions.Item>
											<Descriptions.Item label='Ежемесячный платёж' span={2}>
												{item.rent[0] ? item.rent[0] : 0}
											</Descriptions.Item>
											<Descriptions.Item label='Влияние' span={3}>
												{kpiName.map(name => {
													return (
														<div key={`${item.impact[`${name}`][0].description}`}>
															{item.impact[`${name}`][0].description}
														</div>
													);
												})}
											</Descriptions.Item>
											{item.lock && (
												<Descriptions.Item label='Ограничение'>
													<div>{item.lock.reasonOne && item.lock.reasonOne[0].description}</div>
													<div>{item.lock.reasonTwo && item.lock.reasonTwo[0].description}</div>
													<div>{item.lock.reasonThree && item.lock.reasonThree[0].description}</div>
													<div>{item.lock.reasonFour && item.lock.reasonFour[0].description}</div>
												</Descriptions.Item>
											)}
										</Descriptions>
										<Button
											className='marketing__btn'
											type='primary'
											key={item.name[0]}
											onClick={() => getItemMarket(item, 0, state.id)}
											disabled={
												!dis.reduce((acc, el) => {
													if (item.id === el[4]) {
														/*eslint-disable */
														acc = el[0];
													}
													return acc;
												}, false)
											}
										>
											Приобрести
										</Button>
									</div>
								</Panel>
								{item.name[1] && (
									<Panel header={item.name[1]} key={item._id + 10}>
										<div style={{ marginBottom: '20px' }}>
											<Descriptions
												bordered
												column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
												layout='vertical'
											>
												<Descriptions.Item label='Стоимость'>
													{item.price[1] ? item.price[1] : 0}
												</Descriptions.Item>
												<Descriptions.Item label='Ежемесячный платёж' span={2}>
													{item.rent[1] ? item.rent[1] : 0}
												</Descriptions.Item>
												<Descriptions.Item label='Влияние' span={3}>
													{kpiName.map(name => {
														return (
															<div key={`${item.impact[`${name}`][1]?.description}`}>
																{item.impact[`${name}`][1]?.description}
															</div>
														);
													})}
												</Descriptions.Item>
												{item.lock && (
													<Descriptions.Item label='Ограничение'>
														<div>{item.lock.reasonOne[1].description}</div>
														<div>{item.lock.reasonTwo && item.lock.reasonTwo[1].description}</div>
														<div>
															{item.lock.reasonThree && item.lock.reasonThree[1].description}
														</div>
													</Descriptions.Item>
												)}
											</Descriptions>
											<Button
												className='marketing__btn'
												type='primary'
												key={item.name[1]}
												onClick={() => getItemMarket(item, 1, state.id)}
												disabled={
													!dis.reduce((acc, el) => {
														if (item.id === el[4]) {
															/*eslint-disable */
															acc = el[1];
														}
														return acc;
													}, false)
												}
											>
												Приобрести
											</Button>
										</div>
									</Panel>
								)}
								{item.name[2] && (
									<Panel header={item.name[2]} key={item._id + 20}>
										<div style={{ marginBottom: '20px' }}>
											<Descriptions
												bordered
												column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
												layout='vertical'
											>
												<Descriptions.Item label='Стоимость'>
													{item.price[2] ? item.price[2] : 0}
												</Descriptions.Item>
												<Descriptions.Item label='Ежемесячный платёж' span={2}>
													{item.rent[2] ? item.rent[2] : 0}
												</Descriptions.Item>
												<Descriptions.Item label='Влияние' span={3}>
													{kpiName.map(name => {
														return (
															<div key={`${item.impact[`${name}`][2]?.description}`}>
																{item.impact[`${name}`][2]?.description}
															</div>
														);
													})}
												</Descriptions.Item>
												{item.lock && (
													<Descriptions.Item label='Ограничение'>
														<div>{item.lock.reasonOne[2].description}</div>
														<div>{item.lock.reasonTwo && item.lock.reasonTwo[2].description}</div>
														<div>
															{item.lock.reasonThree && item.lock.reasonThree[2].description}
														</div>
													</Descriptions.Item>
												)}
											</Descriptions>
											<Button
												className='marketing__btn'
												type='primary'
												key={item.name[2]}
												onClick={() => getItemMarket(item, 2, state.id)}
												disabled={
													!dis.reduce((acc, el) => {
														if (item.id === el[4]) {
															/*eslint-disable */
															acc = el[2];
														}
														return acc;
													}, false)
												}
											>
												Приобрести
											</Button>
										</div>
									</Panel>
								)}
								{item.name[3] && (
									<Panel header={item.name[3]} key={item._id + 30}>
										<div style={{ marginBottom: '20px' }}>
											<Descriptions
												// title={item.name[0]}
												bordered
												column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
												layout='vertical'
											>
												<Descriptions.Item label='Стоимость'>
													{item.price[3] ? item.price[3] : 0}
												</Descriptions.Item>
												<Descriptions.Item label='Ежемесячный платёж' span={2}>
													{item.rent[3] ? item.rent[3] : 0}
												</Descriptions.Item>
												<Descriptions.Item label='Влияние' span={3}>
													{kpiName.map(name => {
														return (
															<div key={`${item.impact[`${name}`][3]?.description}`}>
																{item.impact[`${name}`][3]?.description}
															</div>
														);
													})}
												</Descriptions.Item>
												{item.lock && (
													<Descriptions.Item label='Ограничение'>
														<div>{item.lock.reasonOne[3].description}</div>
														<div>{item.lock.reasonTwo && item.lock.reasonTwo[3].description}</div>
														<div>
															{item.lock.reasonThree && item.lock.reasonThree[3].description}
														</div>
														<div>
															{item.lock.reasonFour && item.lock.reasonThree[3].description}
														</div>
													</Descriptions.Item>
												)}
											</Descriptions>
											<Button
												className='marketing__btn'
												type='primary'
												key={item.name[3]}
												onClick={() => getItemMarket(item, 3, state.id)}
												disabled={
													!dis.reduce((acc, el) => {
														if (item.id === el[4]) {
															/*eslint-disable */
															acc = el[3];
														}
														return acc;
													}, false)
												}
											>
												Приобрести
											</Button>
										</div>
									</Panel>
								)}
							</>
						);
					}
				})}
		</Collapse>
	);
}

export default CollapseMarketing;
