import React from 'react';
import { Badge, Button, notification } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useHistory } from 'react-router-dom';
import {
	changeBudget,
	changeStatusGame,
	logout,
	setProfit,
} from '../../feature/player/playerSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearClients } from '../../feature/client/clientSlice';
import { formatPrice } from '../../helpers/formatPrice';

import { changeActionOneItem } from '../../feature/marketing/marketingSlice';

import { fetchEmployees } from '../../feature/employees/employeesSlice';

import { useGeneratorClient } from '../../hooks/useGeneratorClient';
import { useBuyCar } from '../../hooks/useBuyCar';
import { useSellesCar } from '../../hooks/useSellesCar';
import { percentageChance } from '../../helpers/randomizer';
import { clearLimit, setBudgetEvent } from '../../feature/events/eventsSlice';
import { useTradeIn } from '../../hooks/useTradeIn';

const FooterComponent = () => {
	const dispatch = useAppDispatch();
	const history = useHistory();

	const onLogout = async () => {
		await dispatch(logout());
		history.push('/');
	};

	const { isAuth } = useAppSelector(state => state.player.auth);
	const { marketingActive } = useAppSelector(state => state.marketing);
	const month = useAppSelector(state => state.client.month);
	const { events, budgetEvents } = useAppSelector(state => state.events);
	const isEvent = useAppSelector(state => state.events.budgetEvents.isEvent);
	const limitEmp = useAppSelector(state => state.events.limitEmp);
	const { playerCars } = useAppSelector(state => state.stands);
	const rent = useAppSelector(state => state.player.player.rent);

	const [event, setevent] = React.useState(null);
	const [emp, setemp] = React.useState(null);

	const [counterDay, counter] = useGeneratorClient();

	useBuyCar(counterDay);
	useSellesCar(counterDay);
	useTradeIn(counterDay);

	React.useEffect(() => {
		marketingActive.map(el => {
			if (el.month + 3 === month) {
				if (el.id === 52) {
					dispatch(changeActionOneItem({ id: el.id, stateId: 11 }));
				}
				if (el.id === 53) {
					dispatch(changeActionOneItem({ id: el.id, stateId: 11 }));
				}
			}
		});

		marketingActive.map(el => {
			if (el.month + 6 === month) {
				if (el.id === 51) {
					dispatch(changeActionOneItem({ id: el.id, stateId: 11 }));
				}
			}
		});
	}, [month]);

	React.useEffect(() => {
		// dispatch(changeStatusGame(isAuth));
		if (!isAuth) {
			dispatch(clearClients());
		}
		if (isAuth) {
			// dispatch(fetchEmployees(8));
		}
	}, [isAuth]);

	React.useEffect(() => {
		dispatch(clearLimit());
		let sendMonth;
		if (month === 1) {
			sendMonth = 1;
		} else {
			sendMonth = month - 1;
		}
		dispatch(setProfit({ month: sendMonth, profit: rent ? -rent : 0 }));
	}, [month]);

	React.useEffect(() => {
		events.map(el => {
			const event = percentageChance([{}, el], [80, 20]);
			if (event.name) {
				if (playerCars.length > 0) {
					setevent(event);
				}
			}
		});
	}, [month]);

	React.useEffect(() => {
		limitEmp.map(el => {
			setemp(el);
		});
	}, [limitEmp]);

	if (counter <= 0) {
		dispatch(changeStatusGame(false));
	}

	const close = () => {
		console.log(
			'Notification was closed. Either the close button was clicked or duration time elapsed.'
		);
	};

	const openNotificationLimit = placement => {
		const key = `open${Date.now()}`;
		const btn = (
			<Button type='primary' size='small' onClick={() => notification.close(key)}>
				Confirm
			</Button>
		);
		notification.open({
			message: `${emp.name}`,
			description: `Ваш сотрудник исчерпал лимит приёма клиентов. Наймите дополнительного сотрудника для обработки потока клиентов`,
			btn,
			key,
			placement,
			duration: 6,
			onClose: close,
		});
		setemp(null);
	};

	const openNotificationBudget = placement => {
		const key = `open${Date.now()}`;
		const btn = (
			<Button type='primary' size='small' onClick={() => notification.close(key)}>
				Confirm
			</Button>
		);
		notification.open({
			message: `${budgetEvents.event.title}`,
			description: `${budgetEvents.event.description}`,
			btn,
			key,
			placement,
			duration: 5,
			onClose: close,
		});

		dispatch(setBudgetEvent({isEvent: false, event: {}}))
	};

	const openNotification = placement => {
		let price;
		if (event.price === 100) {
			price = playerCars?.slice(0, 1)[0]?.priceBuy ? playerCars?.slice(0, 1)[0]?.priceBuy : 0;
		}
		if (event.price < 40) {
			price =
				(playerCars.reduce((acc, el) => {
					acc += el.priceBuy;
					return acc;
				}, 0) /
					100) *
				event.price;
		}
		dispatch(changeBudget({ price: Math.round(price) }));

		const key = `open${Date.now()}`;
		const btn = (
			<Button type='primary' size='small' onClick={() => notification.close(key)}>
				Confirm
			</Button>
		);
		notification.open({
			message: `${event.name}`,
			description: `${event.description}. Ваши затраты: ${formatPrice(Math.round(price))} Р.`,
			btn,
			key,
			placement,
			duration: 0,
			onClose: close,
		});
		setevent(null);
	};

	return (
		<>
			<Footer style={{ textAlign: 'center' }}>
				<div className='page-footer'>
					<div className='footer-container'>
						<div className='footer-left'>
							<div className='footer-info'>
								<p className='footer-text'>Участников: </p>
								<p className='footer-text-value'>10</p>
							</div>
							<div className='footer-info'>
								<p className='footer-text'>ДЦ: </p>
								<p className='footer-text-value'>5</p>
							</div>
							<div className='footer-info'>
								<p className='footer-text'>
									Лидер: <Badge count='Мой ДЦ2' className='green-badge' />
								</p>
							</div>
						</div>

						{isAuth && (
							<div className='footer-info'>
								<Button
									type='dashed'
									role='button'
									tabIndex={0}
									onClick={onLogout}
									onKeyDown={onLogout}
								>
									Выйти
								</Button>
							</div>
						)}
					</div>
				</div>
				{event?.name && openNotification('bottomRight')}
				{emp?.id && openNotificationLimit('bottomRight')}
				{isEvent && openNotificationBudget('bottomRight')}
			</Footer>
		</>
	);
};

export default React.memo(FooterComponent);
