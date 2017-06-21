var $ = require("jquery");
window.jQuery = $;
require("bootstrap");
var $new_receipt = require("./templates/receipts-newReceiptForm");
var $receipts_template = require("./templates/receipts-pageTemplate");
var $table_template = require("./templates/receipts-tableOfReceipts");
var $editModal_template = require("./templates/receipts-editReceipt");

// add form and table templates to receipt page
$receipts_template.find("#form").append($new_receipt);
$receipts_template.find("#table").append($table_template);
$receipts_template.find("#table").append($editModal_template);

function selectToday(dropdown, valueToday, counter) {
  if (counter === valueToday) {
    $(`${dropdown} option[value=${counter}]`).prop("selected", "selected");
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var daysInMonth = new Date(yyyy, mm, 0).getDate();
  // append years
  for (var i = 10; i > 0; i--) {
    $("#years").append(`<option value="${yearList}">${yearList}</option>`);
    selectToday("#years", yyyy, yearList);
    yearList -= 1;
  }
  // append months
  for (var i = 0; i < 12; i++) {
    var counter = i;
    $("#months").append(`<option value="${i + 1}">${monthArray[i]}</option>`);
    selectToday("#months", mm, counter);
  }
  // append days
  // additional function needed: when new month is selected, load daysInMonth and change the selected option to "Day"
  for (var i = 0; i < daysInMonth; i++) {
    var counter = i + 1;
    $("#days").append(`<option value="${i + 1}">${i + 1}<option>`);
    selectToday("#days", dd, counter);
  }
}

// sort receipt array by date (newest on top)
function sortByCategory(allReceipts) {
  var receiptsByCategory = {
    seeds: [],
    soil: []
  };
  allReceipts.forEach(function(receipt) {
    receiptsByCategory[receipt.category].push(receipt);
  });
  sortByDate(receiptsByCategory);
}

function sortByDate(receiptsByCategory) {
  for (var category in receiptsByCategory) {
    receiptsByCategory[category].sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return b - a;
    });
  }
  updateTable(receiptsByCategory);
}

// populate table with mock seedData
function updateTable(receiptsByDate) {
  for (var category in receiptsByDate) {
    receiptsByDate[category].forEach(function(receipt) {
      var date = new Date(receipt.date);
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var yyyy = date.getFullYear();
      date = `${mm}/${dd}/${yyyy}`;
      $table_template.find("#" + category).children("tbody").append(
        `
          <tr id="${receipt._id}" class="row">
              <td>${date}</td>
              <td>${receipt.item}</td>
              <td>${receipt.company}</td>
              <td><button type="button" class="btn btn-default btn-sm">Edit</button></td>
          </tr>
        `
      );
    });
  }
}

function editReceipt() {
  $.noConflict();
  $("body").on("click", ".table .btn", function() {
    var id = $(this).closest("tr").attr("id");
    getIndividualReceipt(id);
    $("#myModal").modal();
  });
}

function getIndividualReceipt(id) {
  var ajax = $.ajax("/receipts/" + id, {
    type: "GET",
    data: JSON.stringify(),
    dataType: "json"
  });
  ajax.done(function(response) {
    console.log("Individual receipt: ", response);
    populateEditReceipt(response);
  });
}

function populateEditReceipt(receipt) {
  var date = new Date(receipt.date);
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var yyyy = date.getFullYear();
  console.log(`${mm}/${dd}/${yyyy}`);
  // variables to create dropdown menu
  var yearList = yyyy;
  var monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var daysInMonth = new Date(yyyy, mm, 0).getDate();
  // append years
  for (var i = 10; i > 0; i--) {
    $("#editYear").append(`<option value="${yearList}">${yearList}</option>`);
    selectToday("#editYear", yyyy, yearList);
    yearList -= 1;
  }
  // append months
  for (var i = 0; i < 12; i++) {
    var counter = i;
    $("#editMonth").append(
      `<option value="${i + 1}">${monthArray[i]}</option>`
    );
    selectToday("#editMonth", mm, counter);
  }
  // append days
  // additional function needed: when new month is selected, load daysInMonth and change the selected option to "Day"
  for (var i = 0; i < daysInMonth; i++) {
    var counter = i + 1;
    $("#editDay").append(`<option value="${i + 1}">${i + 1}<option>`);
    selectToday("#days", dd, counter);
  }
  $("#editCategory").val(`${receipt.category}`);
  $("#editItem").attr("value", `${receipt.item}`);
  $("#editCompany").attr("value", `${receipt.company}`);
  $("#editQuantity").attr("value", `${receipt.quantity}`);
  $("#editPrice").attr("value", `${receipt.price}`);
  // // load tags
  editReceiptSubmit(receipt._id);
  deleteReceipt(receipt._id);
}

function editReceiptSubmit(id) {
  $.noConflict();
  $("#editForm").submit(function(event) {
    console.log("Edit Submit Attempted");
    $.ajax({
      url: "/receipts/" + id,
      type: "PATCH",
      data: {
        date:
          $(this).find("#editYear").val() +
            `-` +
            $(this).find("#editMonth").val() +
            `-` +
            $(this).find("#editDay").val(),
        category: $(this).find("#editCategory").val(),
        item: $(this).find("#editItem").val(),
        company: $(this).find("#editCompany").val()
      },
      dataType: "json"
    });
  });
}

function deleteReceipt(id) {
  console.log("delete id: " + id);
  $("#deleteItem").on("click", function(event) {
    $.ajax({
      url: "/receipts/" + id,
      type: "DELETE",
      dataType: "json"
    });
  });
}

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
        date:
          $(this).find("#years").val() +
            `-` +
            $(this).find("#months").val() +
            `-` +
            $(this).find("#days").val(),
        category: $(this).find("#category").val(),
        item: $(this).find("#item").val(),
        company: $(this).find("#company").val(),
        quantity: $(this).find("#quantity").val(),
        price: $(this).find("#price").val()
        // tags: checkboxes
      }
    })
      .done(function(response) {
        console.log("The POST response is ", response); // why , and not + concatenation?
        // refresh table/page
      })
      .fail(function(error) {
        console.log(error);
      });
  });
}

function getReceipts() {
  var ajax = $.ajax("/receipts", {
    type: "GET",
    data: JSON.stringify(),
    dataType: "json"
  })
    .done(function(response) {
      sortByCategory(response);
    })
    .fail(function(error) {
      console.log(error);
    });
}

$(function() {
  formDate();
  getReceipts();
  editReceipt();
  formSubmit();
});

module.exports = $receipts_template;
