import { Row, Col, Image, Button } from 'antd';
import React from 'react';
import styles from '../../styles/CardsChoose.module.scss';
import { ICar } from '../../types/car';
import { formatPrice } from '../../helpers/formatPrice';
import InfoCar from './info-car';
import SelectStand from './select-stand';
import { useAppSelector } from '../../app/hooks';

function Car() {
	const { playerCars } = useAppSelector(state => state.stands);

	const [showSellCarModal, setShowSellCarModal] = React.useState(false);
	const [currentCar, setCurrentCar] = React.useState<ICar | null>(null);

	const handleSellCar = idResult => {
		const car = playerCars.find(car => car.idResult === idResult);
		setCurrentCar(car);
		setShowSellCarModal(true);
	};

	return (
		<>
			<Row gutter={[8, 16]} className={styles['car__wrapper']}>
				{[...playerCars].reverse().map(car => (
					<Col span={4} key={car.idResult}>
						<div className={styles['car__item']}>
							<Image className={styles['car__logo']} preview={false} src={car.brandIcon} />
							<div className={styles['car__title']}>
								<span>{car.brand + ' ' + car.model}</span>
							</div>
							<Image
								width={'100%'}
								className={styles['car__image']}
								preview={false}
								src={car.imgSrc}
							/>
							<div className={styles['car__price']}>
								<span>{formatPrice(car.priceBuy)}</span>
								<span>₽</span>
							</div>
							<div className={styles['car__actions']}>
								<Button
									onClick={() => handleSellCar(car.idResult)}
									type={'primary'}
									size='small'
									block
								>
									Информация
								</Button>
							</div>
							<SelectStand car={car} />
						</div>
					</Col>
				))}
			</Row>
			<InfoCar showModal={showSellCarModal} onClose={setShowSellCarModal} car={currentCar} />
		</>
	);
}

export default React.memo(Car);
