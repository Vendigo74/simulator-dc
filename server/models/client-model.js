const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  cars: { type: Array, default: [] },
  stands: { type: Array, default: [] },
  employees: { type: Array, default: [] },
  budget: { type: Number, default: 20000000 },
	rent: { type: Number, default: 0 },
  role: { type: String, default: "PLAYER" },
});

module.exports = model("Client", ClientSchema);
