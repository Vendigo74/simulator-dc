import { randomInteger } from './randomInteger';

export const addClientIdEmployee = (clients, hireEmployees, counterDay, requestCount) => {
	let employeeLimitDay = { universal: [], zakupshik: [], prodavec: [] };

	return clients.map(client => {
		const randomIndex = randomInteger(0, client.type.length - 1);
		const filterEmployee = employees => {
			const result = [];

			employees.map((emp, i) => {
				if (employeeLimitDay[`${emp.type}`].findIndex(el => el.id === emp.id) === -1) {
					employeeLimitDay[`${emp.type}`].push({
						id: emp.id,
						limitClient: emp.limitClient,
					});
				}

				if (
					employeeLimitDay[`${emp.type}`].find(el => el.id === emp.id).limitClient > 0 &&
					counterDay >= requestCount - emp.limitDay &&
					!(i % 2)
				) {
					result.push(emp);
					// eslint-disable-next-line
				}
				if (
					employeeLimitDay[`${emp.type}`].find(el => el.id === emp.id).limitClient > 0 &&
					counterDay <= emp.limitDay &&
					!!(i % 2)
				) {
					result.push(emp);
				}
			});

			return result;
		};

		let i = 0;
		const getEmloyee = randomIndex => {
			let employees = hireEmployees[`${client.type[randomIndex]}`];
			if (client.type.length === 1) {
				employees = hireEmployees[`${client.type[randomIndex]}`];
				return filterEmployee(employees);
			}

			if (employees.length === 0) {
				if (randomIndex === 0) {
					employees = hireEmployees[`${client.type[randomIndex + 1]}`];
					return filterEmployee(employees);
				}
				if (randomIndex > 0) {
					employees = hireEmployees[`${client.type[randomIndex - 1]}`];
					return filterEmployee(employees);
				}
			} else {
				return filterEmployee(employees);
			}
		};

		const prepEmployee = getEmloyee(randomIndex);

		const setIdEmployeeForClient = (client, employeesPrep) => {
			const employee = employeesPrep[randomInteger(0, employeesPrep.length - 1)];

			employeeLimitDay[`${employee.type}`].map(el => {
				if (el.limitClient > 0 && el.id === employee.id) {
					el.limitClient -= 1;
					client.idEmployee = employee.id;
				}
			});
		};

		client.idEmployee = prepEmployee[0]?.id;
		if (prepEmployee.length > 0) {
			setIdEmployeeForClient(client, prepEmployee);
		}

		if (client.idEmployee) {
			return client;
		}
	});
};
