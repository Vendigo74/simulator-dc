import React, { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hooks';
import { checkAuth } from '../../feature/player/playerSlice';
import { LoginAdmin } from '../../types/admin';
import AuthService from '../../services/AuthService';

const AdminLoginForm = () => {
	const { reset } = useForm();
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onFinish = async (values: any) => {
		const userData: LoginAdmin = {
			...values,
		};
		setIsLoading(true);
		try {
			const response = await AuthService.loginAdminOrTrainer(userData);
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
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				onChange={onFormChange}
			>
				<Form.Item
					label='Логин'
					name='login'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
					labelAlign='left'
				>
					<Input disabled={isLoading} />
				</Form.Item>

				<Form.Item
					label='Пароль'
					name='password'
					rules={[{ required: true, message: 'Обязательно для заполнения' }]}
					labelAlign='left'
				>
					<Input.Password disabled={isLoading} />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 12 }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default AdminLoginForm;
