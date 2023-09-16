const FirmProgModel = require('../models/firmProg-model');
const ApiError = require('../exceptions/api-error');

class firmprogService {
	async getFirmProg(id) {
		if (!id) {
			throw ApiError.BadRequest('Не передан id тренера');
		}
		const firmProg = FirmProgModel.find({ id });
		return firmProg;
	}

	async addFirmProg(itemFirmProg) {
		await FirmProgModel.create({
			id: itemFirmProg.id,
			brand: itemFirmProg.brand,
			model: itemFirmProg.model,
			year: itemFirmProg.year,
			mileage: itemFirmProg.mileage,
		});
		const firmProg = FirmProgModel.find({ id: itemFirmProg.id });
		return firmProg;
	}

	async updateFirmProg(itemFirmProg) {
		const newFirmProg = await FirmProgModel.findOneAndUpdate(
			{ _id: itemFirmProg._id },
			itemFirmProg
		);
		const firmProg = FirmProgModel.find({ id: newFirmProg.id });
		return firmProg;
	}

	async deleteFirmProg(id) {

		const firmProg = await FirmProgModel.findByIdAndDelete({ _id: id });
		const firmProgs = FirmProgModel.find({ id: firmProg.id });
		return firmProgs;
	}
}

module.exports = new firmprogService();
