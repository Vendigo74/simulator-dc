import { Badge, Card } from 'antd';
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../app/hooks';

function Clients() {
	const { clientsForUi, countClients } = useAppSelector(state => state.client);

	return (
		<div>
			<Card title='Клиенты' extra={<InfoCircleOutlined />} bordered={true} className='bill-card'>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>На покупку</span>
					</div>
					<Badge
						count={clientsForUi.sales}
						showZero
						overflowCount={9999}
						className='site-badge-green'
					/>
				</div>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>На оценку</span>
					</div>
					<Badge
						count={clientsForUi.evaluation}
						showZero
						overflowCount={9999}
						className='site-badge-green'
					/>
				</div>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>На оценку-покупку</span>
					</div>
					<Badge
						count={clientsForUi.evaluationSales}
						showZero
						overflowCount={9999}
						className='site-badge-green'
					/>
				</div>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>Всего</span>
					</div>
					<Badge
						count={clientsForUi.evaluationSales + clientsForUi.evaluation + clientsForUi.sales}
						showZero
						overflowCount={9999}
						className='site-badge-green'
					/>
				</div>
				
			</Card>
		</div>
	);
}

export default Clients;
