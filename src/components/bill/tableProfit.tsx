import { Line } from '@ant-design/charts';
import Title from 'antd/lib/typography/Title';

import React from 'react';
import { useAppSelector } from '../../app/hooks';

function TableProfit() {
	const profit = useAppSelector(state => state.player.player.profit);
	const data = [
		{ month: `${profit[0].month}`, profit: profit[0].profit },
		{ month: `${profit[1].month}`, profit: profit[1].profit },
		{ month: `${profit[2].month}`, profit: profit[2].profit },
		{ month: `${profit[3].month}`, profit: profit[3].profit },
		{ month: `${profit[4].month}`, profit: profit[4].profit },
		{ month: `${profit[5].month}`, profit: profit[5].profit },
		{ month: `${profit[6].month}`, profit: profit[6].profit },
		{ month: `${profit[7].month}`, profit: profit[7].profit },
		{ month: `${profit[8].month}`, profit: profit[8].profit },
		{ month: `${profit[9].month}`, profit: profit[9].profit },
		{ month: `${profit[10].month}`, profit: profit[10].profit },
		{ month: `${profit[11].month}`, profit: profit[11].profit },
	];

	const config = {
		data,
		height: 400,
		xField: 'month',
		yField: 'profit',
		point: {
			size: 5,
			shape: 'diamond',
		},
	};
	return (
		<>
			<Title level={4}>Прибыль по месяцам</Title>
			<Line {...config} />
		</>
	);
}

export default TableProfit;
