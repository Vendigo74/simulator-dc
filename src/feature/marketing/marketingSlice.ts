import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchService from '../../services/fetch/fetchService';
import { MarketingState } from '../../types/marketing';

const initialState: MarketingState = {
	marketing: [],
	kpi: {},
	effect: {},
	marketingActive: [],
	status: 'idle',
};

export const fetchMarketing = createAsyncThunk('MarketingPacks/fetchMarketing', async () => {
	const response = await fetchService.fetchMarketing();
	return response.data;
});

export const fetchEffect = createAsyncThunk('MarketingPacks/fetchEffect', async () => {
	const response = await fetchService.fetchEffect();
	return response.data;
});

export const fetchSetKpi = createAsyncThunk('MarketingPacks/fetchSetKpi', async (kpi: any) => {
	const response = await fetchService.fetchSetKpi(kpi);
	return response.data;
});

export const fetchKpi = createAsyncThunk('MarketingPacks/fetchKpi', async (ids: any) => {
	const response = await fetchService.fetchKpi(ids);
	return response.data;
});

export const updateTrainerKpi = createAsyncThunk('MarketingPacks/updateTrainerKpi', async (ids: any) => {
	const response = await fetchService.updateTrainerKpi(ids);
	return response.data;
});

export const marketingSlice = createSlice({
	name: 'marketingState',
	initialState,
	reducers: {
		changeActionOneItem: (state, action) => {
			state.marketing.map(item => {
				if (item.id === action.payload.stateId) {
					item.actions.map(el => {
						if (el.id === action.payload.id) {
							el.action[0] = true;
						}
					});
				}
			});
		},
		changeActionItem: (state, action) => {
			state.marketing.map(item => {
				if (item.id === action.payload.stateId) {
					item.actions.map(el => {
						if (el.id === action.payload.item.id) {
							if (el.id !== 12 && el.id !== 13) {
								el.action[0] = false;
							}

							if (action.payload.lvl === 0) {
								el.action[1] = true;
								if (!state.marketingActive.find(item => item.id === el.id)) {
									state.marketingActive.push(el);
								}
							}
							if (action.payload.lvl === 1) {
								el.action[1] = false;
								el.action[2] = true;
								el.lvl = 1;
								state.marketingActive.map(item => {
									if (item.id === el.id) {
										item.lvl = 1;
									}
								});
							}
							if (action.payload.lvl === 2) {
								el.action[2] = false;
								el.action[3] = true;
								el.lvl = 2;
								state.marketingActive.map(item => {
									if (item.id === el.id) {
										item.lvl = 2;
									}
								});
							}
							if (action.payload.lvl === 3) {
								el.action[3] = false;
								el.lvl = 3;
								state.marketingActive.map(item => {
									if (item.id === el.id) {
										item.lvl = 3;
									}
								});
							}
						}
					});
				}
				if (action.payload.item.id === 24) {
					item.actions.map(el => {
						if (el.id === 25) {
							state.marketingActive.map(item => {
								if (item.id === 24 && item.lvl === 1) {
									el.action[0] = true;
								}
							});
						}
					});
				}
				if (action.payload.item.id === 22) {
					item.actions.map(el => {
						if (el.id === 35) {
							el.action[0] = false;
						}
						if (el.id === 36) {
							el.action[0] = false;
						}
						if (el.id === 23) {
							el.action[0] = true;
						}
					});
				}
				if (action.payload.item.id === 35) {
					item.actions.map(el => {
						if (el.id === 22) {
							el.action[0] = false;
						}
						if (el.id === 23) {
							el.action[0] = false;
						}
						if (el.id === 36) {
							el.action[0] = true;
						}
					});
				}

				if (action.payload.item.id === 29) {
					item.actions.map(el => {
						if (el.id === 30) {
							el.action[0] = true;
						}
						if (el.id === 31) {
							el.action[0] = true;
						}
					});
				}

			});

			state.marketing.map(item => {});
		},
		setMonth: (state, action) => {
			state.marketing.map(item => {
				if (item.id === 11) {
					item.actions.map(el => {
						console.log(action.payload);
						if (el.id === 52 || el.id === 53 || el.id === 51) {
							el.month = action.payload;
						}
					});
				}
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMarketing.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchMarketing.fulfilled, (state, action: any) => {
				state.status = 'idle';
				action.payload.category.map(item => {
					item.actions.map(el => {
						if (el.id === 23 || el.id === 36 || el.id === 25 || el.id === 30 || el.id === 31) {
							el.action = [false, false, false, false, el.id];
							el.lvl = 0;
						} else {
							el.action = [true, false, false, false, el.id];
							el.lvl = 0;
						}
						if (el.id === 52 || el.id === 53 || el.id === 51) {
							el.month = 0;
						}
					});
				});
				state.marketing = action.payload.category.sort((a, b) => a.id - b.id);
				// state.kpi = action.payload.kpi[0].kpi;
			})
			.addCase(fetchSetKpi.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchSetKpi.fulfilled, (state, action: any) => {
				state.status = 'idle';
				state.kpi = action.payload.kpi;
			})
			.addCase(fetchKpi.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchKpi.fulfilled, (state, action: any) => {
				state.status = 'idle';
				state.kpi = action.payload.playerKpi.kpi;
			})
			.addCase(updateTrainerKpi.pending, state => {
				state.status = 'loading';
			})
			.addCase(updateTrainerKpi.fulfilled, (state, action: any) => {
				state.status = 'idle';
				console.log(action.payload.kpi.kpi)
				state.kpi = action.payload.kpi.kpi;
			})
			.addCase(fetchEffect.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchEffect.fulfilled, (state, action: any) => {
				state.status = 'idle';
				state.effect = action.payload;
			});
	},
});

export const { changeActionItem, changeActionOneItem, setMonth } = marketingSlice.actions;

export default marketingSlice.reducer;
