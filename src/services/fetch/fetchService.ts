import { AxiosResponse } from 'axios';
import $api from '../../http';
import { ClientsResponse } from '../../types/response/ClietnsResponse';
import { IMarketingPack } from '../../types/marketing';
import { IEmployee, IEmployeeDto } from '../../types/employee';
import { ITrainer } from '../../types/admin';
import { IPlayer } from '../../types/player';
import { ILog } from '../../types/log';

export default class fetchService {
	static async fetchStats(trainerId: any): Promise<AxiosResponse> {
		return $api.get(`/stats/${trainerId}`);
	}

	static async fetchUpdateStats(stats: any): Promise<AxiosResponse> {
		return $api.post(`/stats`, stats);
	}

	static async fetchClients(count: any): Promise<AxiosResponse<ClientsResponse>> {
		return $api.post<ClientsResponse>('/clients', { count });
	}

	static async fetchMarketing(): Promise<AxiosResponse> {
		return $api.get('/marketing');
	}

	static async fetchEvents(): Promise<AxiosResponse> {
		return $api.get('/events');
	}

	static async fetchCars(id: any): Promise<AxiosResponse> {
		return $api.get(`/cars/${id}`);
	}

	static async fetchAddCars(car: any): Promise<AxiosResponse> {
		return $api.post(`/cars`, car);
	}

	static async fetchUpdateCars(car: any): Promise<AxiosResponse> {
		return $api.patch(`/cars`, car);
	}

	static async fetchDeleteCars(id: any): Promise<AxiosResponse> {
		return $api.delete(`/cars/${id}`);
	}

	static async fetchEffect(): Promise<AxiosResponse> {
		return $api.get('/effect');
	}

	static async fetchFirmProg(id: string | number): Promise<AxiosResponse> {
		return $api.get(`/firmprog/${id}`);
	}

	static async fetchAddFirmProg(itemFirmProg): Promise<AxiosResponse> {
		return $api.post(`/firmprog`, { ...itemFirmProg });
	}

	static async fetchUpdateFirmProg(itemFirmProg): Promise<AxiosResponse> {
		return $api.patch(`/firmprog`, { ...itemFirmProg });
	}

	static async fetchDeleteFirmProg(id: string | number): Promise<AxiosResponse> {
		return $api.delete(`/firmprog/${id}`);
	}

	static async fetchMarketingById(id: string | number): Promise<AxiosResponse<IMarketingPack>> {
		return $api.get<IMarketingPack>(`/marketing/${id}`);
	}

	static async fetchSetKpi(kpi: any): Promise<AxiosResponse> {
		return $api.post('/setkpi', { kpi });
	}

	static async fetchKpi(ids): Promise<AxiosResponse> {
		return $api.post('/kpi', { ...ids });
	}

	static async updateTrainerKpi(ids): Promise<AxiosResponse> {
		return $api.post('/updatetrainerkpi', { ...ids });
	}

	static async fetchEmployees(): Promise<AxiosResponse<IEmployee[]>> {
		return $api.get<IEmployee[]>('/employees');
	}

	static async addNewEmployee(employee): Promise<AxiosResponse> {
		return $api.post('/employees', employee);
	}

	static async updateEmployee(employee: IEmployee): Promise<AxiosResponse> {
		return $api.patch(`/employees/`, employee);
	}

	static async removeEmployee(employee): Promise<AxiosResponse> {
		return $api.delete(`/employees/${employee.idPlayer}/${employee.type}/${employee.id}`);
	}

	static async removeAllEmployeesByPlayerId(playerId: string): Promise<AxiosResponse> {
		return $api.delete(`/employees/player/${playerId}`);
	}

	static async fetchTrainerById(id: string): Promise<AxiosResponse<ITrainer>> {
		return $api.get(`/users/${id}`);
	}

	static async fetchPlayerById(id: string): Promise<AxiosResponse<IPlayer>> {
		return $api.get(`/users/${id}`);
	}

	static async fetchTrainers(): Promise<AxiosResponse<ITrainer[]>> {
		return $api.get(`/trainers`);
	}

	static async removeUser(id: string): Promise<AxiosResponse<void>> {
		return $api.delete(`/users/${id}`);
	}

	static async fetchPlayers(): Promise<AxiosResponse<IPlayer[]>> {
		return $api.get('/players');
	}

	static async addLog(log: ILog): Promise<AxiosResponse<void>> {
		return $api.post('/logs', log);
	}

	static async clearLog(id): Promise<AxiosResponse<void>> {
		return $api.delete(`/logs/${id}`);
	}

	static async fetchPlayerLogsByPlayerId(playerId: string): Promise<AxiosResponse<ILog[]>> {
		return $api.get(`/logs/player/${playerId}`);
	}
}
