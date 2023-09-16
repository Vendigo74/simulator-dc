const EventModel = require('../models/event-model');
const events = require('../data/events');

class EventsService {
	async getEvents() {
/* 		events.map(async event => {
			await EventModel.create({
				name: event.name,
				description: event.description,
				price: event.price,
				rent: event.rent,
			});
		}); */
		const events = await EventModel.find();
		return events;
	}
}

module.exports = new EventsService();
