const CarModel = require('../models/car-model');
// const cars = require('../data/cars');
const EffectModel = require('../models/effect-model');

class ClienService {
	async getClients(count) {
		/* 		cars.map(async car => {
			await CarModel.create({
				id: car.id,
				name: car.name,
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
 */
		const cars = await CarModel.find();

		const fakeKpi = {
			traffic: { default: 60, newValue: 60, border: 25 },
			trafficForEvaluation: { default: 10, newValue: 10, border: 25 },
			trafficForEvaluationEthernet: { default: 10, newValue: 10, border: 25 },
			trafficForEvaluationCalls: { default: 10, newValue: 10, border: 25 },
			trafficForSales: { default: 10, newValue: 10, border: 25 },
			trafficForSalesEthernet: { default: 10, newValue: 10, border: 25 },
			trafficForSalesCalls: { default: 10, newValue: 10, border: 25 },
		};

		const effect = {
			trafficForEvaluation: 0,
			trafficForEvaluationEthernet: -2,
			trafficForEvaluationCalls: 0,
			trafficForSales: 0,
			trafficForSalesEthernet: -2,
			trafficForSalesCalls: 0,
		};

		const arrayShuffle = function (array) {
			for (
				let i = 0, length = array.length, swap = 0, temp = '';
				i < length;
				i++
			) {
				swap = Math.floor(Math.random() * (i + 1));
				temp = array[swap];
				array[swap] = array[i];
				array[i] = temp;
			}
			return array;
		};

		const percentageChance = function (values, chances) {
			let pool = [];
			for (let i = 0; i < chances.length; i++) {
				for (let i2 = 0; i2 < chances[i]; i2++) {
					pool.push(i);
				}
			}
			return values[arrayShuffle(pool)['0']];
		};

		function createClients(count, source, effect, myCars, wantCars) {
			if (!count) {
				count = 12
			}
			const clientsArr = new Array(count).fill({ id: 0, effect: {} });
			if (!source.traffic) {
				source = fakeKpi;
			}

			let newMyCars = [...myCars];
			for (let i = 0; i < myCars.length * 2; i++) {
				newMyCars.push({});
			}

			const onePercent = source.traffic.newValue / 100;
			const arr = Object.entries(source).map(el => {
				return [el[0], el[1].newValue];
			});
			const newArr = arr.map(el => {
				return [el[0], (el[1] = Math.floor((el[1] / onePercent) * 100) / 100)];
			});
			newArr.shift();

			const valuesTrafficName = newArr.map(el => {
				return el[0];
			});

			const valuesTrafficValue = newArr.map(el => {
				return el[1];
			});
			const carsClient = [];
			const wantClient = [];
			const back = [];
			const traffic = [];

			for (let i = 0; i < count; i++) {
				traffic.push(percentageChance(valuesTrafficName, valuesTrafficValue));
				carsClient.push(
					percentageChance(newMyCars, new Array(newMyCars.length).fill(10))
				);
				wantClient.push(
					percentageChance(newMyCars, new Array(newMyCars.length).fill(10))
				);
				back.push(
					percentageChance(
						newMyCars.filter(el => el.id),
						new Array(newMyCars.filter(el => el.id).length).fill(10)
					)
				);
			}
			return clientsArr.map((client, i) => {
				if (carsClient[i] && wantClient[i]) {
					if (traffic[i].includes('Evaluation')) {
						carsClient[i] = back[i];
					}
					if (traffic[i].includes('Sales')) {
						wantClient[i] = back[i];
					}
				}
				if (carsClient[i].id === wantClient[i].id) {
					if (traffic[i].includes('Evaluation')) {
						clientsArr.length - 1 === i
							? (carsClient[i] = carsClient[i - 1])
							: (carsClient[i] = carsClient[i + 1]);
					}
				}
				return (client = {
					id: i + 1,
					effect: effect[`${traffic[i]}`],
					source: traffic[i],
					myCar: carsClient[i],
					wantCar: wantClient[i],
				});
			});
		}

		const clients = createClients(count.count, count.kpi, effect, cars, cars);

		return { clients: clients };
	}

	async getEffect() {
		const effect = await EffectModel.find();

		return effect[0]
	}
}

module.exports = new ClienService();
