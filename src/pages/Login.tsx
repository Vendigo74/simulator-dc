import React, { useState } from 'react';
import { Card } from 'antd';
import PlayerLoginForm from '../components/form/player-login-form';
import AdminLoginForm from '../components/form/admin-login-form';

const tabList = [
	{
		key: 'player',
		tab: 'Вход для игроков',
	},
	{
		key: 'admin',
		tab: 'Вход для тренеров / админов',
	},
];

const contentList = {
	player: <PlayerLoginForm />,
	admin: <AdminLoginForm />,
};

function Login() {
	const [activeTabKey, setActiveTabKey] = useState<string>('player');

	return (
		<div className='login container'>
			<div className='login__wrapper wrapper'>
				<Card
					tabList={tabList}
					activeTabKey={activeTabKey}
					onTabChange={key => setActiveTabKey(key)}
				>
					{contentList[activeTabKey]}
				</Card>
			</div>
		</div>
	);
}

export default Login;
