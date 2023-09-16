import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchService from '../../services/fetch/fetchService';

const initialState = {
	events: [],
	limitEmp: [],
	budgetEvents: { isEvent: false, event: { title: '', description: '' } },
	status: 'idle',
};

export const fetchEvents = createAsyncThunk('MarketingPacks/fetchEvents', async () => {
	const response = await fetchService.fetchEvents();
	return response.data;
});

export const marketingSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setBudgetEvent: (state, action) => {
			state.budgetEvents.isEvent = action.payload.isEvent;
			state.budgetEvents.event = action.payload.event;
		},
		setLimitEmployees: (state, action) => {
			if (state.limitEmp.findIndex(id => id.id === action.payload.id) === -1) {
				state.limitEmp.push(action.payload);
			}
		},
		clearLimit: state => {
			state.limitEmp = [];
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchEvents.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchEvents.fulfilled, (state, action: any) => {
				state.status = 'idle';
				if (state.events.length === 0) {
					action.payload.map(el => {
						el.isItWas = false;
						state.events.push(el);
					});
				}
			});
	},
});

export const { setBudgetEvent, clearLimit, setLimitEmployees } = marketingSlice.actions;

export default marketingSlice.reducer;
