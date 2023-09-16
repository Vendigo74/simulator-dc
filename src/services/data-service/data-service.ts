import { ICar } from '../../types/car';
import { IStand } from '../../types/stand';
import { cars, stands, employeeStands } from './data';
import { Kpi } from '../../types/marketing';
import { kpi } from './data/marketing';
import { IClient } from '../../types/client';
import { clients } from './data/client';

export default class DataService {
	public getCars(): Promise<ICar[]> {
		return new Promise<ICar[]>(resolve => {
			resolve(cars);
		});
	}

	public getStands(type: string): Promise<IStand[]> {
		return new Promise<IStand[]>(resolve => {
			if (type === 'employee') {
				resolve(employeeStands);
			} else if (type === 'stands') {
				resolve(stands);
			}
		});
	}

	public getKpi(): Promise<Kpi> {
		return new Promise<Kpi>(resolve => {
			resolve(kpi);
		});
	}

	public getClients(): Promise<IClient[]> {
		return new Promise<IClient[]>(resolve => {
			resolve(clients);
		});
	}
}
