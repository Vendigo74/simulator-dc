import React, {useState} from 'react';
import { PageHeader, Steps } from 'antd';

const { Step } = Steps;

const GameStatus = () => {
	const [current, setCurrent] = useState(0);
	const onChange = (current) => {
		console.log('onChange current:', current);
		setCurrent(current);
	}
	return (
		<div className="game-status">
			<div className="site-page-header-ghost-wrapper">
				<PageHeader
					ghost={false}
					subTitle="Статус игры"
				>
					<Steps
						type="navigation"
						size="small"
						current={current}
						onChange={onChange}
						className="site-navigation-steps"
					>
						<Step
							title="Этап 1"
							subTitle="00:43:23"
							status="finish"
							description="Пройден!"
						/>
						<Step
							title="Этап 2"
							status="process"
							description="В процессе"
						/>
						<Step
							title="Этап 3"
							status="wait"
							description="Недоступно"
						/>
						<Step
							title="Этап 4"
							status="wait"
							description="Недоступно"
						/>
					</Steps>
				</PageHeader>
			</div>
		</div>
	);
};

export default React.memo(GameStatus);
