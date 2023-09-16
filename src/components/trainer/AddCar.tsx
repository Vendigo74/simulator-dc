import { Button, Card, Col, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAddCars } from '../../feature/stands/carsAndStandsSlice';

function AddCar() {
	const dispatch = useAppDispatch();
	const id = useAppSelector(state => state.player.player.id);

	const onFinish = (values: any) => {
		console.log('Success:', values);
		dispatch(fetchAddCars({ ...values, id }));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Card title='Добавьте машину'>
			<Form
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				id='1'
			>
				<Row gutter={[16, 16]}>
					<Col span={8}>
						<Form.Item
							label='Бренд'
							name='brand'
							rules={[{ required: true, message: 'Please input brand!' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Модель'
							name='model'
							rules={[{ required: true, message: 'Please input model!' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Год'
							name='year'
							rules={[
								{
									required: true,
									message: 'Заполните поле',
								},
							]}
						>
							<InputNumber style={{ width: '100%' }} id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Пробег'
							name='mileage'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<InputNumber style={{ width: '100%' }} id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Кузов'
							name='body'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Объем двигателя'
							name='engineVolume'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<InputNumber style={{ width: '100%' }} id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Мощность двигателя'
							name='enginePower'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<InputNumber style={{ width: '100%' }} id={`${Math.random()}`} />
						</Form.Item>

						<Form.Item
							label='Трансмиссия'
							name='transmission'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Привод'
							name='driveUnit'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Салон'
							name='salon'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Стоимость выкупа'
							name='priceBuy'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<InputNumber style={{ width: '100%' }} id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Фирменная программа %'
							name='priceFirmProg'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Цена с допами, %'
							name='priceDop'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<InputNumber style={{ width: '100%' }} id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Ссылка на картинку бренда'
							name='brandIcon'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
						<Form.Item
							label='Картинка машины'
							name='imgSrc'
							rules={[{ required: true, message: 'Заполните поле' }]}
						>
							<Input id={`${Math.random()}`} />
						</Form.Item>
					</Col>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type='primary' htmlType='submit'>
							Добавить
						</Button>
					</Form.Item>
				</Row>
			</Form>
		</Card>
	);
}

export default AddCar;
