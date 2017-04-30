var $ = require('jquery');

module.exports = $(`
<div class="col-lg-12 text-center">
    <h2>Seeds
        <br>
    </h2>
    <table class="table table-hover table-condensed" id="seeds">
        <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
        </tr>
    </table>
</div>
<div class="col-lg-12 text-center">
    <h2>Soil & Fert.
        <br>
    </h2>
    <table class="table table-hover table-condensed" id="soil">
        <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
        </tr>
    </table>
    <hr>
</div>
`);