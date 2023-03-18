let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  wishList: [
    {
      id: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      dsc: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],
  cart: [
    {
      id: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      dsc: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],
  timestamps: { type: Date, createdAt: "created_at", updatedAt: "updated_at" },
});

module.exports = mongoose.model("food-tuck-users", schema);
