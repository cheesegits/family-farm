var $ = require(`jquery`);
var $new_receipt = require(`./templates/receipts-newReceiptForm`);
var $receipts_template = require(`./templates/receipts-pageTemplate`);
var $table_template = require(`./templates/receipts-tableOfReceipts`);

// add form and table templates to receipt page
$receipts_template.find(`#form`).append($new_receipt);
$receipts_template.find(`#table`).append($table_template);

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

// factory function for receipts
var ReceiptList = function() {
    console.log(this);
    console.log(`Ready for a new receipt!`); // this logs correctly
    this.items = [];
    this.form = $(`#new-receipt`);
    this.form.submit(this.onAddReceiptSubmit.bind(this));
}

// prototype method 
ReceiptList.prototype.onAddReceiptSubmit = function(event) {
    console.log(event); // undefined
    console.log(`User attempting to submit receipt...`); // this does not log
    event.preventDefault();
    if (true === true) {
        console.log(`Mock validation has passed...`); // this does not log
        var receipt = {};
        receipt.date = $(`#months option:selected`).val() + `-` + $(`#days option:selected`).val() + `-` + $(`#years option:selected`).val();
        receipt.category = $(`#category option:selected`).val();
        receipt.item = $(`#item`).val();
        receipt.company = $(`#company`).val();
        this.addReceipt(receipt);
    }
}

var addReceipt = function(receipt) {
    console.log(`Object ready to be posted: ${receipt}`); // this does not log
    var ajax = $.ajax(`/receipts`, {
        type: `POST`,
        data: JSON.stringify(receipt),
        dataType: `json`,
        contentType: `application/json`
    });
    console.log(`Receipt successfully submitted:` + receipt); // this does not log
    // ajax.done(this.getItems.bind(this));
}

// update DOM
// pre-select today's date
function selectToday(dropdown, valueToday, counter) {
    if (counter === valueToday) {
        $(`${dropdown} option[value=${counter}]`).prop(`selected`, `selected`);
    }
}

// load date options
function formDate() {
    // variables for today's date
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yyyy = date.getFullYear();
    // variables to create dropdown menu
    var yearList = yyyy;
    var monthArray = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    var daysInMonth = new Date(yyyy, mm, 0).getDate();
    // append years
    for (var i = 10; i > 0; i--) {
        $(`#years`).append(`<option value="${yearList}">${yearList}</option>`);
        selectToday(`#years`, yyyy, yearList);
        yearList -= 1;
    }
    // append months
    for (var i = 0; i < 12; i++) {
        var counter = i;
        $(`#months`).append(`<option value="${i+1}">${monthArray[i]}</option>`);
        selectToday(`#months`, mm, counter);
    }
    // append days
    // additionl function needed: when new month is selected, load daysInMonth and change the selected option to "Day"
    for (var i = 0; i < daysInMonth; i++) {
        var counter = i + 1;
        $(`#days`).append(`<option value="${i+1}">${i+1}<option>`);
        selectToday(`#days`, dd, counter);
    };
}

// sort receipt array by date (newest on top)
function sortByDate(key) {
    for (var i = 0; i < receipts[key].length; i++) {
        receipts[key].sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return b - a;
        });
    }
}

// populate table with mock seedData
function updateTable(key) {
    receipts[key].forEach(function(receipt) {
        $table_template.find(`#` + key).children(`tbody`).append(
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

// load receipt tables
function renderData() {
    for (key in receipts) {
        sortByDate(key);
        updateTable(key);
    }
}

// event listeners
// on the fly form validator before submit button is clicked
function formValidator() { // needs overhaul
    $(`.required`).on(`focusout`, function() {
        var value = $(this).val();
        if (value == ``) {
            $(this).closest(`.form-group`).addClass(`has-error`);
        } else if ($.type(value) !== `string`) { // check against required schema type?
            $(this).addClass(`has-error`);
        } else {
            // $(this) refers to parent div, but need it to refer to closest div
            $(this).closest(`.form-group`).append(`<span class="glyphicon glyphicon-ok form-control-feedback"></span>`);
        }
    });
    $(`input`).on(`focus`, function() {
        $(this).closest(`.form-group`).removeClass(`has-error`);
    });
}

$(function() {
    formDate();
    formValidator();
    renderData();
    console.log(`Page loading...`); // this logs correctly
    var Receipts = new ReceiptList();
    console.log(Receipts.onAddReceiptSubmit());
    $(`#new-receipt`).on(`submit`, function(e) {
        alert(`hello`); // does not alert when clicked, or enter is it
    });
});

module.exports = $receipts_template;