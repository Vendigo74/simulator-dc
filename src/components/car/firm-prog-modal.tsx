import { Descriptions, Divider, Drawer } from 'antd';
import React from 'react';
import { useAppSelector } from '../../app/hooks';

function FirmProgModal({ showModal, onClose }) {
	const { firmProg } = useAppSelector(state => state.stands);
	return (
		<div>
			<Drawer
				title='Фирменные программы'
				placement='right'
				width={640}
				closable={false}
				onClose={onClose}
				visible={showModal}
			>
				{firmProg.map(item => {
					return (
						<Descriptions key={Math.random()} size={'default'}>
							<Descriptions.Item label='Бренд'>{item.brand}</Descriptions.Item>
							<Descriptions.Item label='Модель'>{item.model}</Descriptions.Item>
							<Descriptions.Item label='Год'>{item.year}</Descriptions.Item>
							<Descriptions.Item label='Пробег'>{item.mileage}</Descriptions.Item>
						</Descriptions>
					);
				})}
				<Divider />
			</Drawer>
		</div>
	);
}

export default FirmProgModal;
