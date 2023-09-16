const eventsService = require('../service/events-service');

class EventsController {

	async getEvents(req, res, next) {
		try {
			const events = await eventsService.getEvents();
			return res.json(events);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new EventsController();
