var $ = require("jquery");
module.exports = $(`
<div class="container">
    <h2 class="text-center">Seeds</h2>
    <table class="table table-hover table-condensed" id="seeds">
        <thead>
            <tr class="row">
                <th class="text-center">Date</th>
                <th class="text-center">Product</th>
                <th class="text-center">Company</th>
                <th class="text-center">Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <hr>
</div>
<div class="container">
    <h2 class="text-center">Trees & Perennials</h2>
    <table class="table table-hover table-condensed" id="trees">
        <thead>
            <tr class="row">
                <th class="text-center">Date</th>
                <th class="text-center">Product</th>
                <th class="text-center">Company</th>
                <th class="text-center">Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <hr>
</div>
<div class="container">
    <h2 class="text-center">Soil & Fertilizer</h2>
    <table class="table table-hover table-condensed" id="soil">
        <thead>
            <tr class="row">
                <th class="text-center">Date</th>
                <th class="text-center">Product</th>
                <th class="text-center">Company</th>
                <th class="text-center">Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <hr>
</div>
`);
