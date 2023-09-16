import React, { FC, useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Button, Modal, Space, Table } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, PieChartOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { IPlayer } from '../../types/player';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPlayers } from '../../feature/player/playerSlice';
import { fetchTrainers, removeUser } from '../../feature/admin/adminSlice';

interface PlayerListProps {
	mode: string;
}

const PlayerList: FC<PlayerListProps> = ({ mode }) => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { players: playersFromState, player } = useAppSelector(state => state.player);
	const { trainers } = useAppSelector(state => state.admin);
	const [players, setPlayers] = useState<IPlayer[]>([]);

	useEffect(() => {
		dispatch(fetchTrainers());
		dispatch(fetchPlayers());
	}, []);

	useEffect(() => {
		if (mode === 'trainer') {
			const playersOfTrainer = playersFromState.filter(item => item.trainerId === player.id);
			setPlayers(playersOfTrainer);
		} else {
			setPlayers(playersFromState);
		}
	}, [playersFromState]);

	function displayTrainerName(id: string) {
		if (!trainers) return 'Неизвестно';
		const trainer = trainers.find(item => item._id === id);
		return trainer?.name || 'Неизвестно';
	}

	function confirmDelete(player: IPlayer) {
		if (!player) return;
		Modal.confirm({
			title: 'Подвердить удаление',
			icon: <ExclamationCircleOutlined />,
			content: `Вы действительно хотите удалить «${player.name}» ?`,
			okText: 'Подтверждаю',
			cancelText: 'Отмена',
			onOk: () => deletePlayer(player.id),
		});
	}

	const deletePlayer = async (playerId: string) => {
		if (playerId) {
			await dispatch(removeUser(playerId));
			await dispatch(fetchPlayers());
		}
	};

	const columns: ColumnsType = [
		{
			title: 'Игрок',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Тренер',
			dataIndex: 'trainerId',
			key: 'trainerId',
			render: key => <span>{displayTrainerName(key)}</span>,
		},
		{
			title: 'Действия',
			align: 'center',
			render: function renderAction(record) {
				return (
					<>
						<Space>
							<Button
								size='small'
								type='primary'
								onClick={() => history.push(`/player/stats/${record.id}`)}
								icon={<PieChartOutlined />}
							>
								Статистика
							</Button>
							{mode === 'admin' && (
								<Button
									size='small'
									danger
									onClick={() => confirmDelete(record)}
									icon={<DeleteOutlined />}
								>
									Удалить
								</Button>
							)}
						</Space>
					</>
				);
			},
		},
	];
	return (
		<div>
			<Table columns={columns} dataSource={players} rowKey='id' />
		</div>
	);
};

export default PlayerList;
