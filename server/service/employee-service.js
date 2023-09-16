const mongodb = require('mongodb');
const EmployeeModel = require('../models/employee-model');
const ApiError = require('../exceptions/api-error');
const MarketingActionsModel = require('../models/marketing_act-model');
const MarketingCategoryModel = require('../models/marketing_cat-model');

class EmployeeService {
	async getEmployees(userId) {
		if (!userId) {
			throw ApiError.BadRequest('Не передан id пользователя для получения сотрудников');
		}
		const employees = await EmployeeModel.find({ userId: new mongodb.ObjectId(userId) });
		return employees;
	}

	async addEmployee(payload) {
		/* await EmployeeModel.findOneAndUpdate(
			{ idPlayer: payload.idPlayer },
			{ $set: { hireEmployees: {
				universal: [],
				zakupshik: [],
				prodavec: [],
			} } },
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Successfully Updated');
				}
			}
		); */
		const employeeForState = {
			impact: payload.employee.impact,
			limitDay: 21,
			limitClient: 10,
			study: payload.employee.lock.reasonFour ? 'Учитель' : 0,
			id: Math.random(),
			rent: payload.employee.rent[0],
		};
		const employees = await EmployeeModel.findOne({ idPlayer: payload.idPlayer });
		if (payload.employee.name[0].includes('Универсал')) {
			employees.hireEmployees.universal.push({ ...employeeForState, type: 'universal' });
			await EmployeeModel.findOneAndUpdate(
				{ idPlayer: payload.idPlayer },
				{ $set: { hireEmployees: employees.hireEmployees } },
				function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log('Successfully Updated');
					}
				}
			);
		}
		if (payload.employee.name[0].includes('Закупщик')) {
			employees.hireEmployees.zakupshik.push({ ...employeeForState, type: 'zakupshik' });
			await EmployeeModel.findOneAndUpdate(
				{ idPlayer: payload.idPlayer },
				{ $set: { hireEmployees: employees.hireEmployees } },
				function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log('Successfully Updated');
					}
				}
			);
		}
		if (payload.employee.name[0].includes('Продавец')) {
			employees.hireEmployees.prodavec.push({ ...employeeForState, type: 'prodavec' });
			await EmployeeModel.findOneAndUpdate(
				{ idPlayer: payload.idPlayer },
				{ $set: { hireEmployees: employees.hireEmployees } },
				function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log('Successfully Updated');
					}
				}
			);
		}
		return employees;
	}

	async updateEmployee({ type, id, lvlStudyPack, studyLvl, idPlayer }) {
		const employees = await EmployeeModel.findOne({ idPlayer: idPlayer });

		const employeeStudyPack = await MarketingCategoryModel.findOne({ id: 9 });
		const marketingActions = await MarketingActionsModel.find({ idCategory: 9 });
		employeeStudyPack.actions = marketingActions;

		console.log(employeeStudyPack);
		employees.hireEmployees[`${type}`].map(el => {
			if (el.id === id) {
				el.study += 1;
				const impacts = Object.entries(employeeStudyPack.actions[lvlStudyPack].impact);
				impacts.map(item => {
					el.impact[item[0]][0].value += item[1][studyLvl].value;
				});
			}
		});

		await EmployeeModel.findOneAndUpdate(
			{ idPlayer: idPlayer },
			{ $set: { hireEmployees: employees.hireEmployees } },
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Successfully Updated');
				}
			}
		);
		return employees;
	}

	async removeEmployee({ type, id, idPlayer }) {
		if (!id) {
			throw ApiError.BadRequest('Не передан id сотрдника');
		}

		const employees = await EmployeeModel.findOne({ idPlayer: idPlayer });

		employees.hireEmployees[`${type}`] = employees.hireEmployees[`${type}`].filter(
			el => el.id !== +id
		);

		await EmployeeModel.findOneAndUpdate(
			{ idPlayer: idPlayer },
			{ $set: { hireEmployees: employees.hireEmployees } },
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Successfully Updated');
				}
			}
		);
		return employees;
	}

	async clearPlayerEmployees(idPlayer) {
		if (!idPlayer) {
			throw ApiError.BadRequest('Не передан id игрока');
		}
		await EmployeeModel.findOneAndUpdate(
			{ idPlayer: idPlayer },
			{
				$set: {
					hireEmployees: {
						universal: [],
						zakupshik: [],
						prodavec: [],
					},
				},
			},
			function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('Successfully Updated');
				}
			}
			);
			const employees = await EmployeeModel.findOne({ idPlayer: idPlayer });
		// const employees = await EmployeeModel.deleteMany({ userId: new mongodb.ObjectId(id) });
		console.log(employees)
		return employees;
	}
}

module.exports = new EmployeeService();
