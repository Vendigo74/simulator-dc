import React from 'react';
import { Row, Col } from 'antd';

import FirmProgInfo from '../../components/trainer/FirmProgInfo';
import AddFirmProg from '../../components/trainer/AddFirmProg';
import AddCar from '../../components/trainer/AddCar';
import InfoCar from '../../components/trainer/InfoCar';

function TrainerEditFirmProg() {
	return (
		<Row gutter={[16, 24]}>
			<Col span={24}>
			<AddCar/>
			</Col>
			<Col span={24}>
			<InfoCar/>
			</Col>
			<Col span={12}>
				<AddFirmProg />
			</Col>
			<Col span={12}>
				<FirmProgInfo />
			</Col>
		</Row>
	);
}

export default TrainerEditFirmProg;
