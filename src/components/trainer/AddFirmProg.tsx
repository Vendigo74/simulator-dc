import { Button, Card, Form, Input } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAddFirmProg } from '../../feature/stands/carsAndStandsSlice';

function AddFirmProg() {
	const dispatch = useAppDispatch();
	const id = useAppSelector(state => state.player.player.id);

	const onFinish = (values: any) => {
		values.year = values.year * 1;
		values.mileage = values.mileage * 1;
		console.log('Success:', values);
		dispatch(fetchAddFirmProg({ ...values, id }));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Card title='Добавьте фирменную программу'>
			<Form
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				id='2'
			>
				<Form.Item
					label='Бренд'
					name='brand'
					rules={[{ required: true, message: 'Please input brand!' }]}
				>
					<Input data-testid="brand FirmProg" id={`${Math.random()}`} />
				</Form.Item>
				<Form.Item
					label='Модель'
					name='model'
					rules={[{ required: true, message: 'Please input model!' }]}
				>
					<Input data-testid="model FirmProg" id={`${Math.random()}`} />
				</Form.Item>
				<Form.Item
					label='Год'
					name='year'
					rules={[
						{
							required: true,
							message: 'Сработает, если у машины год меньше либо равен указанному',
						},
					]}
				>
					<Input data-testid="year FirmProg" id={`${Math.random()}`} />
				</Form.Item>
				<Form.Item
					label='Пробег'
					name='mileage'
					rules={[
						{ required: true, message: 'Сработает, если пробег меньше либо равен указанному' },
					]}
				>
					<Input data-testid="mileage FirmProg" id={`${Math.random()}`} />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button data-testid="addFirmProg" type='primary' htmlType='submit'>
						Добавить
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

export default AddFirmProg;
