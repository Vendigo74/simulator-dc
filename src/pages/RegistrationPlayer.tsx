import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Card, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { regPlayer, setErrorMessage } from '../feature/player/playerSlice';
import { RegPlayer } from '../types/player';
import { fetchTrainer } from '../feature/admin/adminSlice';

interface ParamsType {
	trainerId: string;
}

const RegistrationPlayer = () => {
	const { trainerId } = useParams<ParamsType>();
	const dispatch = useAppDispatch();
	const {
		errorMessage,
		auth: { status },
	} = useAppSelector(state => state.player);
	const { trainer, status: statusOfTrainer } = useAppSelector(state => state.admin);

	useEffect(() => {
		dispatch(fetchTrainer(trainerId));
	}, [trainerId]);

	function clearErrorMessage() {
		dispatch(setErrorMessage(''));
	}

	const onFinish = (values: any) => {
		const newPlayer: RegPlayer = { ...values, trainerId };
		dispatch(regPlayer(newPlayer));
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className='login container'>
			<div className='login__wrapper wrapper'>
				<Card title='Регистрация нового игрока'>
					{status === 'idle' && trainer !== null && (
						<div className='login__alert'>
							<Alert message={`Ваш тренер: ${trainer.name}`} type='info' showIcon />
						</div>
					)}
					{statusOfTrainer === 'failed' && (
						<div className='login__alert'>
							<Alert
								message='Тренер не найден'
								type='error'
								showIcon
								description='Не смогли определить вашего тренера, запросите актуальную ссылку регистрации'
							/>
						</div>
					)}
					{status === 'failed' && errorMessage !== '' && (
						<div className='login__alert'>
							<Alert message='Внимание' type='error' showIcon description={errorMessage} />
						</div>
					)}
					<Form name='basic' onFinish={onFinish} onFinishFailed={onFinishFailed}>
						<Form.Item
							label='Имя'
							name='name'
							rules={[{ required: true, message: 'Имя не должно быть пустым' }]}
							labelAlign='left'
						>
							<Input
								disabled={statusOfTrainer === 'failed'}
								onChange={clearErrorMessage}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								loading={status === 'loading'}
								type='primary'
								htmlType='submit'
								disabled={statusOfTrainer === 'failed' || status === 'failed'}
							>
								Присоединиться к игре
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default RegistrationPlayer;
