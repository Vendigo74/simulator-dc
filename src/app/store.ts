import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import playerSlice from '../feature/player/playerSlice';
import standsSlice from '../feature/stands/carsAndStandsSlice';
import employeesSlice from '../feature/employees/employeesSlice';
import marketingSlice from '../feature/marketing/marketingSlice';
import clientSlice from '../feature/client/clientSlice';
import adminSlice from '../feature/admin/adminSlice';
import eventsSlice from '../feature/events/eventsSlice';

export const store = configureStore({
	reducer: {
		player: playerSlice,
		stands: standsSlice,
		employees: employeesSlice,
		marketing: marketingSlice,
		client: clientSlice,
		events: eventsSlice,
		admin: adminSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
