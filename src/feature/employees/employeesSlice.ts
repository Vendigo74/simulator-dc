import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchService from '../../services/fetch/fetchService';
import { getEmployeeTypeByRole } from '../../helpers/employeeHelper';

const initialState = {
	employees: [],
	employeeStudyPack: [],
	hireEmployees: { universal: [], zakupshik: [], prodavec: [] },
	status: 'idle',
};

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	async (id: number | string) => {
		const response = await fetchService.fetchMarketingById(id);
		return response.data;
	}
);

export const fetchEmployeeStudyPack = createAsyncThunk(
	'employees/fetchEmployeeStudyPack',
	async (id: number | string) => {
		const response = await fetchService.fetchMarketingById(id);
		return response.data;
	}
);

export const addNewEmployee = createAsyncThunk(
	'employees/addNewEmployee',
	async (employee: any) => {
		const response = await fetchService.addNewEmployee(employee);
		return response.data;
	}
);

export const updateEmployee = createAsyncThunk(
	'employees/updateEmployee',
	async (employee: any) => {
		const response = await fetchService.updateEmployee(employee);
		return response.data;
	}
);

export const removeEmployee = createAsyncThunk(
	'employees/removeEmployee',
	async (employee: any) => {
		const response = await fetchService.removeEmployee(employee);
		return response.data;
	}
);

export const clearPlayerEmployees = createAsyncThunk(
	'employees/clearEmployees',
	async (playerId: string) => {
		const response = await fetchService.removeAllEmployeesByPlayerId(playerId);
		return response.data;
	}
);

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		setLimitClientToEmployee: (state, action) => {
			console.log(action.payload);
			state.hireEmployees[`${action.payload.type}`].map(el => {
				if (el.id === action.payload.id) {
					el.limitClient -= 1;
				}
			});
		},
		resetLimitClientToEmployee: state => {
			state.hireEmployees[`universal`].map(el => {
				if (el.limitClient !== 10) {
					el.limitClient = 10;
				}
			});
			state.hireEmployees[`zakupshik`].map(el => {
				if (el.limitClient !== 10) {
					el.limitClient = 10;
				}
			});
			state.hireEmployees[`prodavec`].map(el => {
				if (el.limitClient !== 10) {
					el.limitClient = 10;
				}
			});
		},
		hireEmployee: (state, action) => {
			/* const employeeForState = {
				impact: action.payload.impact,
				limit: 21,
				study: 0,
				id: Math.random(),
				rent: action.payload.rent[0],
			};
			if (action.payload.name[0].includes('Универсал')) {
				state.hireEmployees.universal.push({ ...employeeForState, type: 'universal' });

			}
			if (action.payload.name[0].includes('Закупщик')) {
				state.hireEmployees.zakupshik.push({ ...employeeForState, type: 'zakupshik' });
			}
			if (action.payload.name[0].includes('Продавец')) {
				state.hireEmployees.prodavec.push({ ...employeeForState, type: 'prodavec' });
			} */
		},
		fireEmployee: (state, action) => {
			/* console.log(action.payload);
			state.hireEmployees[`${action.payload.type}`] = state.hireEmployees[
				`${action.payload.type}`
			].filter(el => el.id !== action.payload.id); */
		},
		studyEmployee: (state, action) => {
			/* console.log(action.payload);
			state.hireEmployees[`${action.payload.type}`].map(el => {
				if (el.id === action.payload.id) {
					el.study += 1;
					const impacts = Object.entries(
						state.employeeStudyPack[action.payload.lvlStudyPack].impact
					);
					console.log(action.payload.studyLvl);
					impacts.map(item => {
						el.impact[item[0]][0].value += item[1][action.payload.studyLvl].value;
					});
				}
			}); */
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchEmployees.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchEmployees.fulfilled, (state, action) => {
				state.status = 'idle';
				state.employees = action.payload.actions;
			})
			.addCase(fetchEmployeeStudyPack.fulfilled, (state, action) => {
				state.employeeStudyPack = action.payload.actions;
			})
			.addCase(addNewEmployee.fulfilled, (state, action) => {
				state.hireEmployees = action.payload.hireEmployees;
			})
			.addCase(updateEmployee.fulfilled, (state, action) => {
				state.hireEmployees = action.payload.hireEmployees;
			})
			.addCase(clearPlayerEmployees.fulfilled, (state, action) => {
				state.hireEmployees = action.payload.hireEmployees;
			})
			.addCase(removeEmployee.fulfilled, (state, action) => {
				state.hireEmployees = action.payload.hireEmployees;
			});
	},
});

export const {
	hireEmployee,
	resetLimitClientToEmployee,
	setLimitClientToEmployee,
	fireEmployee,
	studyEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;
