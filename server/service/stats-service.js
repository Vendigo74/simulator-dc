const StatsModel = require('../models/stats-model');
const ApiError = require('../exceptions/api-error');

class StatsService {
	async getStats(id) {
		if (!id) {
			throw ApiError.BadRequest('Не передан id тренера');
		}
		const stats = await StatsModel.find({ trainerId: id });
		return stats;
	}

	async updateStats(itemStats) {
		const stats = await StatsModel.findOne({ id: itemStats.stats.id });
		if (!stats) {
			// console.log(stats);
			const newStats = await StatsModel.create(
				{
					id: itemStats.stats.id,
					trainerId: itemStats.trainerId,
					stats: itemStats.stats,
				},
				function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log('Successfully Updated');
					}
				}
			);
			return newStats;
		} else {
			const sendStats = await StatsModel.findOneAndUpdate(
				{ id: itemStats.stats.id },
				{ $set: { stats: itemStats.stats } },
				function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log('Successfully Updated');
					}
				}
			);
			const commonStats = await StatsModel.find({ trainerId: itemStats.trainerId });
			// console.log(itemStats);
			const send = commonStats.reduce((acc, el) => {
				return [...acc, { profitTotal: el.stats.profitTotal, player: el.stats.id }];
			}, []);
			return send;
		}
	}

	async addStats(itemStats) {
		await StatsModel.create({
			id: itemStats.id,
			brand: itemStats.brand,
			model: itemStats.model,
			year: itemStats.year,
			mileage: itemStats.mileage,
		});
		const stats = StatsModel.find({ id: itemStats.id });
		return stats;
	}

	async deleteStats(id) {
		/* 	const stats = await StatsModel.findByIdAndDelete({ _id: id });
		const stats = StatsModel.find({ id: Stats.id });
		return Statss; */
	}
}

module.exports = new StatsService();
