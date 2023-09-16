import { ICar } from './car';

export interface IStand {
	key: string;
	stand?: string;
	fullValue?: number;
	freeValue?: number;
	fill?: number;
	employee?: string;
	buyPrice?: number;
	rentPrice?: number;
	playerValue?: number;
	cars?: ICar[];
	efficiencySales?: any;
}

export interface StandState {
	stands: IStand[];
	playerStands: IStand[];
	employeeStands: IStand[];
	playerCars: ICar[];
	cars: ICar[];
	freePlace: number;
	capacity: number;
	posts: any;
	countSellCars: number;
	countBuyCars: number;
	firmProg: any,
	status?: 'idle' | 'loading' | 'failed';
}

export enum StandActionTypes {
	FETCH_STANDS = 'FETCH_STANDS',
	FETCH_EMPLOYEE_STANDS = 'FETCH_EMPLOYEE_STANDS',
}

interface FetchStandsAction {
	type: StandActionTypes.FETCH_STANDS;
	payload: IStand[];
}

interface FetchEmployeeStandsAction {
	type: StandActionTypes.FETCH_EMPLOYEE_STANDS;
	payload: IStand[];
}

export type StandAction = FetchStandsAction | FetchEmployeeStandsAction;
