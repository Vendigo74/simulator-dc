import { IMarketingPack } from './marketing';

export interface IEmployee {
	_id: string;
	role: EmployeeRoles;
	salary: IEmployeeSalary[];
	kpi: IEmployeeKpi[];
	study: IEmployeeStudy[];
	userId?: string;
	limit?: number;
}

export interface IEmployeeDto extends Omit<IEmployee, '_id'> {}

export interface EmployeeState {
	employeesOptions: {
		studyPackId?: number | string;
		limit: number;
		sellers?: {
			salary: IEmployeeSalary[];
			kpi: IEmployeeKpi[];
			study: IEmployeeStudy[];
		};
		stationSellers?: {
			salary: IEmployeeSalary[];
			kpi: IEmployeeKpi[];
			study: IEmployeeStudy[];
		};
		appraisers?: {
			salary: IEmployeeSalary[];
			kpi: IEmployeeKpi[];
			study: IEmployeeStudy[];
		};
	};
	employeesHired: {
		sellers?: IEmployee[];
		stationSellers?: IEmployee[];
		appraisers?: IEmployee[];
	};
	currentEmployee?: IEmployee;
	employeeStudyPack?: IMarketingPack;
	employeeKpiCluster?: IEmployeeKpiCluster;
	status?: 'idle' | 'loading' | 'failed';
	displayHiringModal?: boolean;
}

export interface IEmployeeSalary {
	type: EmployeeSalaries;
	paid?: boolean;
	amount: number;
}

export interface IEmployeeKpi {
	type: EmployeeKpiTypes;
	value: number | string;
}

export interface IEmployeeKpiCluster {
	sellers: {
		efficiencySales: number;
	};
	stationSellers: {
		efficiencySales: number;
		efficiencyReception: number;
	};
	appraisers: {
		efficiencyReceptionTradeIn: number;
		efficiencyReceptionEthernet: number;
	};
}

export interface IEmployeeStudy {
	actionIdOfStudyPack: number | string;
	level1: boolean;
	level2: boolean;
	level3: boolean;
	level4: boolean;
}

export enum EmployeeSalaries {
	ONETIME = 'ONETIME', // единоразово
	MONTHLY = 'MONTHLY', // ежемесячно
}

export enum EmployeeRoles {
	SELLER = 'SELLER', // Продавец
	STATION_SELLER = 'STATION_SELLER', // Продавец универсал
	APPRAISER = 'APPRAISER', // Оценщик
}

export enum EmployeeKpiTypes {
	EFFICIENCY_SALES = 'efficiencySales', // Эффективность по продаже
	EFFICIENCY_RECEPTION = 'efficiencyReception', // Эффективности по приему
	EFFICIENCY_RECEPTION_TRADE_IN = 'efficiencyReceptionTradeIn', // Эффективности по приему Trade-in
	EFFICIENCY_RECEPTION_ETHERNET = 'efficiencyReceptionEthernet', // Эффективности по приему с Интернет-ресурсов
}

export enum EmployeeActionTypes {
	FETCH_EMPLOYEES = 'FETCH_EMPLOYEES',
}

interface FetchEmployeeAction {
	type: EmployeeActionTypes.FETCH_EMPLOYEES;
	payload: IEmployee[];
}

export type EmployeeAction = FetchEmployeeAction;
