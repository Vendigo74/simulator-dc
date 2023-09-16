const logService = require('../service/log-service');

class LogController {
	async addLog(req, res, next) {
		try {
			const log = await logService.addLog(req.body);
			return res.json(log);
		} catch (e) {
			next(e);
		}
	}

	async getLogsByPlayerId(req, res, next) {
		try {
			const logs = await logService.getLogsByPlayerId(req.params.id);
			return res.json(logs);
		} catch (e) {
			next(e);
		}
	}

	async deleteLogs(req, res, next) {
		try {
			const logs = await logService.deleteLogs(req.params.id);
			return res.json(logs);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new LogController();
