const { Schema, model } = require('mongoose');

const CarSchema = new Schema({
  id: { type: String, default: '' },
	name: { type: String, default: '' },
	brand: { type: String, default: '' },
	model: { type: String, default: '' },
	year: { type: Number, default: 0 },
	mileage: { type: Number, default: 0 },
	body: { type: String, default: [] },
	engineVolume: { type: Number, default: 0 },
	enginePower: { type: Number, default: 0 },
	transmission: { type: String, default: '' },
	driveUnit: { type: String, default: 0 },
	salon: { type: String, default: '' },
	priceBuy: { type: Number, default: 0 },
	priceSell: { type: Number, default: 0 },
	brandIcon: { type: String, default: '' },
	imgSrc: { type: String, default: '' },
	priceFirmProg: { type: Number, default: 0 },
	priceDop: { type: Number, default: 0 },
	standCar: { type: String, default: '' },
});

module.exports = model('Car', CarSchema);
