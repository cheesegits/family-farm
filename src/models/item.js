var mongoose = require('mongoose');

var receiptSchema = new mongoose.Schema({
    category: { type: String, required: true },
    date: { type: Date, required: true },
    company: { type: String, required: true },
    item: { type: String, required: true },
    quantity: { type: String },
    price: { type: String },
    tags: { type: [String] }
});

var Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;