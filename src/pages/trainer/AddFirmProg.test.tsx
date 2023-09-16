import { getByRole, RenderResult } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import TrainerEditFirmProg from './TrainerEditFirmProg';
import eventsSlice, { fetchAddFirmProg } from '../../feature/stands/carsAndStandsSlice';
import { render, fireEvent, screen } from '../../test-utils';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import FirmProgInfo from '../../components/trainer/FirmProgInfo';
import AddFirmProg from '../../components/trainer/AddFirmProg';
import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');

export const handlers = [
	rest.post(`/firmprog`, (req, res, ctx) => {
		console.log('msw');
		return res(
			ctx.json([
				{
					brand: 'Krishna',
					id: '611ce90c5b47fc56e88c3d45',
					mileage: 0,
					model: 'Rama',
					year: 1008,
				},
			]),
			ctx.delay(10)
		);
	}),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

global.matchMedia =
	global.matchMedia ||
	function () {
		return {
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	};

/* const AddFirmProgComponent = (): RenderResult =>
	render(
		<Provider store={store}>
			<TrainerEditFirmProg />
		</Provider>
	); */

describe('cars and firm prog page', () => {
	it('render cars and firm prog page', () => {
		render(<TrainerEditFirmProg />);
		expect(screen.getByText('Добавьте машину')).toBeInTheDocument();
	});

	it('addFirmProg form test', () => {
		render(<TrainerEditFirmProg />);
		userEvent.type(screen.getByTestId('brand FirmProg'), 'Krishna');
		expect(screen.getByTestId('brand FirmProg')).toHaveValue('Krishna');
		userEvent.type(screen.getByTestId('model FirmProg'), 'Rama');
		userEvent.type(screen.getByTestId('year FirmProg'), '108');
		userEvent.type(screen.getByTestId('mileage FirmProg'), '16');
		userEvent.click(screen.getByTestId('addFirmProg'));
		expect(screen.queryByRole('alert')).toBeNull();
	});

		it('addFirmProg fetchAddFirmProg test', () => {
		render(<TrainerEditFirmProg />);

		const action = {
			type: fetchAddFirmProg.fulfilled,
			payload: [
				{ brand: 'Krishna', id: '611ce90c5b47fc56e88c3d45', mileage: 0, model: 'Hare', year: 1008 },
			],
		};

		const state = store.getState().stands;
		expect(state.firmProg.length).toEqual(0);

		const initialState = eventsSlice(
			{
				...state,
			},
			action
		);

		expect(initialState.status).toEqual('idle');
		expect(initialState.firmProg.length).toEqual(1);
	});
});

it('addFirmProg form-info test', async () => {
	/* let response = await fetch(`/firmprog`, {
		method: 'POST',
	});
	const body = await response.json(); */
	render(
		<>
			<AddFirmProg />
			<FirmProgInfo />
		</>
	);

	userEvent.type(screen.getByTestId('brand FirmProg'), 'Krishna');
	expect(screen.getByTestId('brand FirmProg')).toHaveValue('Krishna');
	userEvent.type(screen.getByTestId('model FirmProg'), 'Rama');
	userEvent.type(screen.getByTestId('year FirmProg'), '108');
	userEvent.type(screen.getByTestId('mileage FirmProg'), '16');
	userEvent.click(screen.getByTestId('addFirmProg'));
	expect(screen.queryByRole('alert')).toBeNull();
	const state = store.getState().stands;

	// expect(await screen.findByText('Rama')).toBeInTheDocument();
});
