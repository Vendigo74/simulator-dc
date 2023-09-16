const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');

class UserController {
	async getHome(req, res, next) {
		try {
			return res.send(`Hello! Simulator server ${process.env.NODE_ENV}`);
		} catch (e) {
			next(e);
		}
	}

	async registrationTrainer(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const { login, name, password } = req.body;
			const userData = await userService.registrationTrainer(login, name, password);
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async registrationPlayer(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const { name, trainerId } = req.body;
			const userData = await userService.registrationPlayer(name, trainerId);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			let userData = {};
			const { login, password, name, trainerId } = req.body;
			if (login && password) {
				userData = await userService.loginAdmin(login, password);
			} else if (name && trainerId) {
				userData = await userService.loginPlayer(name, trainerId);
			} else {
				return next(ApiError.BadRequest('Сервер не может обработать текущие данные для логина'));
			}

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}

	async getUser(req, res, next) {
		try {
			const user = await userService.getUserById(req.params.id);
			return res.json(user);
		} catch (e) {
			next(e);
		}
	}

	async getTrainers(req, res, next) {
		try {
			const users = await userService.getUserByRole('TRAINER');
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}

	async removeUser(req, res, next) {
		try {
			const user = await userService.removeUserById(req.params.id);
			return res.json(user);
		} catch (e) {
			next(e);
		}
	}

	async getPlayers(req, res, next) {
		try {
			const users = await userService.getUserByRole('PLAYER');
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
