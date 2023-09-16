import React from 'react';
import { Card } from 'antd';
import { useAppSelector } from '../../app/hooks';
import '../../styles/admin.scss';

const AdminPage = () => {
	const { player } = useAppSelector(state => state.player);
	return (
		<div className='admin'>
			<Card title='Панель администратора'>
				<div>
					Администратор: <strong>{player.name}</strong>
				</div>
			</Card>
		</div>
	);
};

export default AdminPage;
