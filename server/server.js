// requirements and variables
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: false });
const config = require("./config");
const path = require("path");
const morgan = require("morgan");

// express configuration
app.use(jsonParser);
app.use(urlencoded);
app.use(express.static(path.resolve(__dirname, "../public")));
app.use("/libs", express.static(path.resolve(__dirname, "../node_modules")));
app.use("/css", express.static(path.resolve(__dirname, "../public/styles")));

app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ].join(" ");
  })
);

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
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
}

// retrieve schema
var Receipt = require(`./models/item`);

// CRUD operations
// CREATE a new receipt in the database
app.post(`/receipts`, function(req, res) {
  console.log("Request body:");
  console.log(req.body);
  const newReceipt = {
    category: req.body.category,
    date: req.body.date,
    company: req.body.company,
    item: req.body.item,
    quantity: req.body.quantity,
    price: req.body.price,
    tags: req.body.tags
  };
  console.log("The newReceipt is: " + newReceipt);
  Receipt.create(newReceipt, function(error, receipt) {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(201).json(receipt);
  });
});

// READ the receipt(s) in the database
app.get(`/receipts`, function(request, response) {
  Receipt.find(function(error, receipts) {
    if (error) {
      return response.status(500).json({
        message: "Internal Server Error"
      });
    }
    response.status(200).json(receipts);
  });
});

// READ individual receipt in the database
app.get("/receipts/:id", function(req, res) {
  // console.log(req);
  Receipt.findById(req.params.id, function(err, receipt) {
    if (err) {
      return response.status(500).json({
        message: err
      });
    }
    res.status(200).json(receipt);
  });
});

// UPDATE a receipt in the database
app.patch(`/receipts/:id`, function(request, response) {
  var updateData = {};
  for (var key in request.body) {
    updateData[key] = request.body[key];
  }
  Receipt.findOneAndUpdate(
    { _id: request.params.id },
    updateData,
    { new: true },
    function(error, receipt) {
      if (error) {
        return response.status(500).json({
          message: "Internal Error"
        });
      }
      response.status(200).json(receipt);
    }
  );
});

// DELETE receipt from the database
app.delete(`/receipts/:id`, function(request, response) {
  Receipt.findOneAndRemove({ _id: request.params.id }, function(
    error,
    receipt
  ) {
    if (error) {
      return response.status(500).json({
        message: "Internal Server Error"
      });
    }
    response.status(200).json(receipt);
  });
});

app.all("*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// exports
exports.app = app;
exports.runServer = runServer;
