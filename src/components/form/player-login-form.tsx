import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { checkAuth } from '../../feature/player/playerSlice';
import { useAppDispatch } from '../../app/hooks';
import { LoginPlayer } from '../../types/player';
import AuthService from '../../services/AuthService';

const PlayerLoginForm = () => {
	const { reset } = useForm();
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onFinish = async (values: any) => {
		const userData: LoginPlayer = {
			...values,
		};
		setIsLoading(true);
		try {
			const response = await AuthService.loginPlayer(userData);
			localStorage.setItem('token', response.data.accessToken);
			reset();
			dispatch(checkAuth());
		} catch (e) {
			console.log('error of login', e.response?.data?.message);
			setError(e.response?.data?.message || 'Ошибка запроса');
		} finally {
			setIsLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const onFormChange = () => {
		setError('');
	};

	return (
		<>
			{error !== '' && (
				<div className='login__alert'>
					<Alert message='Внимание' type='error' showIcon description={error} />
				</div>
			)}
			<Form
				name='basic'
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onChange={onFormChange}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Имя'
					name='name'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
					labelAlign='left'
				>
					<Input disabled={isLoading} />
				</Form.Item>

				<Form.Item
					label='ID тренера'
					name='trainerId'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
					labelAlign='left'
				>
					<Input disabled={isLoading} />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 12 }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Войти
					</Button>
					61134be891e07f81a0eca43e
				</Form.Item>
			</Form>
		</>
	);
};

export default PlayerLoginForm;
