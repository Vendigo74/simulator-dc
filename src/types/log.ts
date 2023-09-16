export interface ILog {
	_id?: string;
	message: string;
	playerId: string;
	price: string;
	budget?: number;
	rent?: number;
	type?: LogTypes;
	createdAt?: Date;
	time: number;
}

export enum LogTypes {
	INFO = 'INFO',
	WARNING = 'WARNING',
	ERROR = 'ERROR',
	CLEAR = 'CLEAR',
}
