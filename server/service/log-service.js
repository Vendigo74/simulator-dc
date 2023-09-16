const LogModel = require('../models/log-model');
const ApiError = require('../exceptions/api-error');
const mongodb = require('mongodb');

class LogService {
	async addLog(payload) {
		const log = await LogModel.create(payload);
		return log;
	}

	async getLogsByPlayerId(playerId) {
		if (!playerId) {
			throw ApiError.BadRequest('Не передан id игрока для получения логов');
		}
		const logs = await LogModel.find({ playerId: new mongodb.ObjectId(playerId) });
		return logs;
	}

	async deleteLogs(playerId) {
		if (!playerId) {
			throw ApiError.BadRequest('Не передан id игрока для удаления логов');
		}
		const logs = await LogModel.remove({ playerId });
		return logs;
	}
}

module.exports = new LogService();
