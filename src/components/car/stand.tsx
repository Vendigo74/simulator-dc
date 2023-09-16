import React from 'react';
import { Modal, Button, Col, Row, Table, Tag, InputNumber } from 'antd';
import styles from '../../styles/CardsDistribution.module.scss';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addStand, buyStand } from '../../feature/stands/carsAndStandsSlice';
import { addStandToPlayer, collectingStats, setProfit } from '../../feature/player/playerSlice';
import { setBudgetEvent } from '../../feature/events/eventsSlice';
import { isBudgetEvelible } from '../../helpers/isBudgetEvelible';

SwiperCore.use([Pagination, Navigation]);

const Stand = () => {
	const { stands } = useAppSelector(state => state.stands);
	const budget = useAppSelector(state => state.player.player.budget);
	const budgetBorder = useAppSelector(state => state.player.player.budgetBorder);
	const month = useAppSelector(state => state.client.month);

	const dispatch = useAppDispatch();
	const [visible, setVisible] = React.useState(false);
	const [visibleCars, setVisibleCars] = React.useState(false);
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [modalStand, setModalStand] = React.useState([{}]);
	const [valueBuyStand, setValueBuyStand] = React.useState(0);

	const showModal = item => {
		setModalStand([item]);
		setVisible(true);
	};

	const showModalCars = item => {
		console.log('item', item);

		setModalStand(item.cars);
		setVisibleCars(true);
	};

	const handleOk = stand => {
		const data = { valueBuyStand, stand };
		if (isBudgetEvelible({ price: valueBuyStand }, budget, budgetBorder)) {
			console.log(stand);
			dispatch(setProfit({ month, profit: -(valueBuyStand * stand[0].buyPrice) }));
			dispatch(buyStand(data));
			dispatch(addStandToPlayer(data));
			dispatch(addStand(data));
			dispatch(collectingStats({ buyStands: valueBuyStand * stand[0].buyPrice }));
			dispatch(
				collectingStats({
					countManegementDecisions: 1,
				})
			);
			setConfirmLoading(true);
			setVisible(false);
			setConfirmLoading(false);
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

	const handleOkCars = stand => {
		setConfirmLoading(true);
		setVisibleCars(false);
		setConfirmLoading(false);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisible(false);
	};

	const handleCancelCars = () => {
		console.log('Clicked cancel button');
		setVisibleCars(false);
	};

	const onChange = value => {
		setValueBuyStand(value);
	};

	const columsStandCars: ColumnsType = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'brand',
			align: 'left',
		},
		{
			title: 'Цена покупки',
			dataIndex: 'priceBuy',
			key: 'priceBuy',
			align: 'center',
		},
	];
	const columsStand: ColumnsType = [
		{
			title: 'Площадка',
			dataIndex: 'stand',
			key: 'stand',
			align: 'center',
		},
		{
			title: 'Кол-во мест для покупки',
			dataIndex: '',
			key: '',
			align: 'center',
			render: function renderFree(stand) {
				return (
					<>
						<div>{stand.fullValue - stand.playerValue}</div>
					</>
				);
			},
		},
		{
			title: 'Стоимость',
			dataIndex: 'buyPrice',
			key: 'buyPrice',
			align: 'center',
		},
		{
			title: 'Аренда',
			dataIndex: 'rentPrice',
			key: 'rentPrice',
			align: 'center',
		},
		{
			title: 'Купить',
			dataIndex: '',
			key: '',
			align: 'center',
			render: function renderBuy(stand) {
				return (
					<>
						<InputNumber
							min={0}
							max={stand.fullValue - stand.playerValue}
							defaultValue={0}
							onChange={onChange}
						/>
					</>
				);
			},
		},
	];

	const columns: ColumnsType = [
		{
			title: 'Площадки',
			dataIndex: 'stand',
			key: 'stand',
			render: function renderText(text) {
				return <a> {text}</a>;
			},
		},
		{
			title: 'Кол-во мест',
			dataIndex: 'fullValue',
			key: 'fullValue',
			align: 'center',
		},
		{
			title: 'Свободные места',
			dataIndex: 'freeValue',
			key: 'freeValue',
			align: 'center',
			render: function renderTags(freeValue) {
				let color = freeValue === 0 ? 'volcano' : 'green';
				if (freeValue === 'loser') {
					color = 'volcano';
				}
				return (
					<>
						<Tag color={color} key={freeValue}>
							{freeValue}
						</Tag>
					</>
				);
			},
		},
		{
			title: 'Занятые места',
			dataIndex: 'fill',
			key: 'fill',
			align: 'center',
			render: function renderTags(fill, record: any) {
				return (
					<>
						<Button type='primary' key={fill} onClick={() => showModalCars(record)}>
							{fill}
						</Button>
					</>
				);
			},
		},

		{
			title: 'Действие',
			key: 'action',
			render: function renderTextRecord(text, record: any) {
				return (
					<>
						<Button type='link' onClick={() => showModal(record)}>
							Купить место {record.stand}
						</Button>
					</>
				);
			},
		},
	];

	return (
		<div className={`${styles['page']}`}>
			<div className={styles['site-card-wrapper']}>
				<Row gutter={16}>
					<Col span={24} offset={0} className={styles['card-col']}>
						<Table pagination={false} columns={columns} dataSource={stands} />
					</Col>
				</Row>
			</div>

			<Modal
				title='Информация'
				visible={visible}
				onOk={() => handleOk(modalStand)}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				width={800}
			>
				<Table pagination={false} columns={columsStand} dataSource={modalStand} />
			</Modal>

			<Modal
				title='Информация'
				visible={visibleCars}
				onOk={() => handleOkCars(modalStand)}
				confirmLoading={confirmLoading}
				onCancel={handleCancelCars}
				width={800}
			>
				<Table pagination={false} columns={columsStandCars} dataSource={modalStand} />
			</Modal>
		</div>
	);
};

export default Stand;
