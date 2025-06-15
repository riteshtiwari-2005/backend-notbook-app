const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  desc:{type:String,required:true},
    completed: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);
