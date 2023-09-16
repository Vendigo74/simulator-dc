import { IStand } from './stand';
import { ICar } from './car';
import { IEmployee } from './employee';

export interface IStats {
	budget: number;
	profitTotal: number;
	rent: number;
	salaryOfKeyEmployees: number;
	salaryOfSecondaryEmployees: number;
	costsOfHiringAndFiring: number;
	employeeTraining: number;
	constMarketingAction: number;
	buyCars: number;
	buyPosts: number;
	buyStands: number;
	countBuyCars: number;
	countSellCars: number;
	countPosts: number;
	countStands: number;
	hiredKeyEmployees: [];
	countManegementDecisions: number;
	id: string;
}

export interface IPlayer {
	id?: string;
	name: string;
	cars?: ICar[];
	stands?: IStand[];
	employees?: IEmployee[];
	budget: number;
	budgetBorder: number;
	rent: number;
	profit: any;
	role: string;
	trainerId?: string;
	stats?: any;
}

export interface LoginPlayer {
	name: string;
	trainerId: string;
}

export interface RegPlayer {
	name: string;
	trainerId: string;
}

export interface PlayerState {
	player: IPlayer;
	auth: any;
	isAuth?: boolean;
	game?: boolean;
	role?: string;
	status?: 'idle' | 'loading' | 'failed';
	errorMessage?: string;
	players?: IPlayer[];
	stats: any;
	playersStats: any;
}

export enum PlayerActionTypes {
	FETCH_PLAYER = 'FETCH_PLAYER',
	SET_PLAYER = 'SET_PLAYER',
}

interface FetchPlayerAction {
	type: PlayerActionTypes.FETCH_PLAYER;
	payload: IPlayer;
}

interface SetPlayerAction {
	type: PlayerActionTypes.SET_PLAYER;
	payload: IPlayer;
}

export type PlayerAction = FetchPlayerAction | SetPlayerAction;
