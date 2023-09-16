import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { formatPrice } from '../../helpers/formatPrice';
import styles from '../../styles/Marketing.module.scss';
import stylesBudget from '../../styles/CardsChoose.module.scss';


function Info() {
	const { budget, rent } = useAppSelector(state => state.player.player);

	return (
		<div>
			<div className={styles['budget']}>
				<span className={stylesBudget['budget__description']}>Текущий бюджет: </span>
				<span className={stylesBudget['budget__price']}>{formatPrice(budget)} ₽</span>
			</div>
			<div className={styles['budget']}>
				<span className={stylesBudget['budget__description']}>Ежемесячные платежи: </span>
				<span className={stylesBudget['budget__price']}>{formatPrice(rent)} ₽</span>
			</div>
		</div>
	);
}

export default Info;
