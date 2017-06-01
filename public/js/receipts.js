var $ = require(`jquery`);
var $new_receipt = require(`./templates/receipts-newReceiptForm`);
var $receipts_template = require(`./templates/receipts-pageTemplate`);
var $table_template = require(`./templates/receipts-tableOfReceipts`);

// add form and table templates to receipt page
$receipts_template.find(`#form`).append($new_receipt);
$receipts_template.find(`#table`).append($table_template);

var receipts = {
  seeds: [
    {
      date: "01-02-17",
      item: "Squash",
      quantity: "2",
      company: "Seeds of Change",
      price: "3.99",
      categories: ["seeds", "organic"]
    },
    {
      date: "01-03-17",
      item: "Corn",
      quantity: "2",
      company: "Seeds of Change",
      price: "3.99",
      categories: ["soil", "organic"]
    },
    {
      date: "01-01-17",
      item: "Beans",
      quantity: "2",
      company: "Seeds of Change",
      price: "3.99",
      categories: ["soil", "organic"]
    }
  ],
  soil: [
    {
      date: "01-02-17",
      item: "Soil",
      quantity: "2",
      company: "Lowes",
      price: "3.99",
      categories: ["soil", "organic"]
    },
    {
      date: "01-03-17",
      item: "Fertilizer",
      quantity: "2",
      company: "Home Depot",
      price: "3.99",
      categories: ["soil", "organic"]
    },
    {
      date: "01-01-17",
      item: "Soil",
      quantity: "2",
      company: "Local Farmer",
      price: "3.99",
      categories: ["soil", "organic"]
    }
  ]
};

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
  var monthArray = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
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
    $(`#months`).append(`<option value="${i + 1}">${monthArray[i]}</option>`);
    selectToday(`#months`, mm, counter);
  }
  // append days
  // additionl function needed: when new month is selected, load daysInMonth and change the selected option to "Day"
  for (var i = 0; i < daysInMonth; i++) {
    var counter = i + 1;
    $(`#days`).append(`<option value="${i + 1}">${i + 1}<option>`);
    selectToday(`#days`, dd, counter);
  }
}

// // sort receipt array by date (newest on top)
// function sortByCategory(key) {
//     allReceipts = {
//         seeds: [],
//         soil: []
//     }
//     receipts.forEach(function(receipt) {
//         allReceipts[receipt.category].push(receipt);
//     });
//     return allReceipts;
// }

// function sortByDate(allReceipts) {
//     for (var i = 0; i < allReceipts[key].length; i++) {
//         allReceipts[key].sort(function(a, b) {
//             a = new Date(a.date);
//             b = new Date(b.date);
//             return b - a;
//         });
//     }
// }

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

// function renderData() {
//     for (key in receipts) {
//         sortByDate(key);
//         updateTable(key);
//     }
// }

function formSubmit() {
  $("#new-receipt").submit(function(event) {
    event.preventDefault();
    // var checkboxes = [];
    // $("input:checkbox[name=tags]:checked").each(function() {
    //   checkboxes.push($(this).val());
    // });
    $.ajax({
      url: "/receipts",
      method: "POST",
      data: {
        date: $(this).find("#months").val() +
          `-` +
          $(this).find("#days").val() +
          `-` +
          $(this).find("#years").val(),
        category: $(this).find("#category").val(),
        item: $(this).find("#item").val(),
        company: $(this).find("#company").val(),
        quantity: $(this).find("#quantity").val(),
        price: $(this).find("#price").val()
        // tags: checkboxes
      }
    })
      .done(function(response) {
        console.log("The POST response is ", response);
      })
      .fail(function(error) {
        console.log(error);
      });
  });
}

$(function() {
  formDate();
  // renderData();
  formSubmit();
});

module.exports = $receipts_template;
