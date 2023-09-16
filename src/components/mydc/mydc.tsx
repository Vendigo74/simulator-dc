import React from 'react';
import { Popover, PageHeader } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import styles from '../../styles/MyDC.module.scss';
import { useAppSelector } from '../../app/hooks';
import Time from './time';

const MyDC = () => {
	const { name } = useAppSelector(state => state.player.player);

	const content = (
		<div>
			<p>Время игры</p>
		</div>
	);

	return (
		<div className={styles['my-dc']}>
			<div className={styles['site-page-header-ghost-wrapper']}>
				<PageHeader
					ghost={false}
					title={`Мой ДЦ (${name})`}
					extra={[
						<Popover key='key' placement='bottom' content={content} trigger='click'>
							<div className={styles['time-group']}>
								<HistoryOutlined className={styles['clock-icon']} />
								<div className={styles['time']}>
									<Time />
								</div>
							</div>
						</Popover>,
					]}
				></PageHeader>
			</div>
		</div>
	);
};

export default React.memo(MyDC);
