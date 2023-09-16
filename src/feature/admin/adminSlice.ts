import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AdminState, LoginAdmin, RegAdmin } from '../../types/admin';
import AuthService from '../../services/AuthService';
import fetchService from '../../services/fetch/fetchService';

const initialState: AdminState = {
	trainer: null,
	trainers: null,
	formIsVisible: false,
	currentPlayer: null,
	playerLogs: [],
};

export const regTrainer = createAsyncThunk('admin/regTrainer', async (payload: RegAdmin) => {
	const response = await AuthService.registrationTrainer(payload);
	localStorage.setItem('token', response.data.accessToken);
	return response.data;
});

export const fetchTrainer = createAsyncThunk('admin/fetchTrainer', async (trainerId: string) => {
	const response = await fetchService.fetchTrainerById(trainerId);
	return response.data;
});

export const fetchTrainers = createAsyncThunk('admin/fetchTrainers', async () => {
	const response = await fetchService.fetchTrainers();
	return response.data;
});

export const loginAdminOrTrainer = createAsyncThunk(
	'admin/loginAdminOrTrainer',
	async (payload: LoginAdmin) => {
		const response = await AuthService.loginAdminOrTrainer(payload);
		localStorage.setItem('token', response.data.accessToken);
		return response.data;
	}
);

export const fetchCurrentPlayer = createAsyncThunk(
	'admin/fetchCurrentPlayer',
	async (id: string) => {
		const response = await fetchService.fetchPlayerById(id);
		return response.data;
	}
);

export const fetchPlayerLogs = createAsyncThunk(
	'admin/fetchPlayerLogs',
	async (playerId: string) => {
		const response = await fetchService.fetchPlayerLogsByPlayerId(playerId);
		return response.data;
	}
);

export const removeUser = createAsyncThunk('admin/removeUser', async (id: string) => {
	await fetchService.removeUser(id);
});

export const adminSlice = createSlice({
	name: 'adminState',
	initialState,
	reducers: {
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setFromVisible: (state, action) => {
			state.formIsVisible = action.payload;
		},
		setTrainer: (state, action) => {
			state.trainer = action.payload;
		},
		setCurrentPlayer: (state, action) => {
			state.currentPlayer = action.payload;
		},
		setPlayerLogs: (state, action) => {
			state.playerLogs = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTrainer.rejected, (state, action) => {
				state.status = 'failed';
				console.log('error of fetch trainer', action);
			})
			.addCase(fetchTrainer.fulfilled, (state, action) => {
				state.status = 'idle';
				state.trainer = action.payload;
			})
			.addCase(fetchCurrentPlayer.rejected, (state, action) => {
				state.status = 'failed';
				console.log('error of fetch player', action);
			})
			.addCase(fetchCurrentPlayer.fulfilled, (state, action) => {
				state.status = 'idle';
				state.currentPlayer = action.payload;
			})
			.addCase(fetchTrainers.rejected, (state, action) => {
				state.status = 'failed';
				console.log('error of fetch trainers', action);
			})
			.addCase(fetchTrainers.fulfilled, (state, action) => {
				state.status = 'idle';
				state.trainers = action.payload;
			})
			.addCase(fetchPlayerLogs.fulfilled, (state, action) => {
				state.status = 'idle';
				state.playerLogs = action.payload;
			});
	},
});

export const { setStatus, setFromVisible, setTrainer, setCurrentPlayer, setPlayerLogs } =
	adminSlice.actions;

export default adminSlice.reducer;
