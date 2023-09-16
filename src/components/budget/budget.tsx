import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { formatPrice } from '../../helpers/formatPrice';
import '../../styles/budget.scss';

const Budget = () => {
	const {
		player: { budget = null },
	} = useAppSelector(state => state.player);
	return (
		<div className='budget'>
			<span className='budget__description'>Бюджет:</span>
			<span className='budget__price'>{formatPrice(budget)} ₽</span>
		</div>
	);
};

export default Budget;
