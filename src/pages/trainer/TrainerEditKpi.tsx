import { Button, Col, Divider, Form, InputNumber, Row } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateTrainerKpi } from '../../feature/marketing/marketingSlice';

function TrainerEditKpi() {
	const dispatch = useAppDispatch();
	const trainerId = useAppSelector(state => state.player.player.id);
	const { kpi } = useAppSelector(state => state.marketing);

	const onFinish = (trainerKpi: any) => {
		const newKpi = Object.entries(trainerKpi);
		const newSendKpi = newKpi.reduce((acc: any, el: any) => {
			if (!el[1]) {
				acc[`${el[0]}`] = { ...kpi[`${el[0]}`] };
			}
			if (el[1]) {
				const newValue = el[1];
				acc[`${el[0]}`] = { ...kpi[`${el[0]}`], newValue };
			}
			return acc;
		}, {});
		console.log('Success:');
		dispatch(updateTrainerKpi({ trainerId, trainerKpi: newSendKpi }));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const descriptionKpi = {
		efficiency: 'На все каналы',
		efficiencyReception: 'По каналу приёма',
		efficiencyReceptionEthernet: 'По каналу приёма в интернете',
		efficiencyReceptionTradeIn: 'По приему Trade-in',
		efficiencyReceptionTradeInNA: 'По приему Trade-in НА',
		efficiencySales: 'Продажи',

		traffic: 'Общий',
		trafficForEvaluation: 'На оценку',
		trafficForEvaluationVisit: 'На оценку визит',
		trafficForEvaluationEthernet: 'На оценку из интернета',
		trafficForEvaluationCalls: 'На оценку со звонков',
		trafficForSales: 'На продажу',
		trafficForSalesVisit: 'На продажу визит',
		trafficForSalesEthernet: 'На продажу из интернета',
		trafficForSalesCalls: 'На продажу со звонков',

		profitToTrade: 'Доходность к сделке',
		spendingOnMarketing: 'Затраты по маркетингу',
		margin: 'Маржа',
		salesValue: 'Стоимость продажи',
		receptionValue: 'Стоимость выкупа',
	};

	const DescriptionItem = ({ title, content }) => (
		<div className='site-description-item-profile-wrapper'>
			<p className='site-description-item-profile-p-label'>{title}:</p>
			{content}
		</div>
	);

	return (
		<>
			<Form
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<p className='site-description-item-profile-p'>Эффективность</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.efficiency}`}
							content={`${kpi.efficiency?.newValue}%`}
						/>
						<Form.Item name='efficiency'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.efficiency?.border}
								defaultValue={kpi.efficiency?.newValue}
								value={kpi.efficiency?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.efficiencyReception}`}
							content={`${kpi.efficiencyReception?.newValue}%`}
						/>
						<Form.Item name='efficiencyReception'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.efficiencyReception?.border}
								defaultValue={kpi.efficiencyReception?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.efficiencyReceptionEthernet}`}
							content={`${kpi.efficiencyReceptionEthernet?.newValue}%`}
						/>
						<Form.Item name='efficiencyReceptionEthernet'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.efficiencyReceptionEthernet?.border}
								defaultValue={kpi.efficiencyReceptionEthernet?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.efficiencyReceptionTradeIn}`}
							content={`${kpi.efficiencyReceptionTradeIn?.newValue}%`}
						/>
						<Form.Item name='efficiencyReceptionTradeIn'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.efficiencyReceptionTradeIn?.border}
								defaultValue={kpi.efficiencyReceptionTradeIn?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.efficiencyReceptionTradeInNA}`}
							content={`${kpi.efficiencyReceptionTradeInNA?.newValue}%`}
						/>
						<Form.Item name='efficiencyReceptionTradeInNA'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.efficiencyReceptionTradeInNA?.border}
								defaultValue={kpi.efficiencyReceptionTradeInNA?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.efficiencySales}`}
							content={`${kpi.efficiencySales?.newValue}%`}
						/>
						<Form.Item name='efficiencySales'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.efficiencySales?.border}
								defaultValue={kpi.efficiencySales?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Divider style={{ margin: '16px 0' }} />

				<p className='site-description-item-profile-p'>Трафик</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForEvaluation}`}
							content={`${kpi.trafficForEvaluation?.newValue}`}
						/>
						<Form.Item name='trafficForEvaluation'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForEvaluation?.border}
								defaultValue={kpi.trafficForEvaluation?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForEvaluationVisit}`}
							content={`${kpi.trafficForEvaluationVisit?.newValue}`}
						/>
						<Form.Item name='trafficForEvaluationVisit'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForEvaluationVisit?.border}
								defaultValue={kpi.trafficForEvaluationVisit?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForEvaluationEthernet}`}
							content={`${kpi.trafficForEvaluationEthernet?.newValue}`}
						/>
						<Form.Item name='trafficForEvaluationEthernet'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForEvaluationEthernet?.border}
								defaultValue={kpi.trafficForEvaluationEthernet?.newValue}
							/>
						</Form.Item>
					</Col>

					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForEvaluationCalls}`}
							content={`${kpi.trafficForEvaluationCalls?.newValue}`}
						/>
						<Form.Item name='trafficForEvaluationCalls'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForEvaluationCalls?.border}
								defaultValue={kpi.trafficForEvaluationCalls?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForSales}`}
							content={`${kpi.trafficForSales?.newValue}`}
						/>
						<Form.Item name='trafficForSales'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForSales?.border}
								defaultValue={kpi.trafficForSales?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForSalesVisit}`}
							content={`${kpi.trafficForSalesVisit?.newValue}`}
						/>
						<Form.Item name='trafficForSalesVisit'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForSalesVisit?.border}
								defaultValue={kpi.trafficForSalesVisit?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForSalesEthernet}`}
							content={`${kpi.trafficForSalesEthernet?.newValue}`}
						/>
						<Form.Item name='trafficForSalesEthernet'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForSalesEthernet?.border}
								defaultValue={kpi.trafficForSalesEthernet?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.trafficForSalesCalls}`}
							content={`${kpi.trafficForSalesCalls?.newValue}`}
						/>
						<Form.Item name='trafficForSalesCalls'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.trafficForSalesCalls?.border}
								defaultValue={kpi.trafficForSalesCalls?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.traffic}`}
							content={`${kpi.traffic?.newValue}`}
						/>
						<Form.Item name='traffic'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.traffic?.border}
								defaultValue={kpi.traffic?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Divider />

				<p className='site-description-item-profile-p'>Доход</p>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.profitToTrade}`}
							content={`${kpi.profitToTrade?.newValue} руб.`}
						/>
						<Form.Item name='profitToTrade'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.profitToTrade?.border}
								defaultValue={kpi.profitToTrade?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.spendingOnMarketing}`}
							content={`${kpi.spendingOnMarketing?.newValue}%`}
						/>
						<Form.Item name='spendingOnMarketing'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.spendingOnMarketing?.border}
								defaultValue={kpi.spendingOnMarketing?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.margin}`}
							content={`${kpi.margin?.newValue}%`}
						/>
						<Form.Item name='margin'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.margin?.border}
								defaultValue={kpi.margin?.newValue}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.salesValue}`}
							content={`${kpi.salesValue?.newValue}%`}
						/>
						<Form.Item name='salesValue'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.salesValue?.border}
								defaultValue={kpi.salesValue?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title={`${descriptionKpi.receptionValue}`}
							content={`${kpi.receptionValue?.newValue}%`}
						/>
						<Form.Item name='receptionValue'>
							<InputNumber
								size='small'
								min={0}
								max={kpi.receptionValue?.border}
								defaultValue={kpi.receptionValue?.newValue}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

export default TrainerEditKpi;
