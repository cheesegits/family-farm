// requirements and variables
var express = require(`express`);
var app = express();
var mongoose = require(`mongoose`);
var bodyParser = require(`body-parser`);
var jsonParser = bodyParser.json();
var config = require(`./config`);

// express configuration
app.use(jsonParser);
app.use(`/src`, express.static(`public`));

// connection to database
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }
        app.listen(config.PORT, function() {
            console.log(`Listening on localhost:` + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
}

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

// retrieve schema
var Receipt = require(`./src/models/item`);

// CRUD operations
// CREATE a new receipt in the database
app.post(`/receipts`, function(request, response) {
    const category = request.body.category;
    Receipt.create({
        category: request.body.category,
        date: request.body.date,
        company: request.body.company,
        item: request.body.item,
        quantity: request.body.quantity,
        price: request.body.price,
        tags: request.body.tags
    }, function(error, receipts) {
        if (error) {
            return response.status(500).json({
                message: `Internal Server Error`
            });
        }
        response.status(200).json(receipts);
    });
});

// READ the receipt(s) in the database
app.get(`/receipts`, function(request, response) {
    Receipt.find(function(error, receipts) {
        if (error) {
            return response.status(500).json({
                message: 'Internal Server Error'
            });
        }
        response.status(200).json(receipts);
    });
});

// UPDATE a receipt in the database
app.put(`/receipts/:id`, function(request, response) {
    var updateData = {}
    for (var key in request.body) {
        updateData[key] = request.body[key];
    }
    Receipt.findOneAndUpdate({ '_id': request.params.id }, updateData, { new: true },
        function(error, receipt) {
            if (error) {
                return response.status(500).json({
                    message: 'Internal Error'
                });
            }
            response.status(200).json(receipt);
        });
});

// DELETE receipt from the database
app.delete(`/receipts`, function(request, response) {
    var id = request.body.id;
    mockData.seeds.splice(id, 1);
    response.status(200).json(mockData); // for testing only, change json to return mongoDB objects
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

// exports
exports.app = app;
exports.runServer = runServer;