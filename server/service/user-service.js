const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/user-model');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const userHelper = require('../helpers/userHelper');
const KpiModel = require('../models/kpi-model');
const StatsModel = require('../models/stats-model');
const EmployeeModel = require('../models/employee-model');
const carModel = require('../models/car-model');
const cars = require('../data/cars');

class UserService {
	async registrationTrainer(login, name, password) {
		const candidate = await UserModel.findOne({ login });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`);
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const user = await UserModel.create({ login, name, password: hashPassword, role: 'TRAINER' });
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		KpiModel.create({
			id: user._id,
			kpi: {
				efficiency: { default: 0, newValue: 0, border: 37 },
				efficiencyReception: { default: 10, newValue: 10, border: 37 },
				efficiencyReceptionEthernet: { default: 10, newValue: 10, border: 37 },
				efficiencyReceptionTradeIn: { default: 10, newValue: 10, border: 37 },
				efficiencyReceptionTradeInNA: { default: 10, newValue: 10, border: 37 },
				efficiencySales: { default: 10, newValue: 10, border: 37 },

				traffic: { default: 80, newValue: 80 },
				trafficForEvaluation: { default: 10, newValue: 10 },
				trafficForEvaluationVisit: { default: 10, newValue: 10 },
				trafficForEvaluationEthernet: { default: 10, newValue: 10 },
				trafficForEvaluationCalls: { default: 10, newValue: 10 },
				trafficForSales: { default: 10, newValue: 10 },
				trafficForSalesVisit: { default: 10, newValue: 10 },
				trafficForSalesEthernet: { default: 10, newValue: 10 },
				trafficForSalesCalls: { default: 10, newValue: 10 },

				profitToTrade: { default: 10000, newValue: 10000 },
				spendingOnMarketing: { default: 0, newValue: 0 },
				margin: { default: 8, newValue: 8 },
				salesValue: { default: 0, newValue: 0 },
				receptionValue: { default: 0, newValue: 0 },
			},
		});

		cars.map(car => {
			carModel.create({
				id: user._id,
				name: `${car.brand} ${car.model}`,
				brand: car.brand,
				model: car.model,
				year: car.year,
				mileage: car.mileage,
				body: car.body,
				engineVolume: car.engineVolume,
				enginePower: car.enginePower,
				transmission: car.transmission,
				driveUnit: car.driveUnit,
				salon: car.salon,
				priceBuy: car.priceBuy,
				priceSell: car.priceSell,
				brandIcon: car.brandIcon,
				imgSrc: car.imgSrc,
				priceFirmProg: car.priceFirmProg,
				priceDop: car.priceDop,
				standCar: car.standCar,
			});
		});

		return { ...tokens, user: userDto };
	}

	async registrationPlayer(name, trainerId) {
		const trainer = await this.getUserById(trainerId);
		if (!trainer) {
			throw ApiError.BadRequest(`Тренер не найден`);
		}
		const candidate = await UserModel.findOne({ name, trainerId });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с именем ${name} уже есть у данного тренера`);
		}
		const profit = [
			{ month: 1, profit: 0 },
			{ month: 2, profit: 0 },
			{ month: 3, profit: 0 },
			{ month: 4, profit: 0 },
			{ month: 5, profit: 0 },
			{ month: 6, profit: 0 },
			{ month: 7, profit: 0 },
			{ month: 8, profit: 0 },
			{ month: 9, profit: 0 },
			{ month: 10, profit: 0 },
			{ month: 11, profit: 0 },
			{ month: 12, profit: 0 },
		];

		const hashPassword = await bcrypt.hash('playerPassword', 3);
		const login = uuid.v4();
		const user = await UserModel.create({
			login,
			name,
			password: hashPassword,
			trainerId,
			profit,
		});

		const kpi = await KpiModel.findOne({ id: trainerId });
		// const stats = await StatsModel.findOne({ id: trainerId });

/* 		await StatsModel.findOneAndUpdate(
			{ id: trainerId },
			{
				$set: {
					stats: [
						...stats?.stats,
						{
							id: user._id,
							budget: 0,
							profitTotal: 0,
							rent: 0,
							salaryOfKeyEmployees: 0,
							salaryOfSecondaryEmployees: 0,
							costsOfHiringAndFiring: 0,
							employeeTraining: 0,
							costMarketingAction: 0,
							buyCars: 0,
							buyPosts: 0,
							buyStands: 0,
							countBuyCars: 0,
							countSellCars: 0,
							countPosts: 0,
							countStands: 0,
							hiredKeyEmployees: [],
							countManegementDecisions: 0,
						},
					],
				},
			}
		);
 */
		KpiModel.create({
			id: user._id,
			kpi: kpi.kpi,
		});

		EmployeeModel.create({
			idPlayer: user._id,
			hireEmployees: {
				universal: [],
				zakupshik: [],
				prodavec: [],
			},
		});

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw ApiError.BadRequest('Неккоректная ссылка активации');
		}
		user.isActivated = true;
		await user.save();
	}

	async loginPlayer(name, trainerId) {
		const user = await UserModel.findOne({ name, trainerId });
		if (!user) {
			throw ApiError.BadRequest('Игрок с такими данными не найден');
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async loginAdmin(login, password) {
		const user = await UserModel.findOne({ login });
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким логином не найден');
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль');
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}
		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}

	async getUserById(id) {
		const user = await UserModel.findById(id);
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким id не найден');
		}
		if (user.role === 'PLAYER') {
			return new UserDto(user);
		}
		return user;
	}

	async getUserByRole(roleName) {
		if (!roleName) {
			throw ApiError.BadRequest('Не передана роль пользователей');
		}
		const users = await UserModel.find({ role: roleName });
		if (roleName === 'PLAYER') {
			const players = users.map(item => new UserDto(item));
			return players;
		}
		return users;
	}

	async removeUserById(id) {
		if (!id) {
			throw ApiError.BadRequest('Не передан id для удаления пользователя');
		}
		const user = await UserModel.findById(id);
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким id не найден');
		}
		if (user.role === 'PLAYER') {
			await userHelper.deletePlayerRelatedData(user);
		}
		if (user.role === 'TRAINER') {
			await userHelper.deleteTrainerRelatedData(user);
			await carModel.findByIdAndDelete(id);
		}
		await UserModel.findByIdAndDelete(id);
		return user;
	}
}

module.exports = new UserService();
