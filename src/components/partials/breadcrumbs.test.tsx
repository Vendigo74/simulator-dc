export {}

// import React from 'react';
// import { screen, render, waitFor, fireEvent } from '@testing-library/react';
// import AppHeader from './app-header';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import '@testing-library/jest-dom/extend-expect';
// import Breadcrumbs from './breadcrumbs';
//
// const renderWithRouter = (
// 	component,
// 	{ route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
// ) => {
// 	const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;
// 	return {
// 		...render(component, { wrapper: Wrapper }),
// 		history,
// 	};
// };
//
// describe('app-header', () => {
// 	it('render breadcrumbs', () => {
// 		renderWithRouter(<Breadcrumbs role={() => 'PLAYER'} />);
//
// 		expect(screen.getByText('Мой ДЦ (Dashboard)')).toBeInTheDocument();
// 	});
//
// 	it('render breadcrumbs in /cars', () => {
// 		renderWithRouter(<Breadcrumbs role={() => 'PLAYER'} />, {
// 			route: '/cars',
// 		});
//
// 		expect(screen.getByText('Авто')).toBeInTheDocument();
// 		expect(screen.queryByText('Мой ДЦ (Dashboard)')).toBeNull();
// 	});
// });
