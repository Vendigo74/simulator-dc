import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrainers, setFromVisible, setTrainer } from '../../feature/admin/adminSlice';
import { RegAdmin } from '../../types/admin';
import AuthService from '../../services/AuthService';

interface IData {
	login: string;
	name: string;
	password: string;
	confirmPassword: string;
}

const TrainerRegisterForm = () => {
	const dispatch = useAppDispatch();
	const { formIsVisible } = useAppSelector(state => state.admin);
	const [form] = Form.useForm();
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!formIsVisible) {
			form.resetFields();
			setError('');
		}
	}, [formIsVisible]);

	const onSubmit = async (data: IData) => {
		if (data.password !== data.confirmPassword) return;
		const newTrainer: RegAdmin = data;
		setIsLoading(true);
		try {
			const response = await AuthService.registrationTrainer(newTrainer);
			form.resetFields();
			dispatch(setTrainer(response.data));
			dispatch(fetchTrainers());
			dispatch(setFromVisible(false));
		} catch (e) {
			console.log('error of login', e.response?.data?.message);
			setError(e.response?.data?.message || 'Ошибка запроса');
		} finally {
			setIsLoading(false);
		}
	};

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		onSubmit(values);
	};

	const onFormChange = () => {
		setError('');
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 10 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 14 },
		},
	};

	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 8,
			},
			sm: {
				span: 14,
				offset: 9,
			},
		},
	};

	return (
		<>
			{error !== '' && (
				<div className='login__alert'>
					<Alert message='Внимание' type='error' showIcon description={error} />
				</div>
			)}
			<Form
				{...formItemLayout}
				form={form}
				name='register'
				onFinish={onFinish}
				onChange={onFormChange}
				scrollToFirstError
			>
				<Form.Item
					name='login'
					label='Логин'
					rules={[
						{
							required: true,
							message: 'Обязательно для заполнения',
						},
						() => ({
							validator(_, value) {
								if (/^[a-zA-Z0-9]+$/gm.test(value)) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Допускаются только латинские цифры и буквы без проблеьных симоволов')
								);
							},
						}),
					]}
				>
					<Input disabled={isLoading} />
				</Form.Item>
				<Form.Item
					name='name'
					label='Имя'
					tooltip='Отображемое имя для других игроков'
					rules={[{ required: true, message: 'Обязательно для заполнения', whitespace: true }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='password'
					label='Пароль'
					rules={[
						{
							required: true,
							message: 'Обязательно для заполнения',
						},
					]}
					hasFeedback
				>
					<Input.Password disabled={isLoading} />
				</Form.Item>
				<Form.Item
					name='confirmPassword'
					label='Повторите пароль'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Обязательно для заполнения',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password disabled={isLoading} />
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button loading={isLoading} type='primary' htmlType='submit' style={{ marginTop: 10 }}>
						Добавить тренера
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default TrainerRegisterForm;
