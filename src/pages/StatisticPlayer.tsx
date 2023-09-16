import React, { useEffect, useState } from 'react';
import '../styles/admin.scss';
import { Button, Card, Spin } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	fetchCurrentPlayer,
	fetchPlayerLogs,
	setCurrentPlayer,
	setPlayerLogs,
} from '../feature/admin/adminSlice';
import { formatPrice } from '../helpers/formatPrice';
import PlayerLogs from '../components/player/player-logs';

interface ParamsTypes {
	id: string;
}

const StatisticPlayer = () => {
	const { id: playerId } = useParams<ParamsTypes>();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { currentPlayer, playerLogs } = useAppSelector(state => state.admin);
	const { playersStats } = useAppSelector(state => state.player);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		dispatch(fetchCurrentPlayer(playerId));
	}, []);

	useEffect(
		() => () => {
			setCurrentPlayer(null);
			dispatch(setPlayerLogs([]));
		},
		[]
	);

	useEffect(() => {
		if (currentPlayer !== null) {
			setIsLoading(false);
			dispatch(fetchPlayerLogs(playerId));
		}
	}, [currentPlayer]);

	if (isLoading) {
		return (
			<div className='spin'>
				<Spin size='large' />
			</div>
		);
	}

	return (
		<div className='admin'>
			<Card
				title={`Статистика игрока ${currentPlayer.name}`}
				extra={
					<Button icon={<LeftOutlined />} type='link' onClick={() => history.push('/players')}>
						Вернуться к игрокам
					</Button>
				}
			>
				{playersStats.map(el => {
					console.log(el);
					if (el.stats.id === playerId)
						return (
							<>
								<div>{formatPrice(el.stats.budget)}</div>
								<div>{formatPrice(el.stats.profitTotal)}</div>
							</>
						);
				})}
				<PlayerLogs logs={playerLogs} />
			</Card>
		</div>
	);
};

export default StatisticPlayer;
