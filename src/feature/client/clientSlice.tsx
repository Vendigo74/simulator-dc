import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchService from '../../services/fetch/fetchService';
import { ClientState } from '../../types/client';

const initialState: ClientState = {
	clients: [],
	checkClients: [],
	prepClients: { Reception: [], ReceptionTradeIn: [], Sales: [] },
	clientsForUi: { evaluation: 0, sales: 0, evaluationSales: 0 },
	time: 0,
	month: 1,
	status: 'idle',
};

export const fetchClients = createAsyncThunk('clients/fetchClients', async (count: any) => {
	const response = await fetchService.fetchClients(count);
	return response.data;
});

export const marketingSlice = createSlice({
	name: 'clients',
	initialState,
	reducers: {
		setCountClients: (state, action) => {
			state.countClients += action.payload;
		},
		changeMonth: (state, action) => {
			state.month += action.payload;
		},
		delatePrepClient: (state, action) => {
			action.payload.place.map(el => {
				state.prepClients[`${action.payload.name}`] = state.prepClients[
					`${action.payload.name}`
				].filter(client => client.myCar.idResult === el.myCar.idResult);
			});
		},
		buyCarClient: (state, action) => {
			state.prepClients = state.prepClients.filter(client => client.myCar.id !== action.payload.id);
		},
		addClients: (state, action) => {
			state.clients.push(action.payload);
		},
		changeClient: (state, action) => {
			const newArr = state.clients.splice(0, action.payload);
			if (newArr.length > 0) {
				newArr.map(client => {
					if (client.myCar.id && client.wantCar.id) {
						state.clientsForUi.evaluationSales += 1;
						state.prepClients.ReceptionTradeIn.push(client);
					}
					if (!client.myCar.id && client.wantCar.id) {
						state.clientsForUi.sales += 1;
						state.prepClients.Sales.push(client);
					}
					if (client.myCar.id && !client.wantCar.id) {
						state.clientsForUi.evaluation += 1;
						state.prepClients.Reception.push(client);
					}
					// state.prepClients.push(client);
				});
			}
		},

		changeTime: (state, action) => {
			state.time = action.payload;
		},
		clearClients: state => {
			state.clients = [];
		},
	},
	extraReducers: builder => {
		builder;
		/* 	.addCase(fetchClients.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchClients.fulfilled, (state, action) => {
				state.status = 'idle';
				action.payload.clients.map(client => {
					state.clients.push(client);
				});
				// state.clients = action.payload.clients;
			}); */
	},
});

export const {
	changeClient,
	delatePrepClient,
	changeTime,
	clearClients,
	addClients,
	buyCarClient,
	changeMonth,
	setCountClients,
} = marketingSlice.actions;

export default marketingSlice.reducer;
