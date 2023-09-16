const employeeService = require('../service/employee-service');
const userService = require('../service/user-service');
const tokenService = require('../service/token-service');

class EmployeeController {
	async getEmployees(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = tokenService.validateRefreshToken(refreshToken);
			const { id: userId } = userData;
			const employees = await employeeService.getEmployees(userId);
			return res.json(employees);
		} catch (e) {
			next(e);
		}
	}

	async addEmployee(req, res, next) {
		try {
			const employee = await employeeService.addEmployee(req.body);
			return res.json(employee);
		} catch (e) {
			next(e);
		}
	}

	async updateEmployee(req, res, next) {
		try {
			const employees = await employeeService.updateEmployee(req.body);
			return res.json(employees);
		} catch (e) {
			next(e);
		}
	}

	async removeEmployee(req, res, next) {
		try {
			const employee = await employeeService.removeEmployee(req.params);
			return res.json(employee);
		} catch (e) {
			next(e);
		}
	}

	async clearPlayerEmployees(req, res, next) {
		try {
			const clearedEmployees = await employeeService.clearPlayerEmployees(req.params.id);
			return res.json(clearedEmployees);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new EmployeeController();
