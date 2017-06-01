var $ = require('jquery');
var $receipts_page = require('./receipts');
var $home_page = require('./home');
var $navigation_bar = require('./templates/navigation');

// app pages
var templates = {
  home: $home_page,
  receipts: $receipts_page
};

// landing page
// $('#template_body').html($home_page);  // final landing page
$('#template_body').html($receipts_page); // remove after development

// load navigation
$('#navigation').html($navigation_bar);

// loads app page
function render(template) {
  $('#template_body').html(template);
}

// navigation bar click
$('#navigation').on('click', 'a', function() {
  var key = $(this).attr('value');
  render(templates[key]);
});
