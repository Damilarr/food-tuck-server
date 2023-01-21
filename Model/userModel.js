let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let schema = new Schema({
  name: { type: String, required:true },
  email: { type: String, required:true },
  password: { type: String },
  timestamps: { type: Date, createdAt: "created_at", updatedAt: "updated_at" },
});

module.exports = mongoose.model("food-tuck-users", schema);