import { EmployeeKpiTypes, EmployeeRoles } from '../types/employee';

export const getEmployeeRoleByType = (type: string) => {
	switch (type) {
		case 'sellers':
			return EmployeeRoles.SELLER;
		case 'stationSellers':
			return EmployeeRoles.STATION_SELLER;
		case 'appraisers':
			return EmployeeRoles.APPRAISER;
		default:
			throw new Error('Неизвестный тип сотрудника при орпедлении роли');
	}
};

export const getEmployeeTypeByRole = (role: string) => {
	switch (role) {
		case EmployeeRoles.SELLER:
			return 'sellers';
		case EmployeeRoles.STATION_SELLER:
			return 'stationSellers';
		case EmployeeRoles.APPRAISER:
			return 'appraisers';
		default:
			throw new Error('Неизвестная роль сотрудника при определении типа');
	}
};

export const displayRoleName = (mode: number, type: string) => {
	let answer = '';
	switch (type) {
		case 'sellers':
			answer = mode === 1 ? 'Продавец' : mode === 2 ? 'продавцами' : 'продавца';
			break;
		case 'appraisers':
			answer = mode === 1 ? 'Оценщик' : mode === 2 ? 'оценщиками' : 'оценщика';
			break;
		case 'stationSellers':
			answer = mode === 1 ? 'Универсал' : mode === 2 ? 'универсалами' : 'универсала';
			break;
		default:
			answer = 'Неизвестно';
	}

	return answer;
};

export const getEmployeeKpiDisplayName = (kpiName: string) => {
	switch (kpiName) {
		case EmployeeKpiTypes.EFFICIENCY_SALES:
			return 'Эффективность по продаже';
		case EmployeeKpiTypes.EFFICIENCY_RECEPTION_TRADE_IN:
			return 'Эффективность по приему Trade-in';
		case EmployeeKpiTypes.EFFICIENCY_RECEPTION_ETHERNET:
			return 'Эффективность по приему с Интернет-ресурсов';
		case EmployeeKpiTypes.EFFICIENCY_RECEPTION:
			return 'Эффективность по приему';
		default:
			return 'Неизвестно';
	}
};

export const getEmployeeKpiColor = (kpiName: string) => {
	switch (kpiName) {
		case EmployeeKpiTypes.EFFICIENCY_SALES:
			return 'blue';
		case EmployeeKpiTypes.EFFICIENCY_RECEPTION_TRADE_IN:
			return 'orange';
		case EmployeeKpiTypes.EFFICIENCY_RECEPTION_ETHERNET:
			return 'red';
		case EmployeeKpiTypes.EFFICIENCY_RECEPTION:
			return 'green';
		default:
			return 'black';
	}
};
