import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomInteger } from '../../helpers/randomInteger';
import DataService from '../../services/data-service/data-service';
import fetchService from '../../services/fetch/fetchService';
import { ICar } from '../../types/car';
import { StandState } from '../../types/stand';

const dataService = new DataService();

const initialState: StandState = {
	stands: [],
	playerStands: [],
	playerCars: [],
	employeeStands: [],
	cars: [],
	freePlace: 0,
	capacity: 0,
	posts: [],
	countSellCars: 0,
	countBuyCars: 0,
	firmProg: [],
	status: 'idle',
};

export const fetchFirmProg = createAsyncThunk('stands/fetchFirmProg', async (id: any) => {
	const response = await fetchService.fetchFirmProg(id);
	return response.data;
});

export const fetchAddFirmProg = createAsyncThunk('stands/fetchFirmProg', async (id: any) => {
	const response = await fetchService.fetchAddFirmProg(id);
	return response.data;
});

export const fetchUpdateFirmProg = createAsyncThunk(
	'stands/fetchFirmProg',
	async (itemFirmProg: any) => {
		const response = await fetchService.fetchUpdateFirmProg(itemFirmProg);
		return response.data;
	}
);

export const fetchDeleteFirmProg = createAsyncThunk('stands/fetchFirmProg', async (id: any) => {
	const response = await fetchService.fetchDeleteFirmProg(id);
	return response.data;
});

export const fetchCars = createAsyncThunk('cars/fetchCArs', async (id: any) => {
	const response = await fetchService.fetchCars(id);
	return response.data;
});

export const fetchAddCars = createAsyncThunk('cars/fetchCArs', async (car: any) => {
	const response = await fetchService.fetchAddCars(car);
	return response.data;
});

export const fetchUpdateCars = createAsyncThunk('cars/fetchCArs', async (car: any) => {
	const response = await fetchService.fetchUpdateCars(car);
	return response.data;
});

export const fetchDeleteCars = createAsyncThunk('cars/fetchCArs', async (id: any) => {
	const response = await fetchService.fetchDeleteCars(id);
	return response.data;
});

export const fetchEmployeeStands = createAsyncThunk('stands/fetchEmployeeStands', async () => {
	const response = await dataService.getStands('employee');
	return response;
});

export const fetchStands = createAsyncThunk('stands/fetchStands', async () => {
	const response = await dataService.getStands('stands');
	return response;
});

export const fetchPosts = createAsyncThunk('stands/fetchPosts', async (id: number) => {
	const response = await fetchService.fetchMarketingById(id);
	return response.data;
});

export const carsAndStandsSlice = createSlice({
	name: 'stand',
	initialState,
	reducers: {
		refreshCountPost: state => {
			[0, 1, 2].map(el => {
				if (state.posts[0].count[el].count.length > 0)
					state.posts[0].count[el].countPost =
						state.posts[0].lock.reasonOne[el].value * state.posts[0].count[el].count.length;
			});
		},
		addPostToCar: (state, action) => {
			const freePost = state.posts[0].count
				.map(el => {
					if (el.countPost > 0) {
						return el;
					}
				})
				.filter(el => el);

			const numberPost = randomInteger(0, freePost.length - 1);

			if (freePost[numberPost]?.countPost > 0) {
				state.posts[0].count.map(el => {
					if (el.lvl === freePost[numberPost].lvl) {
						el.countPost -= 1;
					}
				});

				state.playerCars.map(car => {
					if (car.idResult === action.payload.id) {
						car.post = {
							lvl: freePost[numberPost].lvl,
							price: freePost[numberPost].cost,
							impact: {
								margin: freePost[numberPost].impact.margin[freePost[numberPost].lvl - 1].value,
								salesValue:
									freePost[numberPost].impact.salesValue[freePost[numberPost].lvl - 1].value,
								efficiencySales:
									freePost[numberPost].impact.efficiencySales[freePost[numberPost].lvl - 1].value,
							},
						};
					}
				});
			}
		},
		trainTechnician: (state, action) => {
			console.log(action.payload);
			state.posts[0].technician[action.payload.lvl].map((el, i) => {
				console.log(el);
				if (el.lvl !== 1 && action.payload.lvl === 0) {
					if (i === 0) {
						el.lvl += 1;
						if (state.posts[0].count[action.payload.lvl].count[i]) {
							state.posts[0].count[action.payload.lvl].lock[i] = true;
							state.posts[0].count[action.payload.lvl].countPost +=
								state.posts[0].lock.reasonOne[action.payload.lvl].value;
						}
					} else if (i > 0 && action.payload.state[i - 1].lvl === 1) {
						el.lvl += 1;
						if (state.posts[0].count[action.payload.lvl].count[i]) {
							state.posts[0].count[action.payload.lvl].lock[i] = true;
							state.posts[0].count[action.payload.lvl].countPost +=
								state.posts[0].lock.reasonOne[action.payload.lvl].value;
						}
					}
				}
				if (el.lvl !== 1 && action.payload.lvl === 1) {
					if (i === 0) {
						el.lvl += 1;
						if (state.posts[0].count[action.payload.lvl].count[i]) {
							state.posts[0].count[action.payload.lvl].lock[i] = true;
							state.posts[0].count[action.payload.lvl].countPost +=
								state.posts[0].lock.reasonOne[action.payload.lvl].value;
						}
					} else if (i > 0 && action.payload.state[i - 1].lvl === 1) {
						el.lvl += 1;
						if (state.posts[0].count[action.payload.lvl].count[i]) {
							state.posts[0].count[action.payload.lvl].lock[i] = true;
							state.posts[0].count[action.payload.lvl].countPost +=
								state.posts[0].lock.reasonOne[action.payload.lvl].value;
						}
					}
				}
				if (el.lvl !== 1 && action.payload.lvl === 2) {
					if (i === 0) {
						el.lvl += 1;
						if (state.posts[0].count[action.payload.lvl].count[i]) {
							state.posts[0].count[action.payload.lvl].lock[i] = true;
							state.posts[0].count[action.payload.lvl].countPost +=
								state.posts[0].lock.reasonOne[action.payload.lvl].value;
							console.log('one', i);
						}
					} else if (i > 0 && action.payload.state[i - 1].lvl === 1) {
						el.lvl += 1;
						if (state.posts[0].count[action.payload.lvl].count[i]) {
							state.posts[0].count[action.payload.lvl].lock[i] = true;
							state.posts[0].count[action.payload.lvl].countPost +=
								state.posts[0].lock.reasonOne[action.payload.lvl].value;
							console.log('two', i);
						}
					}
				}
			});
		},
		hireTechnician: (state, action) => {
			if (
				state.posts[0].lock.reasonThree[action.payload.lvl].value >
				state.posts[0].technician[action.payload.lvl].length
			) {
				state.posts[0].technician[action.payload.lvl].push({ lvl: 0 });
			}
		},
		buyPost: (state, action) => {
			state.posts.map(el => {
				if (
					el.id === 26 &&
					el.lock.reasonThree[action.payload.lvl].value > el.count[action.payload.lvl].count.length
				) {
					el.count[action.payload.lvl].count.push(1);
					el.count[action.payload.lvl].lock.push(false);
				}
			});
		},
		addNewStandToStand: (state, action) => {
			if (state.stands.findIndex(el => el.key === '7') === -1 && action.payload.id === 56) {
				state.stands.push({
					key: '7',
					stand: 'перед ДЦ 15',
					fullValue: 15,
					freeValue: 15,
					fill: 0,
					employee: '',
					buyPrice: 15000,
					rentPrice: 10000,
					playerValue: 15,
					cars: [],
					efficiencySales: action.payload.effect,
				});
				state.capacity += 15;
			} else {
				state.stands.map(el => {
					if (el.key === '7') {
						el.efficiencySales = action.payload.effect;
					}
				});
			}
			if (!(state.stands[6]?.key === '8') && action.payload.id === 57) {
				state.stands.push({
					key: '8',
					stand: 'Крытый ДЦ 100',
					fullValue: 15,
					freeValue: 100,
					fill: 0,
					employee: '',
					buyPrice: 15000,
					rentPrice: 10000,
					playerValue: 100,
					cars: [],
					efficiencySales: action.payload.effect,
				});
				state.capacity += 100;
			}
		},
		buyStand: (state, action) => {
			state.stands.map(item => {
				if (item.key === action.payload.stand[0].key) {
					item.playerValue += action.payload.valueBuyStand;
					state.capacity += action.payload.valueBuyStand;
					item.freeValue = item.playerValue - item.fill;
				}
			});
			state.stands;
		},
		carToStand: (state, action) => {
			state.stands.map(item => {
				if (
					!item.cars.find(item => item.idResult === action.payload.car.idResult) &&
					item.stand === action.payload.standForSell
				) {
					item.cars.push(action.payload.car);
					item.fill = item.cars.length;

					/* if (item.playerValue - item.fill < 0) {
						state.playerCars.map(car => {
							if (car.idResult === item.cars[0].idResult) {
								car.standCar = '';
							}
						});
						item.cars.splice(0, 1);
					} */

					item.fill = item.cars.length;
					item.freeValue = item.playerValue - item.fill;
				} else {
					const index = item.cars.findIndex(n => n.idResult === action.payload.car.idResult);
					if (index !== -1) {
						item.cars.splice(index, 1);
					}
					item.fill = item.cars.length;
					item.freeValue = item.playerValue - item.fill;
				}

				return item;
			});
		},
		buyCar: (state, action: PayloadAction<ICar>) => {
			// Подходит ли фирменная программа?
			state.firmProg?.map(el => {
				if (
					el.brand === action.payload.brand &&
					el.model === action.payload.model &&
					action.payload.year <= el.year &&
					action.payload.mileage <= el.mileage
				) {
					action.payload = { ...action.payload, firmProg: true };
				} else if (!action.payload.firmProg) {
					action.payload = { ...action.payload, firmProg: false };
				}
			});

			state.playerCars.push(action.payload);
			state.countBuyCars += 1;
		},
		changeCarStand: (state, action) => {
			state.playerCars.map(car => {
				if (car.idResult === action.payload.idResult) {
					car.standCar = action.payload.standCar;
					state.stands.map(el => {
						if (el.stand === action.payload.standCar) {
							car.standCarKey = el.key;
							car.efficiencySales = el.efficiencySales ? el.efficiencySales : 0;
						}
					});
				}
			});
		},
		addStand: (state, action) => {
			const newStand = JSON.parse(JSON.stringify(action.payload.stand[0]));
			newStand.playerValue += action.payload.valueBuyStand;
			newStand.freeValue = newStand.playerValue - newStand.fill;

			if (state.playerStands.length >= 1) {
				state.playerStands.map(item => {
					if (item.key === newStand.key) {
						item.playerValue += action.payload.valueBuyStand;
					}
					return item;
				});
			}

			if (!state.playerStands.find(item => item.key === newStand.key)) {
				state.playerStands.push(newStand);
			}

			// state.player.budget -= newStand.buyPrice * action.payload.valueBuyStand;
		},
		/* sellCar: (state, action: PayloadAction<ICar>) => {
			state.cars = state.cars.filter(car => car.idResult !== action.payload.idResult);
		}, */
		changeCar: (state, action) => {
			state.countBuyCars += 1;
			state.countSellCars += 1;
			state.playerCars.map(car => {
				if (car.idResult === action.payload.wantCar) {
					car = action.payload.sallesCar;
				}
			});
		},
		sellCartoClient: (state, action: PayloadAction<ICar>) => {
			state.countSellCars += 1;
			state.playerCars = state.playerCars.filter(car => car.idResult !== action.payload.idResult);
			state.stands.map((el, i) => {
				if (action.payload.standCar === el.stand) {
					const index = +el.key - 1;
					state.stands[i].fill -= 1;
					state.stands[i].freeValue += 1;
					state.stands[i].cars = state.stands[i].cars.filter(
						car => car.idResult !== action.payload.idResult
					);
				}
			});
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFirmProg.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchFirmProg.fulfilled, (state, action) => {
				state.status = 'idle';
				state.firmProg = action.payload;
			})
			.addCase(fetchFirmProg.rejected, (state, action) => {
				if (action?.error.message) {
					console.error('Ошибка');
				}
			})
			.addCase(fetchPosts.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'idle';
				if (state.posts.length === 0) {
					action.payload.actions
						.sort((a: any, b: any) => a.id - b.id)
						.map(item => {
							if (item.id === 26 || item.id === 27 || item.id === 28) {
								if (item.id === 26) {
									item.count = [
										{
											lvl: 1,
											count: [],
											countPost: 0,
											lock: [],
											cost: item.preparationPrice[0],
											impact: item.impact,
										},
										{
											lvl: 2,
											count: [],
											countPost: 0,
											lock: [],
											cost: item.preparationPrice[1],
											impact: item.impact,
										},
										{
											lvl: 3,
											count: [],
											countPost: 0,
											lock: [],
											cost: item.preparationPrice[2],
											impact: item.impact,
										},
									];
									item.technician = [[], [], []];
								}
								state.posts.push(item);
							}
						});
				}
			})
			.addCase(fetchEmployeeStands.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchEmployeeStands.fulfilled, (state, action) => {
				state.status = 'idle';
				state.employeeStands = action.payload;
			})
			.addCase(fetchStands.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchStands.fulfilled, (state, action) => {
				state.status = 'idle';
				state.stands = action.payload;
				state.stands.splice(2, 5); // уменьшение площадок.
				if (state.capacity === 0) {
					action.payload.map(el => {
						state.capacity += el.playerValue;
					});
				}
			})
			.addCase(fetchCars.rejected, (state, action) => {
				if (action?.error.message) {
					console.error('машины не загрузились');
				}
			})

			.addCase(fetchCars.fulfilled, (state, action) => {
				state.cars = action.payload;
			});
		/* .addCase(fetchCars.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchCars.fulfilled, (state, action) => {
				state.status = 'idle';
				state.cars = action.payload;
			}); */
	},
});

export const {
	buyStand,
	addNewStandToStand,
	carToStand,
	addStand,
	buyCar,
	changeCarStand,
	changeCar,
	/* 	sellCar, */
	sellCartoClient,
	buyPost,
	hireTechnician,
	trainTechnician,
	addPostToCar,
	refreshCountPost,
} = carsAndStandsSlice.actions;

export default carsAndStandsSlice.reducer;
