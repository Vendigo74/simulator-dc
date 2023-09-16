import React, { FC } from 'react';
import { Badge, Descriptions, Input, Modal } from 'antd';
import { ICar } from '../../types/car';

import '../../styles/blocks/tradecar.scss';
import { useAppSelector } from '../../app/hooks';

interface InfoCarProps {
	showModal: boolean;
	car: ICar;
	buySeconds?: number;
	onClickBuy?: () => void;
	onClose?: any;
}

const InfoCar: FC<InfoCarProps> = ({ showModal, onClose, car }) => {
	const { kpi } = useAppSelector(state => state.marketing);
	const margin = (kpi.margin?.newValue + 100) / 100;

	const handleSell = () => {
		onClose(false);
		console.log('handle ok');
	};

	const handleCancel = () => {
		onClose(false);
	};

	const ModalContent = () => (
		<>
			<Descriptions size={'default'}>
				<Descriptions.Item label='Год выпуска'>{car.year}</Descriptions.Item>
				<Descriptions.Item label='Пробег'>{car.mileage}</Descriptions.Item>
				<Descriptions.Item label='Кузов'>{car.body}</Descriptions.Item>
				<Descriptions.Item label='Объем двигателя'>{car.engineVolume}</Descriptions.Item>
				<Descriptions.Item label='Мощность двигателя'>{car.enginePower} л.с.</Descriptions.Item>
				<Descriptions.Item label='Трансмиссия'>{car.transmission}</Descriptions.Item>
				<Descriptions.Item label='Привод'>{car.driveUnit}</Descriptions.Item>
				<Descriptions.Item label='Салон'>{car.salon}</Descriptions.Item>
				<Descriptions.Item label='Пост'> уровень {car.post?.lvl}</Descriptions.Item>
				<Descriptions.Item label='Фирменная программа'>
					{' '}
					<Badge status={car.firmProg ? 'success' : 'error'} />
				</Descriptions.Item>
			</Descriptions>
			<div>
				<div className='trade__item'>
					<span>Цена выкупа (ниже рынка 5%):</span>
					<div className='trade__output'>
						<Input value={car?.priceBuy} suffix='RUB' />
					</div>
				</div>
				<div className='trade__item'>
					<span>Цена продажи:</span>
					<div className='trade__output'>
						<Input
							value={Math.floor(car?.priceBuy * margin + kpi.profitToTrade.newValue)}
							suffix='RUB'
						/>
					</div>
				</div>
				<div className='trade__item'>
					<span>Цена продажи с учетом фирменной программы:</span>
					<div className='trade__output'>
						<Input
							value={Math.floor(
								car?.priceBuy * margin +
									kpi.profitToTrade.newValue +
									(car.firmProg ? (car.priceBuy / 100) * car.priceFirmProg : 0)
							)}
							suffix='RUB'
						/>
					</div>
				</div>
				<div className='trade__item'>
					<span>Стоимость поста:</span>
					<div className='trade__output'>
						<Input value={car.post?.price} suffix='RUB' />
					</div>
				</div>
				{/* 				<div className='trade__item'>
					<span>Цена продажи с учетом допов:</span>
					<div className='trade__output'>
						<Input value={car?.priceBuy + car?.priceDop} suffix='RUB' />
					</div>
				</div> */}
			</div>
		</>
	);

	const SellModal = React.memo(() => (
		<Modal
			className='trade'
			width={700}
			title={'Продажа ' + car?.brand + ' ' + car?.model}
			visible={showModal}
			onOk={handleSell}
			onCancel={handleCancel}
		>
			<ModalContent />
		</Modal>
	));

	return <SellModal />;
};

export default React.memo(InfoCar);
