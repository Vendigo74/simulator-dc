import React from 'react';
import { Popover, Card, Col, Row, Badge } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { formatPrice } from '../../helpers/formatPrice';
import { useAppSelector } from '../../app/hooks';
import Clients from './clients';
import Table from './tableProfit';

import Money from './money';

const Bill = () => {

	const placefree = (
		<div>
			<p className='popover'>Место свободно</p>
		</div>
	);
	const placebusy = (
		<div>
			<p className='popover'>Место занято</p>
		</div>
	);

	return (
		<div className='bill'>
			<div className='site-card-wrapper'>
				<Row gutter={[18, 18]}>
					<Money/>
					<Col span={6} xs={24} sm={24} md={12} xl={6}>
						<Card title='Площадки' extra={<InfoCircleOutlined />} bordered className='bill-card'>
							<div className='cards-group'>
								<div className='cards-text'>
									<span className='bill-text'>Перед ДЦ</span>
								</div>
								<Badge count={2} className='site-badge-red' />
								<Popover content={placefree} trigger='click'>
									<Badge count={8} className='site-badge-green' />
								</Popover>
							</div>
							<div className='cards-group'>
								<div className='cards-text'>
									<span className='bill-text'>Задний двор</span>
								</div>
								<Badge count={2} className='site-badge-red' />
								<Badge count={2} className='site-badge-green' />
							</div>
							<div className='cards-group'>
								<div className='cards-text'>
									<span className='bill-text'>Шоу-рум</span>
								</div>
								<Popover placement='bottom' content={placebusy} trigger='click'>
									<Badge count={2} className='site-badge-red' />
								</Popover>
								<Badge count={2} className='site-badge-green' />
							</div>
							<div className='cards-group'>
								<div className='cards-text'>
									<span className='bill-text'>Еще площадки</span>
								</div>
								<Badge count='$' className='site-badge-blue' />
								<Badge count='$' className='site-badge-blue-plus' />
							</div>
						</Card>
					</Col>
					{/* <Employees /> */}
					<Col span={6} xs={24} sm={24} md={12} xl={6}>
						<Clients />
					</Col>
				</Row>
			</div>
			<Table />
		</div>
	);
};

export default React.memo(Bill);
