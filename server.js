// requirements and variables
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var config = require('./config');

// express configuration
app.use(jsonParser);
app.use('/src', express.static('public'));

// // connection to database
// var runServer = function(callback) {
//     mongoose.connect(config.DATABASE_URL, function(err) {
//         if (err && callback) {
//             return callback(err);
//         }
//         app.listen(config.PORT, function() {
//             console.log('Listening on localhost:' + config.PORT);
//             if (callback) {
//                 callback();
//             }
//         });
//     });
// }

// if (require.main === module) {
//     runServer(function(err) {
//         if (err) {
//             console.error(err);
//         }
//     });
// }

app.listen(8080);

mockData = {
    seeds: [],
    soil: []
}

// retrieve schema
// var receiptSchema = require ('./models/receiptSchema');

// CRUD operations
// CREATE a new receipt in the database
//app.post();

// READ the receipt(s) in the database
app.get('/receipts', function(request, response) {
    response.status(200).json(mockData);
});

// UPDATE receipt in the database
//app.put();

// DELETE receipt from the database
//app.delete();

//app.use();


// // exports
// exports.app = app;
// exports.runServer = runServer;