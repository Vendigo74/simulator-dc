const kpiService = require('../service/kpi-service');

class kpiController {
	async getKpi(req, res, next) {
		try {
			const { trainerId, id } = req.body;
			const packs = await kpiService.getKpi(trainerId, id);
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async updateTrainerKpi(req, res, next) {
		try {
			const { trainerId, trainerKpi } = req.body;
			const packs = await kpiService.updateTrainerKpi(trainerId, trainerKpi);
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async setKpi(req, res, next) {
		try {
			const { kpi } = req.body;
			const packs = await kpiService.setKpi(kpi);
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new kpiController();
