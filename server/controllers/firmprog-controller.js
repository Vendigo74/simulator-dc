const firmprogService = require('../service/firmprog-service');

class FirmProgController {
	async getFirmProg(req, res, next) {
		try {

			const firmProg = await firmprogService.getFirmProg(req.params.id);
			res.json(firmProg);
		} catch (e) {
			next(e);
		}
	}

	async addFirmProg(req, res, next) {
		try {
			const firmProg = await firmprogService.addFirmProg(req.body);
			res.json(firmProg);
		} catch (e) {
			next(e);
		}
	}

	async updateFirmProg(req, res, next) {
		try {
			const firmProg = await firmprogService.updateFirmProg(req.body);
			res.json(firmProg);
		} catch (e) {
			next(e);
		}
	}

	async deleteFirmProg(req, res, next) {
		try {
			const firmProg = await firmprogService.deleteFirmProg(req.params.id);
			res.json(firmProg);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new FirmProgController();
