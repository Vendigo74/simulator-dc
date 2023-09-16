import React, { FC } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Table, Tag } from 'antd';
import moment from 'moment';
import { ILog } from '../../types/log';
import 'moment/locale/ru';

moment.locale('ru');

interface PlayerLogsProps {
	logs: ILog[];
}

const PlayerLogs: FC<PlayerLogsProps> = ({ logs }) => {
	const padTime = time => {
		return String(time).length === 1 ? `0${time}` : `${time}`;
	};
	const format = time => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${padTime(seconds)}`;
	};

	const columns: ColumnsType = [
		{
			title: 'Действие',
			render: record => {
				const { type, message } = record;
				return (
					<>
						<p className='logs__message' color={getLogColor(type)}>
							{message}
						</p>
					</>
				);
			},
		},
		{
			title: 'Бюджет',
			align: 'right',
			render: record => {
				const { type, budget } = record;
				return (
					<>
						<Tag>{budget}</Tag>
					</>
				);
			},
		},
		{
			title: 'Изменение',
			align: 'right',
			render: record => {
				const { type, price } = record;
				return (
					<>
						<Tag>{price}</Tag>
					</>
				);
			},
		},
		{
			title: 'Ежемесечный платеж',
			align: 'center',
			render: record => {
				const { type, rent } = record;
				return (
					<>
						<Tag>{rent}</Tag>
					</>
				);
			},
		},
		{
			title: 'Время',
			align: 'right',
			sorter: {
				compare: (a: any, b: any) => a.time - b.time,
				multiple: 1,
			},
			render: record => {
				const { time } = record;
				return <span> {format(time)}</span>;
			},
		},
	];

	function getLogColor(type: string) {
		const colors = {
			INFO: 'blue',
			WARNING: 'orange',
			ERROR: 'red',
		};

		return colors[type] || 'black';
	}

	return (
		<div className='logs'>
			<Table columns={columns} dataSource={logs} rowKey='_id' size='small' />
		</div>
	);
};

export default PlayerLogs;
