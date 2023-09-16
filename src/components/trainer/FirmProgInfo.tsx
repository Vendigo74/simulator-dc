import { Button, Card, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDeleteFirmProg, fetchUpdateFirmProg } from '../../feature/stands/carsAndStandsSlice';

function FirmProgInfo() {
	const dispatch = useAppDispatch();
	const { firmProg } = useAppSelector(state => state.stands);

	const onFinish = (values: any, id) => {
		console.log('Success:', values, id);
		dispatch(fetchUpdateFirmProg({ ...values, _id: id }));
	};

	const handleDelate = id => {
		console.log('Success:', id);
		dispatch(fetchDeleteFirmProg(id));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const DescriptionItem = ({ title, content }) => (
		<div className='site-description-item-profile-wrapper'>
			<p className='site-description-item-profile-p-label'>{title}:</p>
			{content}
		</div>
	);
	return (
		<Card title='Фирменные программы'>
			{firmProg.map((item, i) => {
				return (
					<Form
						name='firmprogUpdate'
						initialValues={{ remember: true }}
						onFinish={values => onFinish(values, item._id)}
						onFinishFailed={onFinishFailed}
						id={`${item._id}`}
						key={`${item._id}`}
					>
						<Row gutter={16}>
							<Col span={12}>
								<DescriptionItem title={'Бренд'} content={`${item.brand}`} />
								<Form.Item name='brand'>
									<Input id={`${Math.random()}`} defaultValue={item.brand} value={item.brand} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<DescriptionItem title={'Модель'} content={`${item.model}`} />
								<Form.Item name='model'>
									<Input id={`${Math.random()}`} defaultValue={item.model} value={item.model} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<DescriptionItem title={'Год'} content={`${item.year}`} />
								<Form.Item name='year'>
									<InputNumber
										id={`${Math.random()}`}
										size='small'
										min={0}
										defaultValue={item.year}
										value={item.year}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<DescriptionItem title={'Пробег'} content={`${item.mileage}`} />
								<Form.Item name='mileage'>
									<InputNumber
										size='small'
										min={0}
										defaultValue={item.mileage}
										value={item.mileage}
										id={`${Math.random()}`}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type='primary' htmlType='submit'>
								Обновить
							</Button>{' '}
							<Button type='primary' danger onClick={() => handleDelate(item._id)}>
								Удалить
							</Button>
						</Form.Item>
						<Divider />
					</Form>
				);
			})}
		</Card>
	);
}

export default FirmProgInfo;
