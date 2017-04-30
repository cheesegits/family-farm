var mongoose = require('mongoose');

var receiptSchema = new mongoose.Schema({

});

var Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;