import React from 'react';
/* import { InfoCircleOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Popover } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

function Employees() {
	const history = useHistory();

	const employeesHired = useAppSelector(state => state.employees.employeesHired);
	const recruitEmployee = (
		<div>
			<p className='popover'>Нанять сотрудника</p>
		</div>
	);
	return (
		<Col span={6} xs={24} sm={24} md={12} xl={6}>
			<Card title='Сотрудники' extra={<InfoCircleOutlined />} bordered className='bill-card'>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>Универсалы</span>
					</div>
					<Badge
						count={employeesHired.stationSellers.length}
						showZero
						className='site-badge-green'
					/>
				</div>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>Продавцы</span>
					</div>
					<Badge count={employeesHired.sellers.length} showZero className='site-badge-green' />
				</div>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<span className='bill-text'>Оценщики</span>
					</div>
					<Badge count={employeesHired.appraisers.length} showZero className='site-badge-green' />
				</div>
				<div className='cards-group'>
					<div className='cards-text-employees'>
						<Button
							className='bill-button'
							type='link'
							size='small'
							onClick={() => history.push('/employees')}
						>
							Еще сотрудники
						</Button>
					</div>
					<Popover content={recruitEmployee} trigger='click'>
						<Badge count='$' className='site-badge-blue' />
					</Popover>
				</div>
			</Card>
		</Col>
	);
}

export default Employees;
 */