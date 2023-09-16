module.exports = class UserDto {
	name;

	id;

	cars;

	stands;

	employees;

	budget;

	budgetBorder;

	role;

	rent;

	profit;

	trainerId;

	constructor(model) {
		this.name = model.name;
		this.id = model._id;
		this.cars = model.cars;
		this.stands = model.stands;
		this.employees = model.employees;
		this.budget = model.budget;
		this.budgetBorder = model.budgetBorder;
		this.role = model.role;
		this.rent = model.rent;
		this.profit = model.profit;
		this.trainerId = model.trainerId;
	}
};
