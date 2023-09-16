import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import AppHeader from './app-header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

const renderWithRouter = (
	component,
	{ route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
	const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;
	return {
		...render(component, { wrapper: Wrapper }),
		history,
	};
};

describe('app-header', () => {
	it('render app-header PLAYER', async () => {
		// const history = createMemoryHistory();
/* 		render(
			<Router history={history}>
				<AppHeader isAuth={() => true} role={() => 'PLAYER'} />
			</Router>
		); */
		renderWithRouter(<AppHeader isAuth={() => true} role={() => 'PLAYER'} />);
		await waitFor(() => {
			screen.getByText('Авто и площадки');
		});
	});

	it('render app-header TRAINER', async () => {
/* 		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<AppHeader isAuth={() => true} role={() => 'TRAINER'} />
			</Router>
		); */

		renderWithRouter(<AppHeader isAuth={() => true} role={() => 'TRAINER'} />);

		// screen.debug();
		await waitFor(() => {
			screen.getByText('Игроки');
		});
	});

	it('render app-header ADMIN', async () => {
/* 		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<AppHeader isAuth={() => true} role={() => 'ADMIN'} />
			</Router>
		); */
		renderWithRouter(<AppHeader isAuth={() => true} role={() => 'ADMIN'} />);

		// screen.debug();
		await waitFor(() => {
			screen.getByText('Тренеры');
			expect(screen.queryByText('Авто и площадки')).toBeNull();
		});
	});

	it('render app-header PLAYER move to car', async () => {
/* 		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<AppHeader isAuth={() => true} role={() => 'PLAYER'} />
			</Router>
		); */
		const { history } = renderWithRouter(<AppHeader isAuth={() => true} role={() => 'PLAYER'} />);

		// screen.debug();
		fireEvent.click(screen.getByRole('link', { name: 'Авто и площадки' }));
		// screen.debug();
		expect(screen.getByRole('menuitem', { name: 'Авто и площадки' })).toHaveClass(
			'ant-menu-item-selected'
		);
		expect(history.location.pathname).toBe('/cars');
		await waitFor(() => {
			/* 			screen.getByText('Авто и площадки');
			expect(screen.getByRole('link', { name: 'Авто и площадки' })).toHaveClass(
				'.ant-menu-item-selected'
			); */
		});
	});
});
