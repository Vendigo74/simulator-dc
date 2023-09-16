import React from 'react';
import { Card } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import PlayerList from '../../components/player/player-list';

const AdminPlayers = () => {
	const dispatch = useAppDispatch();
	return (
		<Card title='Игроки'>
			<PlayerList mode='admin' />
		</Card>
	);
};

export default AdminPlayers;
