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

app.listen(8080); // for testing only, remove after connection to database

mockData = { // for testing only, remove after connection to database
    seeds: [{
        category: "seeds",
        date: 0,
        item: "Squash",
        company: "Seed Savers",
        quantity: 5

    }, {
        category: "seeds",
        date: 0,
        item: "Beans",
        company: "Seeds of Change",
        // quantity: "test"
    }, {
        category: "seeds",
        date: 0,
        item: "Corn",
        company: "Burpee",
        price: 3.99
    }],
    soil: [{
        category: "soil",
        date: 0,
        item: "Compost",
        company: "Home Depot",
        // price: "3.99"
    }, {
        category: "soil",
        date: 0,
        item: "Soil",
        company: "Lowe's",
        tags: ["Certified Organic"]
    }, {
        category: "soil",
        date: 0,
        item: "Fertilizer",
        company: "Dr. Earth",
        // tags: "Certified Organic"
    }]
}

function date() { // for testing only, remove after a datepicker box is added to form submission 
    for (var key in mockData) {
        for (i = 0; i < mockData[key].length; i++) {
            mockData[key][i].date = new Date();
        }
    }
}

// retrieve schema
// var receiptSchema = require ('./models/receiptSchema');

// CRUD operations
// CREATE a new receipt in the database
app.post('/receipts', function(request, response) {
    var category = request.body.category;
    mockData[category].push(request.body);
    response.status(200).json(mockData); // for testing only, change json to return mongoDB objects
});

// READ the receipt(s) in the database
app.get('/receipts', function(request, response) {
    date(); // for testing only, remove after a datepicker box is added to form submission
    response.status(200).json(mockData); // for testing only, change json to return mongoDB objects
});

// UPDATE receipt in the database
app.put('/receipts', function(request, response) {
    mockData[request.body.category][request.body.id].quantity = request.body.quantity;
    response.status(200).json(mockData); // for testing only, change json to return mongoDB objects
});

// DELETE receipt from the database
app.delete('/receipts', function(request, response) {
    var id = request.body.id;
    mockData.seeds.splice(id, 1);
    response.status(200).json(mockData); // for testing only, change json to return mongoDB objects
});

//app.use();


// // exports
// exports.app = app;
// exports.runServer = runServer;