import { ILog, LogTypes } from '../types/log';
import fetchService from './fetch/fetchService';
import { store } from '../app/store';

export default class LogService {
	private static async createLog(
		type?: LogTypes,
		message?: string,
		price?: string,
		rent?: number
	): Promise<void> {
		const state = store.getState();
		const { player } = state.player;
		const { time } = state.client;
		if (!player.id) {
			throw new Error('Невозможно получить игока для создания лога');
		}

		if (type === 'CLEAR') {
			const resp = await fetchService.clearLog(player.id);
		} else {
			const log: ILog = {
				message,
				type,
				price,
				budget: player.budget,
				rent,
				playerId: player.id,
				time,
			};
			const resp = await fetchService.addLog(log);

			if (resp.status !== 200) {
				throw new Error(`Ошибка получения статуса ${JSON.stringify(resp)}`);
			}
		}
	}

	static async info(message: string, price: string, rent: number): Promise<void> {
		try {
			await this.createLog(LogTypes.INFO, message, price, rent);
		} catch (e) {
			console.log(e);
		}
	}

	static async warning(message: string, price: string, rent: number): Promise<void> {
		try {
			await this.createLog(LogTypes.WARNING, message, price, rent);
		} catch (e) {
			console.log(e);
		}
	}

	static async error(message: string, price: string, rent: number): Promise<void> {
		try {
			await this.createLog(LogTypes.ERROR, message, price, rent);
		} catch (e) {
			console.log(e);
		}
	}

	static async clear(): Promise<void> {
		try {
			await this.createLog(LogTypes.CLEAR);
		} catch (e) {
			console.log(e);
		}
	}
}
