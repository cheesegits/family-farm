var $ = require(`jquery`);
var $new_receipt = require(`./templates/receipts-newReceiptForm`);
var $receipts_template = require(`./templates/receipts-pageTemplate`);
var $table_template = require(`./templates/receipts-tableOfReceipts`);

var receipts = {
    seeds: [{
        date: "01-02-17",
        item: "Squash",
        quantity: "2",
        company: "Seeds of Change",
        price: "3.99",
        categories: ["seeds", "organic"]
    }, {
        date: "01-03-17",
        item: "Corn",
        quantity: "2",
        company: "Seeds of Change",
        price: "3.99",
        categories: ["soil", "organic"]
    }, {
        date: "01-01-17",
        item: "Beans",
        quantity: "2",
        company: "Seeds of Change",
        price: "3.99",
        categories: ["soil", "organic"]
    }],
    soil: [{
        date: "01-02-17",
        item: "Soil",
        quantity: "2",
        company: "Lowes",
        price: "3.99",
        categories: ["soil", "organic"]
    }, {
        date: "01-03-17",
        item: "Fertilizer",
        quantity: "2",
        company: "Home Depot",
        price: "3.99",
        categories: ["soil", "organic"]
    }, {
        date: "01-01-17",
        item: "Soil",
        quantity: "2",
        company: "Local Farmer",
        price: "3.99",
        categories: ["soil", "organic"]
    }]
}

// add form and table templates to receipt page
$receipts_template.find(`#form`).append($new_receipt);
$receipts_template.find(`#table`).append($table_template);

// sort receipt categories by date (newest on top)
function sortByDate(key) {
    for (var i = 0; i < receipts[key].length; i++) {
        receipts[key].sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return b - a;
        });
    }
}

// populate table with seedData
function updateTable(key) {
    receipts[key].forEach(function(receipt) {
        $table_template.find(`#` + key).append(
            `
            <tr>
                <td>${receipt.date}</td>
                <td>${receipt.item}</td>
                <td>${receipt.quantity}</td>
            </tr>
            `
        );
    });
}

// update DOM
function renderData() {
    for (key in receipts) {
        sortByDate(key);
        updateTable(key);
    }
}

// event listeners

function formSubmit() {
    $(`#submit`).click(function(event) {
        event.preventDefault();
        var category = $(`input[name="category"]:checked`, `#category`).val();
        console.log(category);
        $(`#new-receipt`)[0].reset();
    });
}

renderData();

$(function() {
    formSubmit();
});

module.exports = $receipts_template;