const mongodb = require('mongodb');
const EmployeeModel = require('../models/employee-model');
const UserModel = require('../models/user-model');
const LogModel = require('../models/log-model');

class UserHelper {
	async deletePlayerRelatedData(player) {
		await EmployeeModel.deleteMany({ userId: new mongodb.ObjectId(player.id) });
		await LogModel.deleteMany({ playerId: new mongodb.ObjectId(player.id) });
	}

	async deleteTrainerRelatedData(trainer) {
		const playersOfTrainer = await UserModel.find({ trainerId: new mongodb.ObjectId(trainer.id) });

		// eslint-disable-next-line no-restricted-syntax
		for await (const player of playersOfTrainer) {
			await this.deletePlayerRelatedData(player);
		}

		await UserModel.deleteMany({ trainerId: trainer.id });
	}
}

module.exports = new UserHelper();
