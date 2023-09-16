const MarketingActionsModel = require('../models/marketing_act-model');
const MarketingCategoryModel = require('../models/marketing_cat-model');
const EffectModel = require('../models/effect-model');
const KpiModel = require('../models/kpi-model');
const FirmProgModel = require('../models/firmProg-model');
const marketingActions = require('../data/marketingActions');
const marketingCategory = require('../data/marketingCategory');
const ApiError = require('../exceptions/api-error');

class MarketinService {

	async getMarketing() {
		const category = await MarketingCategoryModel.find();
		const action = await MarketingActionsModel.find();

		if (action.length === 0) {
			marketingActions.map(async act => {
				await MarketingActionsModel.create({
					id: act.id,
					idCategory: act.idCategory,
					name: act.name,
					price: act.price,
					rent: act.rent,
					forEachEmployee: act.forEachEmployee,
					impact: act.impact,
					preparationPrice: act.preparationPrice,
					lock: act.lock,
					action: act?.action,
					lvl: act?.lvl,
				});
			});
		}

		action.sort((a, b) => a.id - b.id);

		category.map(el => {
			action.map(item => {
				if (item.impact.none === null) {
					item.impact = {};
				}
				if (el.id === item.idCategory) {
					el.actions.push(item);
				}
			});
		});
		return { category };
	}

	async getMarketingCategory() {
		const marketingCategory = await MarketingCategoryModel.find();
		return marketingCategory;
	}

	async getMarketingActions() {
		const marketingActions = await MarketingActionsModel.find();
		return marketingActions;
	}

	async addMarketing({ item, type }) {
		if (type === 'actions') {
			await MarketingActionsModel.create({
				id: item.id,
				idCategory: item.idCategory,
				name: item.name,
				price: item.price,
				rent: item.rent,
				forEachEmployee: item.forEachEmployee,
				impact: item.impact,
				preparationPrice: item.preparationPrice,
				lock: item.lock,
				action: item?.action,
				lvl: item?.lvl,
			});

			const marketingActions = await MarketingActionsModel.find();
			return marketingActions;
		}
		if (type === 'category') {
			await MarketingCategoryModel.create({
				id: item.id,
				category: item.category,
				subCategory: item.subCategory,
				leaderAction: item.leaderAction,
				reason: item.reason,
				actions: item.actions,
			});

			const marketingCategory = await MarketingCategoryModel.find();
			return marketingCategory;
		}
	}

	async updateMarketing({ item, type, id }) {
		if (type === 'actions') {
			await MarketingActionsModel.findByIdAndUpdate({ _id: id }, item);

			const marketingActions = await MarketingActionsModel.find();
			return marketingActions;
		}
		if (type === 'category') {
			await MarketingCategoryModel.findByIdAndUpdate({ _id: id }, item);

			const marketingCategory = await MarketingCategoryModel.find();
			return marketingCategory;
		}
	}

	async deleteMarketing({ item, type, id }) {
		if (type === 'actions') {
			await MarketingActionsModel.findByIdAndRemove({ _id: id }, item);

			const marketingActions = await MarketingActionsModel.find();
			return marketingActions;
		}
		if (type === 'category') {
			await MarketingCategoryModel.findByIdAndRemove({ _id: id }, item);

			const marketingCategory = await MarketingCategoryModel.find();
			return marketingCategory;
		}
	}

	async getMarketingById(id) {
		if (!id) {
			throw ApiError.BadRequest('Не передан id товара');
		}

		const marketingPack = await MarketingCategoryModel.findOne({ id });
		if (!marketingPack) {
			throw ApiError.BadRequest('Категория маркетинга с таким id не найдена');
		}

		const marketingActions = await MarketingActionsModel.find({ idCategory: marketingPack.id });
		marketingPack.actions = marketingActions;

		return marketingPack;
	}
}

module.exports = new MarketinService();
