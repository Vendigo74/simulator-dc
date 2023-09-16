const mongodb = require('mongodb');
const carModel = require('../models/car-model');
const ApiError = require('../exceptions/api-error');

class carsService {
	async getCars(id) {
		const cars = await carModel.find({ id });
		return cars;
	}

	async addCar(car) {
		await carModel.create({
			id: car.id,
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
		const cars = await carModel.find({ id: car.id });

		return cars;
	}

	async updateCar(car) {
		const newCar = await carModel.findOneAndUpdate({ _id: car._id }, car);
		const cars = carModel.find({ id: newCar.id });
		return cars;
	}

	async delateCar(id) {
		if (!id) {
			throw ApiError.BadRequest('Не передан id машины');
		}

		const car = await carModel.findByIdAndDelete({ _id: id });
		const cars = await carModel.find({ id: car.id });
		return cars;
	}
}

module.exports = new carsService();
