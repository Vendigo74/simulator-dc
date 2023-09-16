const clientService = require('../service/clients-service');

class ClientsController {

	async getClients(req, res, next) {
		try {
			const { count } = req.body;
			const users = await clientService.getClients(count);
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
	async getEffect(req, res, next) {
		try {
			const effect = await clientService.getEffect();
			return res.json(effect);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new ClientsController();
