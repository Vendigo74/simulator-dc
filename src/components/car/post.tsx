import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Badge, Button, Collapse, Descriptions } from 'antd';
import { buyPost, hireTechnician, trainTechnician } from '../../feature/stands/carsAndStandsSlice';
import { changeBudget, collectingStats, setProfit } from '../../feature/player/playerSlice';
import { isBudgetEvelible } from '../../helpers/isBudgetEvelible';
import { setBudgetEvent } from '../../feature/events/eventsSlice';
import LogService from '../../services/LogService';

const { Panel } = Collapse;
function Post() {
	const dispatch = useAppDispatch();

	const { posts } = useAppSelector(state => state.stands);
	const budget = useAppSelector(state => state.player.player.budget);
	const budgetBorder = useAppSelector(state => state.player.player.budgetBorder);
	const month = useAppSelector(state => state.client.month);

	const [disabled1, setdisabled1] = React.useState(true);
	const [disabled2, setdisabled2] = React.useState(true);
	const [disabled3, setdisabled3] = React.useState(true);

	React.useEffect(() => {
		(function foo() {
			[0, 1, 2].map(el => {
				if (posts[0].technician[el].length === 0) {
					el === 0 ? setdisabled1(true) : el === 1 ? setdisabled2(true) : setdisabled3(true);
				} else if (posts[0].technician[el][0]?.lvl === 1 && posts[0].technician[el].length < 2) {
					el === 0 ? setdisabled1(true) : el === 1 ? setdisabled2(true) : setdisabled3(true);
				} else if (posts[0].technician[el][posts[0].technician[el].length - 1]?.lvl === 1) {
					el === 0 ? setdisabled1(true) : el === 1 ? setdisabled2(true) : setdisabled3(true);
				} else {
					el === 0 ? setdisabled1(false) : el === 1 ? setdisabled2(false) : setdisabled3(false);
				}
			});
		})();
	}, [posts]);

	const handleBuyPost = lvl => {
		if (isBudgetEvelible({ price: posts[0].price[lvl] }, budget, budgetBorder)) {
			dispatch(buyPost({ lvl }));
			dispatch(
				changeBudget({
					price: posts[0].price[lvl],
					rent: posts[0].rent[lvl],
				})
			);
			dispatch(setProfit({ month, profit: -posts[0].price[lvl] }));
			dispatch(collectingStats({ buyPosts: posts[0].price[lvl] }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			LogService.info(
				`покупка поста уровня ${lvl + 1}`,
				`${posts[0].price[lvl]}`,
				posts[0].rent[lvl]
			);
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

	const handeleHireTechnician = lvl => {
		dispatch(hireTechnician({ lvl }));
		dispatch(
			changeBudget({
				price: 0,
				rent: posts[1].rent[0],
			})
		);
		dispatch(collectingStats({ salaryOfSecondaryEmployees: posts[1].rent[0] }));
		dispatch(
			collectingStats({
				countManegementDecisions: 1,
			})
		);
		LogService.info(`Найм техника на пост уровня ${lvl + 1}`, `0`, posts[1].rent[0]);
	};

	const handeleTrainTechnician = (lvl, state) => {
		if (isBudgetEvelible({ price: posts[2].price[lvl] }, budget, budgetBorder)) {
			dispatch(trainTechnician({ lvl, state }));
			dispatch(
				changeBudget({
					price: posts[2].price[lvl],
					rent: 0,
				})
			);
			dispatch(setProfit({ month, profit: -posts[2].price[lvl] }));
			dispatch(collectingStats({ employeeTraining: posts[2].price[lvl] }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			LogService.info(`Обучение техника, уровень ${lvl + 1}`, `${posts[2].price[lvl]}`, 0);
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
		<div style={{ marginTop: '16px' }}>
			<Collapse accordion defaultActiveKey={['1']}>
				<Panel header={posts[0].name[0]} key='1'>
					<Descriptions>
						<Descriptions.Item label='Стоимость'>{posts[0].price[0]} ₽</Descriptions.Item>
						<Descriptions.Item label='Ежемесячный платёж'>{posts[0].rent[0]} ₽</Descriptions.Item>
						<Descriptions.Item label='Стоимость подготовки авто'>
							{posts[0].preparationPrice[0]} ₽
						</Descriptions.Item>
						<Descriptions.Item label='Влияние'>
							{posts[0].impact.trafficForSales[0].description}
							<br />
							{posts[0].impact.margin[0].description}
							<br />
							{posts[0].impact.salesValue[0].description}
							<br />
							{posts[0].impact.efficiencySales[0].description}
							<br />
						</Descriptions.Item>
						<Descriptions.Item label='Ограничения'>
							{posts[0].lock.reasonOne[0].description}
							<br />
							{posts[0].lock.reasonTwo[0].description}
							<br />
							{posts[0].lock.reasonThree[0].description}
							<br />
						</Descriptions.Item>
					</Descriptions>
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={posts[0].count[0].count.length === 2}
						onClick={() => handleBuyPost(0)}
					>
						Купить пост
					</Button>{' '}
					Колличество:{' '}
					{posts[0].count[0].count.reduce((acc, el) => {
						return acc + el;
					}, 0)}{' '}
					{posts[0].count[0].lock.map(el => {
						return <Badge key={Math.random()} status={el ? 'success' : 'error'} />;
					})}
					<br />
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={posts[0].technician[0].length === posts[0].count[0].count.length}
						onClick={() => handeleHireTechnician(0)}
					>
						Нанять техника
					</Button>{' '}
					Колличество: {posts[0].technician[0].length} Зарплата: {posts[1].rent[0]} <br />
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={disabled1}
						onClick={() => handeleTrainTechnician(0, posts[0].technician[0])}
					>
						Обучить техника
					</Button>{' '}
					Стоимость: {posts[2].price[0]}
				</Panel>

				<Panel header={posts[0].name[1]} key='2'>
					<Descriptions>
						<Descriptions.Item label='Стоимость'>{posts[0].price[1]} ₽</Descriptions.Item>
						<Descriptions.Item label='Ежемесячный платёж'>{posts[0].rent[1]} ₽</Descriptions.Item>
						<Descriptions.Item label='Стоимость подготовки авто'>
							{posts[0].preparationPrice[1]} ₽
						</Descriptions.Item>
						<Descriptions.Item label='Влияние'>
							{posts[0].impact.trafficForSales[1].description}
							<br />
							{posts[0].impact.margin[1].description}
							<br />
							{posts[0].impact.salesValue[1].description}
							<br />
							{posts[0].impact.efficiencySales[1].description}
							<br />
						</Descriptions.Item>
						<Descriptions.Item label='Ограничения'>
							{posts[0].lock.reasonOne[1].description}
							<br />
							{posts[0].lock.reasonTwo[1].description}
							<br />
							{posts[0].lock.reasonThree[1].description}
							<br />
						</Descriptions.Item>
						<Descriptions.Item label='Стоимость подготовки авто'>
							{posts[0].preparationPrice[1]} ₽
						</Descriptions.Item>
					</Descriptions>
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={posts[0].count[1].count.length === 2}
						onClick={() => handleBuyPost(1)}
					>
						Купить пост
					</Button>{' '}
					Колличество:{' '}
					{posts[0].count[1].count.reduce((acc, el) => {
						return acc + el;
					}, 0)}{' '}
					{posts[0].count[1].lock.map(el => {
						return <Badge key={Math.random()} status={el ? 'success' : 'error'} />;
					})}
					<br />
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={posts[0].technician[1].length === posts[0].count[1].count.length}
						onClick={() => handeleHireTechnician(1)}
					>
						Нанять техника
					</Button>{' '}
					Колличество: {posts[0].technician[1].length} Зарплата: {posts[1].rent[0]} <br />
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={disabled2}
						onClick={() => handeleTrainTechnician(1, posts[0].technician[1])}
					>
						Обучить техника
					</Button>{' '}
					Стоимость: {posts[2].price[1]}
				</Panel>

				<Panel header={posts[0].name[2]} key='3'>
					<Descriptions>
						<Descriptions.Item label='Стоимость'>{posts[0].price[2]} ₽</Descriptions.Item>
						<Descriptions.Item label='Ежемесячный платёж'>{posts[0].rent[2]} ₽</Descriptions.Item>
						<Descriptions.Item label='Стоимость подготовки авто'>
							{posts[0].preparationPrice[2]} ₽
						</Descriptions.Item>
						<Descriptions.Item label='Влияние'>
							{posts[0].impact.trafficForSales[2].description}
							<br />
							{posts[0].impact.margin[2].description}
							<br />
							{posts[0].impact.salesValue[2].description}
							<br />
							{posts[0].impact.efficiencySales[2].description}
							<br />
						</Descriptions.Item>
						<Descriptions.Item label='Ограничения'>
							{posts[0].lock.reasonOne[2].description}
							<br />
							{posts[0].lock.reasonTwo[2].description}
							<br />
							{posts[0].lock.reasonThree[2].description}
							<br />
						</Descriptions.Item>
					</Descriptions>
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={posts[0].count[2].count.length === 6}
						onClick={() => handleBuyPost(2)}
					>
						Купить
					</Button>{' '}
					Колличество:{' '}
					{posts[0].count[2].count.reduce((acc, el) => {
						return acc + el;
					}, 0)}{' '}
					{posts[0].count[2].lock.map(el => {
						return <Badge key={Math.random()} status={el ? 'success' : 'error'} />;
					})}
					<br />
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={posts[0].technician[2].length === posts[0].count[2].count.length}
						onClick={() => handeleHireTechnician(2)}
					>
						Нанять техника
					</Button>{' '}
					Колличество: {posts[0].technician[2].length} Зарплата: {posts[1].rent[0]} <br />
					<Button
						style={{ marginTop: '16px' }}
						type='primary'
						disabled={disabled3}
						onClick={() => handeleTrainTechnician(2, posts[0].technician[2])}
					>
						Обучить техника
					</Button>{' '}
					Стоимость: {posts[2].price[2]}
				</Panel>
			</Collapse>
		</div>
	);
}

export default Post;
