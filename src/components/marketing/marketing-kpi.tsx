import { Col, Divider, Drawer, Row } from 'antd';
import React, { FC } from 'react';

interface BuyMarketingProps {
	showModal: boolean;
	kpi: any;
	onClose?: () => void;
}

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

const MarketingKpi = React.memo<BuyMarketingProps>(({ showModal, kpi, onClose }) => {
	return (
		<Drawer
			title='Текущий KPI'
			placement='right'
			width={640}
			closable={false}
			onClose={onClose}
			visible={showModal}
		>
			<p className='site-description-item-profile-p'>Эффективность</p>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.efficiency}`}
						content={`${kpi.efficiency?.newValue}%`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.efficiencyReception}`}
						content={`${kpi.efficiencyReception?.newValue}%`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.efficiencyReceptionEthernet}`}
						content={`${kpi.efficiencyReceptionEthernet?.newValue}%`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.efficiencyReceptionTradeIn}`}
						content={`${kpi.efficiencyReceptionTradeIn?.newValue}%`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.efficiencyReceptionTradeInNA}`}
						content={`${kpi.efficiencyReceptionTradeInNA?.newValue}%`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.efficiencySales}`}
						content={`${kpi.efficiencySales?.newValue}%`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<DescriptionItem title='Описание' content='Влияет на качество обработки трафика.' />
				</Col>
			</Row>
			<Divider style={{ margin: '16px 0' }} />

			<p className='site-description-item-profile-p'>Трафик</p>
			<Row>

				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.trafficForEvaluationVisit}`}
						content={`${kpi.trafficForEvaluationVisit?.newValue}`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.trafficForEvaluationEthernet}`}
						content={`${kpi.trafficForEvaluationEthernet?.newValue}`}
					/>
				</Col>

				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.trafficForEvaluationCalls}`}
						content={`${kpi.trafficForEvaluationCalls?.newValue}`}
					/>
				</Col>
			</Row>
			<Row>

				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.trafficForSalesVisit}`}
						content={`${kpi.trafficForSalesVisit?.newValue}`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.trafficForSalesEthernet}`}
						content={`${kpi.trafficForSalesEthernet?.newValue}`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.trafficForSalesCalls}`}
						content={`${kpi.trafficForSalesCalls?.newValue}`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.traffic}`}
						content={`${kpi.traffic?.newValue}`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<DescriptionItem
						title='Описание'
						content='Показывает кол-во клиентов пришедших с того или иного канала. В зависимости от канала трафика высчитывается вероятность успеха целевого действия.'
					/>
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
				</Col>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.spendingOnMarketing}`}
						content={`${kpi.spendingOnMarketing?.newValue}%`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.margin}`}
						content={`${kpi.margin?.newValue}%`}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.salesValue}`}
						content={`${kpi.salesValue?.newValue}%`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title={`${descriptionKpi.receptionValue}`}
						content={`${kpi.receptionValue?.newValue}%`}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<DescriptionItem
						title='Описание'
						content='Показатели, которые влияют на итоговый доход'
					/>
				</Col>
			</Row>
		</Drawer>
	);
});

export default MarketingKpi;
