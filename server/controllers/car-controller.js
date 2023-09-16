const carsService = require('../service/cars-service');

class carsController {
	async getCars(req, res, next) {
		try {
			const cars = await carsService.getCars(req.params.id);
			return res.json(cars);
		} catch (e) {
			next(e);
		}
	}

	async addCar(req, res, next) {
		try {
			const car = await carsService.addCar(req.body);
			return res.json(car);
		} catch (e) {
			next(e);
		}
	}

	async updateCar(req, res, next) {
		try {
			const car = await carsService.updateCar(req.body);
			res.json(car);
		} catch (e) {
			next(e);
		}
	}

	async delateCar(req, res, next) {
		try {
			const car = await carsService.delateCar(req.params.id);
			return res.json(car);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new carsController();
