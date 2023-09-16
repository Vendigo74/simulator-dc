import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import '../../styles/trainer.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchKpi } from '../../feature/marketing/marketingSlice';
import { fetchCars, fetchFirmProg } from '../../feature/stands/carsAndStandsSlice';
import { fetchStats } from '../../feature/player/playerSlice';

const { Search } = Input;

const TrainerPage = () => {
	const dispatch = useAppDispatch();

	const { player } = useAppSelector(state => state.player);
	const [trainerLink, setTrainerLink] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [copyBtnText, setCopyBtnText] = useState<string>('Copy');
	const trainerId = useAppSelector(state => state.player.player.id);
	const id = useAppSelector(state => state.player.player.id);

	useEffect(() => {
		setTrainerLink(`${window.location.origin}/registration/${player.id}`);
		if (trainerId) {
			dispatch(fetchCars(trainerId));
			dispatch(fetchStats(trainerId));
			dispatch(fetchKpi({ trainerId, id }));
			dispatch(fetchFirmProg(id));
		}
	}, [player]);

	const onSearch = () => {
		setIsLoading(true);
		navigator.clipboard.writeText(trainerLink);
		setTimeout(() => {
			setCopyBtnText('Ok');
		}, 200);
		setTimeout(() => {
			setIsLoading(false);
			setCopyBtnText('Copy');
		}, 400);
	};

	return (
		<div className='trainer'>
			<Card title='Админка тренера'>
				<div>
					Тренер: <strong>{player.name}</strong>
				</div>
				<div>
					Ваш ID: <strong>{player.id}</strong>
				</div>
				<div className='trainer__action-wrapper'>
					<Search
						placeholder='Ссылка тренера'
						addonBefore='Ссылка на регистрацию:'
						onSearch={onSearch}
						value={trainerLink}
						style={{ maxWidth: 800 }}
						enterButton={copyBtnText}
						size='large'
						loading={isLoading}
					/>
				</div>
			</Card>
		</div>
	);
};

export default TrainerPage;
