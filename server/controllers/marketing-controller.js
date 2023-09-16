const marketinService = require("../service/marketing-service");

class MarketingController {

	async getMarketing(req, res, next) {
		try {
			const packs = await marketinService.getMarketing();
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async getMarketingCategory(req, res, next) {
		try {
			const packs = await marketinService.getMarketingCategory();
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async getMarketingActions(req, res, next) {
		try {
			const packs = await marketinService.getMarketingActions();
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async addMarketing(req, res, next) {
		try {
			const packs = await marketinService.addMarketing(req.boody);
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async updateMarketing(req, res, next) {
		try {
			const packs = await marketinService.updateMarketing(req.boody);
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async deleteMarketing(req, res, next) {
		try {
			const packs = await marketinService.deleteMarketing();
			return res.json(packs);
		} catch (e) {
			next(e);
		}
	}

	async getMarketingById(req, res, next) {
		try {
			const marketingPack = await marketinService.getMarketingById(req.params.id);
			res.json(marketingPack);
		} catch (e) {
			next(e);
		}
	}

}

module.exports = new MarketingController();
