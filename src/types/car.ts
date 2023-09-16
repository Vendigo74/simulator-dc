export interface ICar {
	_id: string;
	name: string;
	brand: string;
	model: string;
	year: number;
	mileage: number;
	body: string;
	engineVolume: number;
	enginePower: number;
  transmission: string;
  driveUnit: string;
  salon: string;
	priceBuy: number;
	priceSell?: number;
	brandIcon: string;
	imgSrc: string;
	priceFirmProg?: number;
	priceDop?: number;
	key?: number;
	standCar?: string;
	standCarKey?: string;
	id?: string;
	effect?: number;
	efficiencySales?: number;
	source?: string;
	myCar?: object;
	wantCar?: object;
	idResult?: number;
	firmProg?: boolean;
	post?: any;
}

export interface CarState {
	cars: ICar[];
	status?: 'idle' | 'loading' | 'failed';
}

export enum CarActionTypes {
	FETCH_CARS = 'FETCH_CARS',
}

interface FetchCarsAction {
	type: CarActionTypes.FETCH_CARS;
	payload: ICar[];
}

export type CarAction = FetchCarsAction;

export enum TradeCarTypes {
	BUY = 'BUY',
	SELL = 'SELL',
}
