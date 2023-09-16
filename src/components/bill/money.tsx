import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col } from 'antd';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { formatPrice } from '../../helpers/formatPrice';

function Money() {
	const { budget, rent } = useAppSelector(state => state.player.player);

	return (
		<Col span={6} xs={24} sm={24} md={12} xl={6}>
			<Card title='Финансы' extra={<InfoCircleOutlined />} bordered className='bill-card'>
				<p className='bill-text'>Бюджет</p>
				<p className='bill-text large-text'>{formatPrice(budget)}</p>
				<p className='bill-text'>Ежемесечные платежи</p>
				<p className='bill-text large-text'>{formatPrice(rent)}</p>
				{/* <img className='ps-image' src='/assets/images/ps.png' alt='img not found' /> */}
			</Card>
		</Col>
	);
}

export default Money;
