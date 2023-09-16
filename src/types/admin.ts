import { IPlayer } from './player';
import { ILog } from './log';

export interface ITrainer {
	_id?: string;
	name: string;
	role: string;
}

export interface AdminState {
	trainer?: ITrainer | null;
	status?: 'idle' | 'loading' | 'failed';
	trainers?: ITrainer[] | null;
	formIsVisible?: boolean;
	currentPlayer?: IPlayer | null;
	playerLogs?: ILog[];
}

export interface LoginAdmin {
	login: string;
	password: string;
}

export interface RegAdmin extends LoginAdmin {
	name: string;
}
