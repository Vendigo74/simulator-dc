const statsService = require('../service/stats-service');

class StatsController {
	async getStats(req, res, next) {
		try {
			const stats = await statsService.getStats(req.params.id);
			res.json(stats);
		} catch (e) {
			next(e);
		}
	}

	async updateStats(req, res, next) {
		try {
			const stats = await statsService.updateStats(req.body);
			res.json(stats);
		} catch (e) {
			next(e);
		}
	}

	async addStats(req, res, next) {
		try {
			const stats = await statsService.addStats(req.body);
			res.json(stats);
		} catch (e) {
			next(e);
		}
	}

	async deleteStats(req, res, next) {
		try {
			const stats = await statsService.deleteStats(req.params.id);
			res.json(stats);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new StatsController();
