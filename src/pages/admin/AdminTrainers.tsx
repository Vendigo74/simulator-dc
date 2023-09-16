import React, { useEffect } from 'react';
import { Button, Card, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrainers, removeUser, setFromVisible } from '../../feature/admin/adminSlice';
import '../../styles/admin.scss';
import { ITrainer } from '../../types/admin';
import TrainerRegisterForm from '../../components/form/trainer-register-form';

const AdminTrainers = () => {
	const dispatch = useAppDispatch();
	const { trainers, formIsVisible } = useAppSelector(state => state.admin);

	useEffect(() => {
		dispatch(fetchTrainers());
	}, []);

	function confirmDelete(trainer: ITrainer) {
		if (!trainer) return;
		Modal.confirm({
			title: 'Подвердить удаление',
			icon: <ExclamationCircleOutlined />,
			content: `Вы действительно хотите удалить «${trainer.name}» ?`,
			okText: 'Подтверждаю',
			cancelText: 'Отмена',
			onOk: () => deleteTrainer(trainer._id),
		});
	}

	const deleteTrainer = async (trainerId: string) => {
		if (trainerId) {
			await dispatch(removeUser(trainerId));
			await dispatch(fetchTrainers());
		}
	};

	const columns: ColumnsType = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
			render: function renderText(name) {
				return (
					<Button type='link' size='small'>
						{name}
					</Button>
				);
			},
		},
		{
			title: 'Действие',
			align: 'center',
			render: function renderAction(record) {
				return (
					<>
						<Button
							size='small'
							danger
							onClick={() => confirmDelete(record)}
							icon={<DeleteOutlined />}
						>
							Удалить
						</Button>
					</>
				);
			},
		},
	];

	const handleCancel = () => {
		dispatch(setFromVisible(false));
	};

	return (
		<div className='admin'>
			<Card
				title='Тренеры'
				extra={
					<Button
						icon={<PlusCircleOutlined />}
						type='link'
						onClick={() => dispatch(setFromVisible(true))}
					>
						Добавить тренера
					</Button>
				}
			>
				{trainers !== null && <Table columns={columns} dataSource={trainers} rowKey='_id' />}
				<Modal
					visible={formIsVisible}
					title='Регистрация тренера'
					onCancel={handleCancel}
					footer={[]}
				>
					<TrainerRegisterForm />
				</Modal>
			</Card>
		</div>
	);
};

export default AdminTrainers;
