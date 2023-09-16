import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import playerSlice from './feature/player/playerSlice';
import employeesSlice from './feature/employees/employeesSlice';
import marketingSlice from './feature/marketing/marketingSlice';
import clientSlice from './feature/client/clientSlice';
import eventsSlice from './feature/events/eventsSlice';
import adminSlice from './feature/admin/adminSlice';
import standsSlice from './feature/stands/carsAndStandsSlice';

function render(
	ui,
	{
		store = configureStore({
			reducer: {
				player: playerSlice,
				stands: standsSlice,
				employees: employeesSlice,
				marketing: marketingSlice,
				client: clientSlice,
				events: eventsSlice,
				admin: adminSlice,
			},
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
