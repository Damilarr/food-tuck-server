let mongoose = require('mongoose');
let User = require('./userModel')

const cartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    items:{type:Array},
    timestamps: { type: Date, createdAt: "created_at", updatedAt: "updated_at" },
});

module.exports = mongoose.model("cart", cartSchema);
