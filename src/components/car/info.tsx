import { Button, Descriptions } from 'antd';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { formatPrice } from '../../helpers/formatPrice';

function Info() {
	const { budget } = useAppSelector(state => state.player.player);

	const { playerCars, capacity, countBuyCars, countSellCars, posts } = useAppSelector(
		state => state.stands
	);
	return (
		<Descriptions size={'default'}>
			<Descriptions.Item label='Текущий бюджет'>{formatPrice(budget)} ₽</Descriptions.Item>
			<Descriptions.Item label='Вместимость'>
				{capacity - playerCars.length} машин
			</Descriptions.Item>
			<Descriptions.Item label='Купленно'>{countBuyCars} авто</Descriptions.Item>
			<Descriptions.Item label='Проданно'>{countSellCars} авто</Descriptions.Item>
			<Descriptions.Item label='Посты'>
				{posts[0].count[0].countPost + posts[0].count[1].countPost + posts[0].count[2].countPost}
			</Descriptions.Item>
		</Descriptions>
	);
}

export default Info;
