var mongoose = require('mongoose');

var receiptSchema = new mongoose.Schema({
  category: { type: String, required: false },
  date: { type: Date, required: false },
  company: { type: String, required: false },
  item: { type: String, required: false },
  quantity: { type: Number },
  price: { type: Number },
  tags: { type: [String] }
});

var Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
