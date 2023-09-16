import { percentageChance } from './randomizer';
import { v4 as uuidv4 } from 'uuid';

const cars: any = [
	{
		id: '1',
		name: 'Mitsubishi Pajero sport',
		brand: 'Mitsubishi',
		model: 'Pajero sport',
		year: 2017,
		mileage: 108000,
		body: 'Внедорожник 5 дв.',
		engineVolume: 2.4,
		enginePower: 181,
		transmission: 'автомат',
		driveUnit: 'полный',
		salon: 'eko',
		priceBuy: 2700000,
		priceSell: 30000,
		brandIcon:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1000px-Mitsubishi_logo.svg.png',
		imgSrc:
			'https://cdnimg.rg.ru/img/content/204/80/39/New_Mitsubishi_Pajero_Sport_exterior_d_850.jpeg',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
	{
		id: '2',
		name: 'Mitsubishi Eclipse cross',

		brand: 'Mitsubishi',
		model: 'Eclipse cross',
		year: 2009,
		mileage: 100000,
		body: 'crossover',
		engineVolume: 1.3,
		enginePower: 108,
		transmission: 'under',
		driveUnit: 'back',
		salon: 'eko',
		priceBuy: 2430000,
		priceSell: 30000,
		brandIcon:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1000px-Mitsubishi_logo.svg.png',
		imgSrc:
			'https://www.mitsubishi-motors.ru/files/includes/landing/new-eclipse-cross/assets/img/car-design-1.jpg',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
	{
		id: '3',
		name: 'Volkswagen Touareg',
		brand: 'Volkswagen',
		model: 'Touareg',
		year: 2020,
		mileage: 74000,
		body: 'crossover',
		engineVolume: 2.3,
		enginePower: 245,
		transmission: 'under',
		driveUnit: 'front',
		salon: 'eko',
		priceBuy: 4130000,
		priceSell: 30000,
		brandIcon: 'http://pngimg.com/uploads/car_logo/car_logo_PNG1667.png',
		imgSrc: 'https://www.kerg.ru/images/specs/touareg_tradein250.png',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
	{
		id: '4',
		name: 'Volkswagen Tiguan',
		brand: 'Volkswagen',
		model: 'Tiguan',
		year: 2012,
		mileage: 108343,
		body: 'crossover',
		engineVolume: 2.0,
		enginePower: 176,
		transmission: 'under',
		driveUnit: 'front',
		salon: 'eko',
		priceBuy: 1730000,
		priceSell: 30000,
		brandIcon: 'http://pngimg.com/uploads/car_logo/car_logo_PNG1667.png',
		imgSrc: 'https://www.kerg.ru/images/offer/2021/new_tiguan.png',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
	{
		id: '5',
		name: 'Volkswagen Passat',
		brand: 'Volkswagen',
		model: 'Passat',
		year: 2015,
		mileage: 108800,
		body: 'crossover',
		engineVolume: 3.9,
		enginePower: 247,
		transmission: 'under',
		driveUnit: 'back',
		salon: 'eko',
		priceBuy: 2096000,
		priceSell: 30000,
		brandIcon: 'http://pngimg.com/uploads/car_logo/car_logo_PNG1667.png',
		imgSrc: 'https://www.kerg.ru/images/offer/2020/new_passat.jpg',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
	{
		id: '6',
		name: 'Tesla Model 3',
		brand: 'Tesla',
		model: 'Model 3',
		year: 2015,
		mileage: 108800,
		body: 'crossover',
		engineVolume: 2.2,
		enginePower: 146,
		transmission: 'under',
		driveUnit: 'back',
		salon: 'eko',
		priceBuy: 2096757,
		priceSell: 30000,
		brandIcon: 'http://pngimg.com/uploads/car_logo/car_logo_PNG1667.png',
		imgSrc: 'https://www.kerg.ru/images/offer/2020/new_passat.jpg',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
	{
		id: '7',
		name: 'Tesla Model 2',
		brand: 'Tesla',
		model: 'Model 2',
		year: 2019,
		mileage: 188080,
		body: 'crossover',
		engineVolume: 3.9,
		enginePower: 247,
		transmission: 'under',
		driveUnit: 'back',
		salon: 'eko',
		priceBuy: 2999000,
		priceSell: 30000,
		brandIcon: 'http://pngimg.com/uploads/car_logo/car_logo_PNG1667.png',
		imgSrc: 'https://www.kerg.ru/images/offer/2020/new_passat.jpg',
		priceFirmProg: 100000,
		priceDop: 80000,
		standCar: '',
	},
];

const fakeKpi = {
	traffic: { default: 60, newValue: 80, border: 25 },
	trafficForEvaluationVisit: { default: 10, newValue: 10, border: 25 },
	trafficForEvaluationEthernet: { default: 10, newValue: 10, border: 25 },
	trafficForEvaluationCalls: { default: 10, newValue: 10, border: 25 },
	trafficForSalesVisit: { default: 10, newValue: 10, border: 25 },
	trafficForSalesEthernet: { default: 10, newValue: 10, border: 25 },
	trafficForSalesCalls: { default: 10, newValue: 10, border: 25 },
};

function createClients({ count, source, effect, cars }) {
	if (!count) {
		return [];
	}

	const clientsArr = new Array(count).fill({ id: 0, effect: {} });
	if (!source.traffic) {
		source = fakeKpi;
	}

	let newMyCars = [...cars];
	for (let i = 0; i < cars.length * 2; i = i + 1) {
		newMyCars.push({});
	}
	const onePercent = source.traffic.newValue / 100;
	const arr = Object.entries(source).map((el: any) => {
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

	for (let i = 0; i < count; i = i + 1) {
		traffic.push(percentageChance(valuesTrafficName, valuesTrafficValue));
		carsClient.push(percentageChance(newMyCars, new Array(newMyCars.length).fill(10)));
		wantClient.push(percentageChance(newMyCars, new Array(newMyCars.length).fill(10)));
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
		const type = [];
		if (carsClient[i].id && wantClient[i].id) {
			type.push('universal');
		}
		if (!carsClient[i].id && wantClient[i].id) {
			type.push('prodavec');
			type.push('universal');
		}
		if (carsClient[i].id && !wantClient[i].id) {
			type.push('zakupshik');
			type.push('universal');
		}

		return (client = {
			id: i + 1,
			effect: effect[`${traffic[i]}`],
			source: traffic[i],
			myCar: { ...carsClient[i], idResult: uuidv4() },
			idResultClient: uuidv4(),
			wantCar: { ...wantClient[i], idResult: uuidv4() },
			idEmployee: null,
			type,
		});
	});
}

// const clients = createClients(count, kpi, effect, cars, cars);

export default createClients;
