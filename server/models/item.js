const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  category: { type: String, required: true },
  date: { type: Date, required: true },
  company: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number },
  price: { type: Number },
  tags: { type: [String] }
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
