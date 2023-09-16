import React from 'react';
import { Card, Table } from 'antd';
import PlayerList from '../../components/player/player-list';
import { useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { formatPrice } from '../../helpers/formatPrice';
import { ColumnsType } from 'antd/es/table';

interface ParamsTypes {
	id: string;
}

const TrainerPlayers = () => {
	const { playersStats } = useAppSelector(state => state.player);
	const { id: playerId } = useParams<ParamsTypes>();

	const Stats = () => {
		const columns: ColumnsType = playersStats.reduce((acc: any, el: any) => {
			return [...acc, { title: el.id, dataIndex: `value_${el.id}`, fixed: 'left' }];
		}, []);
		const newColumns: ColumnsType = [{ title: 'KPI', width: 100, dataIndex: 'name' }, ...columns];
		const newStats = playersStats
			.map(el => {
				return [el.stats.id, Object.entries(el.stats)];
			})
			.map(el1 => {
				return el1[1].reduce((acc: any, item: any, i: any) => {
					return [...acc, { key: i, name: item[0], [`value_${el1[0]}`]: item[1] }];
				}, []);
			});

		/* 		for (let i = 0; i <= [...newStats[0], ...newStats[1]].length; i++) {
			[...newStats[0], ...newStats[1]];
		} */
		const newData = [];

		const st = newStats[0].map((el, i) => {
			return newStats[1]
				.map((el1, index) => {
					if (i === index) {
						return { ...el, ...el1 };
					}
				})
				.filter(item => item)
				.map((item: any) => {
					newData.push(item);
				}, []);
		});

		console.log(newData);

		const data = [
			{
				key: '1',
				name: 'Бюджет',
				value_6126127a5a7c9e2d8cbcac05: 2000,
				value_612748ba02f9d50deca1aefe: 3000,
			},

			{
				key: '2',
				name: 'Прибыль (общая)',
				value: 4000,
			},
		];
		return <Table columns={newColumns} dataSource={newData} /* scroll={{ x: 500 }} */ />;
	};

	return (
		<div>
			<Card title='Ваши игроки'>
				<Stats />
				{/* 				{playersStats.map(el => {
					console.log(el.stats);
					const colums: ColumnsType = [{}];
					const columns: ColumnsType = [
						{
							title: 'Имя',
							width: 100,
							dataIndex: 'id',
							key: 'id',
							fixed: 'left',
						},
						{
							title: 'Бюджет',
							width: 100,
							dataIndex: 'budget',
							key: 'budget',
							fixed: 'left',
						},
						{ title: 'Прибыль (общая)', dataIndex: 'address', key: '1' },
						{ title: 'Ежемесячные платежи', dataIndex: 'address', key: '2' },
						{ title: 'Зп основных сотрудников', dataIndex: 'address', key: '3' },
						{ title: 'Зп второстепенных сотрудников', dataIndex: 'address', key: '4' },
						{ title: 'Затраты на найм и увольнение сотрудников', dataIndex: 'address', key: '5' },
						{ title: 'Обучение сотрудников', dataIndex: 'address', key: '6' },
						{ title: 'Маркетинговые действия', dataIndex: 'address', key: '7' },
						{ title: 'Купленные авто', dataIndex: 'address', key: '8' },
						{ title: 'Купленные посты', dataIndex: 'address', key: '8' },
						{ title: 'Купленные площадки', dataIndex: 'address', key: '8' },
						{ title: 'кол-во площадок', dataIndex: 'address', key: '8' },
						{ title: 'кол-во постов', dataIndex: 'address', key: '8' },
						{ title: 'кол-во купленных машин', dataIndex: 'address', key: '8' },
						{ title: 'кол-во проданных машин', dataIndex: 'address', key: '8' },
						{ title: 'нанятые основные сотрудники', dataIndex: 'address', key: '8' },
						{ title: 'кол-во управленческих решений', dataIndex: 'address', key: '8' },
					];

					const data = [
						{
							key: '1',
							name: 'John Brown',
							age: 32,
							address: 'New York Park',
						},
						{
							key: '2',
							name: 'Jim Green',
							age: 40,
							address: 'London Park',
						},
					];

					return (
						<>
							<div>{formatPrice(el.stats.budget)}</div>
							<div>{formatPrice(el.stats.profitTotal)}</div>

						</>
					);
				})} */}
				<PlayerList mode='trainer' />
			</Card>
		</div>
	);
};

export default TrainerPlayers;
