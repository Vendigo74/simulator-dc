import React from 'react';
import { Button, Col, Collapse, Descriptions, Divider, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	addNewEmployee,
	clearPlayerEmployees,
	fireEmployee,
	hireEmployee,
	removeEmployee,
	studyEmployee,
	updateEmployee,
} from '../feature/employees/employeesSlice';
import { changeBudget, collectingStats, setProfit } from '../feature/player/playerSlice';
import { formatPrice } from '../helpers/formatPrice';
import { isBudgetEvelible } from '../helpers/isBudgetEvelible';
import { setBudgetEvent } from '../feature/events/eventsSlice';
import LogService from '../services/LogService';

const descriptionKpi = {
	efficiency: 'На все каналы',
	efficiencyReception: 'Эффективность по каналу приёма',
	efficiencyReceptionEthernet: 'Эффективность по каналу приёма в интернете',
	efficiencyReceptionTradeIn: 'Эффективность по приему Trade-in',
	efficiencyReceptionTradeInNA: 'Эффективность по приему Trade-in НА',
	efficiencySales: 'Эффективность продажи',

	traffic: 'Общий',
	trafficForEvaluation: 'На оценку',
	trafficForEvaluationVisit: 'На оценку визит',
	trafficForEvaluationEthernet: 'На оценку из интернета',
	trafficForEvaluationCalls: 'На оценку со звонков',
	trafficForSales: 'На продажу',
	trafficForSalesVisit: 'На продажу визит',
	trafficForSalesEthernet: 'На продажу из интернета',
	trafficForSalesCalls: 'На продажу со звонков',

	profitToTrade: 'Доходность к сделке',
	spendingOnMarketing: 'Затраты по маркетингу',
	margin: 'Маржа',
	salesValue: 'Стоимость продажи',
	receptionValue: 'Стоимость выкупа',
};

const { Panel } = Collapse;

const Employees = () => {
	const dispatch = useAppDispatch();

	const { employees, hireEmployees, employeeStudyPack } = useAppSelector(state => state.employees);
	const idPlayer = useAppSelector(state => state.player.player.id);
	const budget = useAppSelector(state => state.player.player.budget);
	const budgetBorder = useAppSelector(state => state.player.player.budgetBorder);
	const month = useAppSelector(state => state.client.month);

	const handleHireEmployee = employee => {
		// dispatch(hireEmployee(employee));
		console.log(employee);
		const price = employee.price[0];
		if (isBudgetEvelible({ price }, budget, budgetBorder)) {
			dispatch(addNewEmployee({ idPlayer, employee }));
			dispatch(changeBudget({ rent: employee.rent[0], price }));
			dispatch(setProfit({ month, profit: -price }));
			dispatch(collectingStats({ salaryOfKeyEmployees: employee.rent[0] }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			LogService.info(`Нанял ${employee.name[0]}`, `${price}`, employee.rent[0]);
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

	const handleStudy = (type, lvl, id, studyLvl) => {
		const payments = employeeStudyPack[lvl].price[studyLvl];
		// dispatch(studyEmployee({ type, id, lvlStudyPack: lvl, studyLvl }));
		if (isBudgetEvelible({ price: payments }, budget, budgetBorder)) {
			dispatch(
				updateEmployee({ type, id, lvlStudyPack: lvl, studyLvl, idPlayer, employeeStudyPack })
			);
			dispatch(changeBudget({ price: payments }));
			dispatch(setProfit({ month, profit: -payments }));
			dispatch(collectingStats({ employeeTraining: payments }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			LogService.info(`Обучение сотрудника ${type}`, `${payments}`, 0);
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

	const handleFire = (type, id, rent) => {
		// dispatch(fireEmployee({ type, id, idPlayer }));
		console.log(type, id, idPlayer);
		if (isBudgetEvelible({ price: rent * 2 }, budget, budgetBorder)) {
			dispatch(removeEmployee({ type, id, idPlayer }));
			dispatch(changeBudget({ price: rent * 2, rent: -rent }));
			dispatch(setProfit({ month, profit: -(rent * 2) }));
			dispatch(collectingStats({ costsOfHiringAndFiring: rent * 2, salaryOfKeyEmployees: -rent }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			LogService.info(`Увольнение сотрудника ${type}`, `${rent * 2}`, rent);
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

	const removeAllemployee = hireEmp => {
		// dispatch(clearPlayerEmployees(idPlayer))
		const rent = hireEmp.reduce((acc: any, el: any) => {
			acc += el.rent;
			return acc;
		}, 0);
		console.log(rent);
		if (isBudgetEvelible({ price: rent * 2 }, budget, budgetBorder)) {
			dispatch(changeBudget({ price: rent * 2, rent: -rent }));
			dispatch(clearPlayerEmployees(idPlayer));
			dispatch(setProfit({ month, profit: -(rent * 2) }));
			dispatch(collectingStats({ costsOfHiringAndFiring: rent * 2, salaryOfKeyEmployees: -rent }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			LogService.info(`Увольнение всех сотрудников`, `${rent * 2}`, 0);
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

	const hireEmployeeUi = hireEmployeesForUi => {
		const hireEmp = Object.entries(hireEmployeesForUi).reduce((acc: any, el: any) => {
			acc = [...acc, ...el[1]];
			return acc;
		}, []);

		return (
			<div>
				{hireEmp.map((el, i) => {
					const label = Object.keys(el.impact);
					let lvl = 0;
					if (el.type === 'universal') {
						lvl = 0;
					}
					if (el.type === 'zakupshik') {
						lvl = 1;
					}
					if (el.type === 'prodavec') {
						lvl = 3;
					}

					return (
						<div key={el.id}>
							<Descriptions title={`Сотрудник ${i + 1}`} size={'small'}>
								<Descriptions.Item label='ЗП'>{formatPrice(el.rent)} Р</Descriptions.Item>
								<Descriptions.Item label='Активныe дни'>{el.limitDay}</Descriptions.Item>
								<Descriptions.Item label={descriptionKpi[`${label[0]}`]}>
									{el.impact[`${label[0]}`][0].value}%
								</Descriptions.Item>
								{label[1] && (
									<Descriptions.Item label={descriptionKpi[`${label[1]}`]}>
										{el.impact[`${label[1]}`][0].value}%
									</Descriptions.Item>
								)}
								<Descriptions.Item label='Уровень обучения'>{el.study}</Descriptions.Item>
								{employeeStudyPack[lvl].price[el.study] && (
									<Descriptions.Item label='Стоимость обучения'>
										{formatPrice(employeeStudyPack[lvl].price[el.study])} Р
									</Descriptions.Item>
								)}
							</Descriptions>
							{el.study < 4 && (
								<Button
									disabled={!employeeStudyPack[lvl].price[el.study]}
									type='primary'
									onClick={() => handleStudy(el.type, lvl, el.id, el.study)}
								>
									Обучить
								</Button>
							)}{' '}
							<Button type='primary' onClick={() => handleFire(el.type, el.id, el.rent)}>
								Уволить
							</Button>
						</div>
					);
				})}
				<Divider />
				{hireEmp.length ? (
					<>
						<Divider />
						<Button type='primary' danger onClick={() => removeAllemployee(hireEmp)}>
							Уволить всех
						</Button>
					</>
				) : null}
			</div>
		);
	};
	/* 	const hireEmployeeUi = (type, hireEmployeesForUi) => {
		return (
			<div>
				{hireEmployeesForUi[`${type}`].map((el, i) => {
					const label = Object.keys(el.impact);
					let lvl;
					if (type === 'universal') {
						lvl = 0;
					}
					if (type === 'zakupshik') {
						lvl = 1;
					}
					if (type === 'prodavec') {
						lvl = 2;
					}
					return (
						<>
							<Descriptions title={`Сотрудник ${i + 1}`} size={'small'}>
								<Descriptions.Item label='ЗП'>{formatPrice(el.rent)} Р</Descriptions.Item>
								<Descriptions.Item label='Активных дней осталось'>{el.limit}</Descriptions.Item>
								<Descriptions.Item label={descriptionKpi[`${label[0]}`]}>
									{el.impact[`${label[0]}`][0].value}%
								</Descriptions.Item>
								{label[1] && (
									<Descriptions.Item label={descriptionKpi[`${label[1]}`]}>
										{el.impact[`${label[1]}`][0].value}%
									</Descriptions.Item>
								)}
								<Descriptions.Item label='Уровень обучения'>{el.study}</Descriptions.Item>
								{employeeStudyPack[lvl].price[el.study] && (
									<Descriptions.Item label='Стоимость обучения'>
										{formatPrice(employeeStudyPack[lvl].price[el.study])} Р
									</Descriptions.Item>
								)}
							</Descriptions>
							{el.study < 4 && (
								<Button
									disabled={!employeeStudyPack[lvl].price[el.study]}
									type='primary'
									onClick={() => handleStudy(type, lvl, el.id, el.study)}
								>
									Обучить
								</Button>
							)}{' '}
							<Button type='primary' onClick={() => handleFire(type, el.id, el.rent)}>
								Уволить
							</Button>
						</>
					);
				})}
			</div>
		);
	}; */

	const DescriptionItem = ({ title, content }) => (
		<div className='site-description-item-profile-wrapper'>
			<p className='site-description-item-profile-p-label'>{title}:</p>
			<p className='site-description-item-profile-p-label-content'>{content}</p>
		</div>
	);

	return (
		<div>
			{employees &&
				employees.map(el => {
					let type;
					if (el.name[0].includes('Универсал')) {
						type = 'universal';
					}
					if (el.name[0].includes('Закупщик')) {
						type = 'zakupshik';
					}
					if (el.name[0].includes('Продавец')) {
						type = 'prodavec';
					}
					const label = Object.keys(el.impact);
					if (el.id !== 39) {
						return (
							<div key={el.id}>
								<Collapse ghost>
									<Panel header={el.name[0]} key='1'>
										<Descriptions size={'small'}>
											<Descriptions.Item label='Стоимость найма'>
												{formatPrice(el.price[0])}
											</Descriptions.Item>
											<Descriptions.Item label='Заработная плата'>{`${formatPrice(
												el.rent[0]
											)} Р`}</Descriptions.Item>
											<Descriptions.Item label={descriptionKpi[`${label[0]}`]}>
												{el.impact[`${label[0]}`][0].value}%
											</Descriptions.Item>
											{label[1] && (
												<Descriptions.Item label={descriptionKpi[`${label[1]}`]}>
													{el.impact[`${label[1]}`][0].value}%
												</Descriptions.Item>
											)}
										</Descriptions>
										<Row>
											<Col span={24}>
												<DescriptionItem
													title='Описание'
													content={el.lock.reasonOne[0].description}
												/>
											</Col>
										</Row>
										{el.lock?.reasonTwo && (
											<Row>
												<Col span={24}>
													<DescriptionItem
														title='Описание'
														content={el.lock.reasonTwo[0].description}
													/>
												</Col>
											</Row>
										)}
										{el.lock?.reasonThree && (
											<Row>
												<Col span={24}>
													<DescriptionItem
														title='Описание'
														content={el.lock.reasonThree[0].description}
													/>
												</Col>
											</Row>
										)}
										<Button type='primary' onClick={() => handleHireEmployee(el)}>
											Нанять
										</Button>
										<Divider />
										{/* {hireEmployees && hireEmployeeUi(type, hireEmployees)} */}
										{/* <Divider /> */}
									</Panel>
								</Collapse>
							</div>
						);
					}
				})}
			{hireEmployees && hireEmployeeUi(hireEmployees)}
		</div>
	);
};

export default Employees;
