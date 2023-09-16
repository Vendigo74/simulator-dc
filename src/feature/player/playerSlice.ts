import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthService from '../../services/AuthService';
import { ICar } from '../../types/car';
import { IPlayer, IStats, LoginPlayer, PlayerState, RegPlayer } from '../../types/player';
import fetchService from '../../services/fetch/fetchService';

const initialState: PlayerState = {
	player: {} as IPlayer,
	auth: { status: 'idle', game: false, isAuth: false, role: 'PLAYER' },
	players: [],
	stats: {
		budget: 0,
		profitTotal: 0,
		rent: 0,
		salaryOfKeyEmployees: 0,
		salaryOfSecondaryEmployees: 0,
		costsOfHiringAndFiring: 0,
		employeeTraining: 0,
		constMarketingAction: 0,
		buyCars: 0,
		buyPosts: 0,
		buyStands: 0,
		countBuyCars: 0,
		countSellCars: 0,
		countPosts: 0,
		countStands: 0,
		hiredKeyEmployees: [],
		countManegementDecisions: 0,
		id: '',
	} as IStats,
	playersStats: [],
};

export const regPlayer = createAsyncThunk('player/regPlayer', async (player: RegPlayer) => {
	const response = await AuthService.registrationPlayer(player);
	localStorage.setItem('token', response.data.accessToken);
	return response.data;
});

export const checkAuth = createAsyncThunk('player/checkAuthPlayer', async () => {
	const response = await AuthService.checkAuth();
	localStorage.setItem('token', response.data.accessToken);
	return response.data;
});

export const fetchPlayer = createAsyncThunk('player/fetchPlayer', async (player: LoginPlayer) => {
	const response = await AuthService.loginPlayer(player);

	localStorage.setItem('token', response.data.accessToken);
	return response.data;
});

export const logout = createAsyncThunk('player/logoutPlayer', async () => {
	await AuthService.logout();
	localStorage.removeItem('token');
});

export const fetchPlayers = createAsyncThunk('player/fetchPlayers', async () => {
	const response = await fetchService.fetchPlayers();
	return response.data;
});

export const fetchStats = createAsyncThunk('player/fetchStats', async (trainerId: any) => {
	const response = await fetchService.fetchStats(trainerId);
	return response.data;
});

export const fetchUpdateStats = createAsyncThunk('player/fetchUpdateStats', async (stats: any) => {
	const response = await fetchService.fetchUpdateStats(stats);
	return response.data;
});

export const playerSlice = createSlice({
	name: 'playerState',
	initialState,
	reducers: {
		collectingStats: (state, action) => {
			if (action.payload.salaryOfKeyEmployees) {
				state.stats.salaryOfKeyEmployees += action.payload.salaryOfKeyEmployees;
			} else if (action.payload.salaryOfSecondaryEmployees) {
				state.stats.salaryOfSecondaryEmployees += action.payload.salaryOfSecondaryEmployees;
			} else if (action.payload.employeeTraining) {
				state.stats.employeeTraining += action.payload.employeeTraining;
			} else if (action.payload.costsOfHiringAndFiring) {
				state.stats.costsOfHiringAndFiring += action.payload.costsOfHiringAndFiring;
			} else if (action.payload.constMarketingAction) {
				state.stats.constMarketingAction += action.payload.constMarketingAction;
			} else if (action.payload.buyCars) {
				state.stats.buyCars += action.payload.buyCars;
			} else if (action.payload.buyPosts) {
				state.stats.buyPosts += action.payload.buyPosts;
			} else if (action.payload.countManegementDecisions) {
				state.stats.countManegementDecisions += action.payload.countManegementDecisions;
			} else if (action.payload.buyStands) {
				state.stats.buyStands += action.payload.buyStands;
			} else {
				state.stats = { ...state.stats, ...action.payload };
			}
		},
		changeBudget: (state, action) => {
			if (action.payload.price) {
				if (action.payload.item?.id === 58) {
					state.player.budget = state.player.budget + action.payload.price;
				} else {
					state.player.budget = state.player.budget - action.payload.price;
				}
			}
			if (action.payload.rent) {
				state.player.rent = state.player.rent + action.payload.rent;
			}
			if (action.payload.rentMinus) {
				state.player.budget = state.player.budget - action.payload.rentMinus;
			}
		},
		increaseBudget: (state, action) => {
			const newBudget = state.player.budget + action.payload;
			state.player.budget = Math.round(newBudget);
		},
		sellCarPlayer: (state, action: PayloadAction<ICar>) => {
			state.player.budget =
				state.player.budget + action.payload.priceBuy + action.payload.priceSell;
			state.player.cars = state.player.cars.filter(car => car._id !== action.payload._id);
		},
		addStandToPlayer: (state, action) => {
			const newStand = JSON.parse(JSON.stringify(action.payload.stand[0]));
			newStand.playerValue += action.payload.valueBuyStand;
			newStand.freeValue = newStand.playerValue - newStand.fill;

			if (state.player.stands.length >= 1) {
				state.player.stands.map(item => {
					if (item.key === newStand.key) {
						item.playerValue += action.payload.valueBuyStand;
					}
					return item;
				});
			}

			if (!state.player.stands.find(item => item.key === newStand.key)) {
				state.player.stands.push(newStand);
			}

			state.player.budget -= newStand.buyPrice * action.payload.valueBuyStand;
			state.player.rent += newStand.rentPrice * action.payload.valueBuyStand;
		},
		changeStatusGame: (state, action) => {
			state.auth.game = action.payload;
		},
		setErrorMessage: (state, action) => {
			state.auth.status = 'idle';
			state.errorMessage = action.payload;
		},
		setPlayer: (state, action) => {
			state.auth.status = 'idle';
			state.auth.isAuth = true;
			state.player = action.payload;
		},
		setProfit: (state, action) => {
			if (state.player.profit) {
				state?.player?.profit.map(el => {
					if (el.month === action.payload.month) {
						el.profit += action.payload.profit;
					}
				});
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPlayer.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchPlayer.fulfilled, (state, action) => {
				state.auth.status = 'idle';
				state.auth.isAuth = true;
				state.player = action.payload.user;
			})
			.addCase(fetchPlayer.rejected, (state, action) => {
				state.auth.status = 'failed';
				state.auth.isAuth = false;
			})
			.addCase(logout.fulfilled, state => {
				state.auth.status = 'idle';
				state.player = {} as IPlayer;
				state.auth.isAuth = false;
			})
			.addCase(checkAuth.pending, state => {
				state.auth.status = 'loading';
			})
			.addCase(checkAuth.rejected, state => {
				state.auth.status = 'failed';
				state.auth.isAuth = false;
			})
			.addCase(checkAuth.fulfilled, (state, action: any) => {
				state.auth.status = 'idle';
				state.player = action.payload.user;
				state.auth.role = action.payload.user.role;
				state.auth.isAuth = true;
			})

			.addCase(regPlayer.pending, (state, action: any) => {
				state.auth.status = 'loading';
			})
			.addCase(regPlayer.fulfilled, (state, action) => {
				state.auth.status = 'idle';
				state.player = action.payload.user;
				state.auth.role = action.payload.user.role;
				state.auth.isAuth = true;
			})
			.addCase(regPlayer.rejected, (state, action: any) => {
				if (/400/.test(action?.error.message)) {
					state.errorMessage = 'Игрок с таким именем уже есть в системе, попробуйте другое';
				}
				state.auth.status = 'failed';
				state.auth.isAuth = false;
			})
			.addCase(fetchPlayers.fulfilled, (state, action) => {
				state.auth.status = 'idle';
				state.players = action.payload;
			})
			.addCase(fetchStats.pending, state => {
				state.auth.status = 'loading';
			})
			.addCase(fetchStats.rejected, state => {
				state.auth.status = 'failed';
				state.errorMessage = 'не загружена статистика';
			})
			.addCase(fetchStats.fulfilled, (state, action) => {
				state.auth.status = 'idle';
				console.log(action.payload);
				state.playersStats = action.payload;
				/* action.payload[0].stats.map(el => {
				}); */
			})
			.addCase(fetchUpdateStats.pending, state => {
				state.auth.status = 'loading';
			})
			.addCase(fetchUpdateStats.rejected, state => {
				state.auth.status = 'failed';
				state.errorMessage = 'не загружена статистика';
			})
			.addCase(fetchUpdateStats.fulfilled, (state, action) => {
				state.auth.status = 'idle';
				// state.playersStats = action.payload;
				console.log(action.payload);
			});
	},
});

export const {
	sellCarPlayer,
	setProfit,
	addStandToPlayer,
	increaseBudget,
	changeBudget,
	changeStatusGame,
	setErrorMessage,
	collectingStats,
} = playerSlice.actions;

export default playerSlice.reducer;
