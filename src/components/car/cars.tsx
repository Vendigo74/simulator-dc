import React from 'react';
import { Button, Card, Col, Descriptions, Row } from 'antd';
import styles from '../../styles/CardsChoose.module.scss';
import SwiperCore, { EffectFlip, Navigation, Pagination } from 'swiper/core';
import { useAppSelector } from '../../app/hooks';
import PlayerCards from './car';
import Info from './info';
import FirmProgModal from './firm-prog-modal';

SwiperCore.use([EffectFlip, Pagination, Navigation]);

const Cars = () => {
	const { playerCars } = useAppSelector(state => state.stands);

	const [visible, setVisible] = React.useState(false);

	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};
	return (
		<div className={`${styles['cards-choose']} car`}>
			<div className={styles['site-card-wrapper']}>
				<Info />
				<Button type='primary' onClick={showDrawer}>Фирменные программы</Button>
				<Row>
					<Col span={24} className={styles['card-col']}>
						<Card title='Ваши автомобили' bordered={true} className={styles['car__card']}>
							{playerCars.length > 0 && <PlayerCards />}
							{playerCars.length === 0 && <span>Пока не приобретено ни одной машины</span>}
						</Card>
					</Col>
				</Row>
			</div>

			{/* 				<div className={styles['alert-group']}>
					<Alert
						message="Внимание! Игра началась!"
						type="info"
						closeText="X"
						className={styles['alert']}
					/>
					<Alert
						message="Ведущий раздел карты. Вы можете выбрать любые 2, которые Вам понравились."
						type="info"
						closeText="X"
						className={styles['alert']}
					/>
				</div> */}
			<FirmProgModal showModal={visible} onClose={onClose} />
		</div>
	);
};
export default React.memo(Cars);
