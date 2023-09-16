import {
	Button,
	Card,
	Col,
	Collapse,
	Descriptions,
	Divider,
	Form,
	Input,
	InputNumber,
	Row,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	fetchDeleteCars,
	fetchUpdateCars,
	fetchUpdateFirmProg,
} from '../../feature/stands/carsAndStandsSlice';

const { Panel } = Collapse;

function InfoCar() {
	const dispatch = useAppDispatch();

	const cars = useAppSelector(state => state.stands.cars);

	const onFinish = (values: any, id) => {
		console.log('Success:', values, id);
		dispatch(fetchUpdateCars({ ...values, _id: id }));
	};

	const handleDelate = id => {
		console.log('Success:', id);
		dispatch(fetchDeleteCars(id));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const DescriptionItem = ({ title }) => (
		<div className='site-description-item-profile-wrapper'>
			<p className='site-description-item-profile-p-label'>{title}:</p>
		</div>
	);
	return (
		<Card title='Машины'>
			{cars &&
				cars.map(car => {
					return (
						<Collapse accordion key={`${car._id}`}>
							<Panel header={`${car.name}`} key={`${car._id}`}>
								<Form
									name='firmprogUpdate'
									initialValues={{ remember: true }}
									onFinish={values => onFinish(values, car._id)}
									onFinishFailed={onFinishFailed}
									id={`${car._id}`}
								>
									<Row gutter={[16, 16]}>
										<Col span={8}>
											<DescriptionItem title={'Бренд'} />
											<FormItem name='brand'>
												<Input
													size='small'
													id={`${Math.random()}`}
													defaultValue={car.brand}
													value={car.brand}
												/>
											</FormItem>

											<DescriptionItem title={'Модель'} />
											<FormItem name='model'>
												<Input
													size='small'
													id={`${Math.random()}`}
													defaultValue={car.model}
													value={car.model}
												/>
											</FormItem>
											<DescriptionItem title={'Год'} />
											<FormItem name='year'>
												<InputNumber
													id={`${Math.random()}`}
													size='small'
													min={0}
													defaultValue={car.year}
													value={car.year}
												/>
											</FormItem>
											<DescriptionItem title={'Пробег'} />
											<FormItem name='mileage'>
												<InputNumber
													size='small'
													min={0}
													defaultValue={car.mileage}
													value={car.mileage}
													id={`${Math.random()}`}
												/>
											</FormItem>
											<DescriptionItem title={'Кузов'} />
											<FormItem name='body'>
												<Input
													size='small'
													defaultValue={car.body}
													value={car.body}
													id={`${Math.random()}`}
												/>
											</FormItem>
										</Col>
										<Col span={8}>
											<DescriptionItem title={'Объем двигателя'} />
											<FormItem name='engineVolume'>
												<InputNumber
													size='small'
													id={`${Math.random()}`}
													defaultValue={car.engineVolume}
													value={car.engineVolume}
												/>
											</FormItem>

											<DescriptionItem title={'Мощность двигателя'} />
											<FormItem name='enginePower'>
												<InputNumber
													size='small'
													id={`${Math.random()}`}
													defaultValue={car.enginePower}
													value={car.enginePower}
												/>
											</FormItem>
											<DescriptionItem title={'Трансмиссия'} />
											<FormItem name='transmission'>
												<Input
													id={`${Math.random()}`}
													size='small'
													defaultValue={car.transmission}
													value={car.transmission}
												/>
											</FormItem>
											<DescriptionItem title={'Привод'} />
											<FormItem name='driveUnit'>
												<Input
													size='small'
													defaultValue={car.driveUnit}
													value={car.driveUnit}
													id={`${Math.random()}`}
												/>
											</FormItem>
											<DescriptionItem title={'Салон'} />
											<FormItem name='salon'>
												<Input
													size='small'
													defaultValue={car.salon}
													value={car.salon}
													id={`${Math.random()}`}
												/>
											</FormItem>
										</Col>
										<Col span={8}>
											<DescriptionItem title={'Стоимость выкупа'} />
											<FormItem name='priceBuy'>
												<InputNumber
													size='small'
													id={`${Math.random()}`}
													defaultValue={car.priceBuy}
													value={car.priceBuy}
												/>
											</FormItem>

											<DescriptionItem title={'Фирменная программа %'} />
											<FormItem name='priceFirmProg'>
												<InputNumber
													size='small'
													id={`${Math.random()}`}
													defaultValue={car.priceFirmProg}
													value={car.priceFirmProg}
												/>
											</FormItem>
											<DescriptionItem title={'Цена с допами, %'} />
											<FormItem name='priceDop'>
												<InputNumber
													id={`${Math.random()}`}
													size='small'
													min={0}
													defaultValue={car.priceDop}
													value={car.priceDop}
												/>
											</FormItem>
											<DescriptionItem title={'Ссылка на картинку бренда'} />
											<FormItem name='brandIcon'>
												<Input
													size='small'
													defaultValue={car.brandIcon}
													value={car.brandIcon}
													id={`${Math.random()}`}
												/>
											</FormItem>
											<DescriptionItem title={'Картинка машины'} />
											<FormItem name='imgSrc'>
												<Input
													size='small'
													defaultValue={car.imgSrc}
													value={car.imgSrc}
													id={`${Math.random()}`}
												/>
											</FormItem>
										</Col>
									</Row>
									<FormItem wrapperCol={{ offset: 8, span: 16 }}>
										<Button type='primary' htmlType='submit'>
											Обновить
										</Button>{' '}
										<Button type='primary' danger onClick={() => handleDelate(car._id)}>
											Удалить
										</Button>
									</FormItem>
									<Divider />
								</Form>
							</Panel>
						</Collapse>
					);
				})}
		</Card>
	);
}

export default InfoCar;
