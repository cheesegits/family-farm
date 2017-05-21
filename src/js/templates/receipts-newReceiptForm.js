var $ = require(`jquery`); module.exports = $(`
<div class="col-lg-12 text-center">
    <h2>New Receipt</h2>
    <!-- form -->
    <form class="form-horizontal" id="new-receipt">
        <!-- date -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Date:</label>
            <select class="form-control col-sm-1 date required" id="years">
                    <option value="">Year</option>
                </select>
            <select class="form-control col-sm-1 date required" id="months">
                    <option value="">Month</option>
                </select>
            <select class="form-control col-sm-1 date required" id="days">
                    <option value="">Day</option>
                </select>
            <small class="col-sm-5 text-left required"><i>(required)</i></small>
        </div>
        <!-- category -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Category:</label>
            <select class="form-control col-sm-4 required" id="category">
            <option value="">Select</option>
            <option value="seeds">Seeds</option>
            <option value="soil">Soil & Fertilizer</option>
            </select>
            <small class="col-sm-4 text-left required"><i>(required)</i></small>
        </div>
        <!-- item -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Item:</label>
            <input class="form-control col-sm-4 required" type="text" id="item">
            <small class="col-sm-4 text-left required"><i>(required)</i></small>
        </div>
        <!-- company -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Company:</label>
            <input class="form-control col-sm-4 required" type="text" id="company">
            <small class="col-sm-4 text-left required"><i>(required)</i></small>
        </div>
        <!-- quantity -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Quantity:</label>
            <input class="form-control col-sm-4" type="number" id="quantity">
            <p class="col-sm-4"></p>
        </div>
        <!-- amount -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2" for="exampleInputAmount">Amount:</label>
            <div class="input-group col-sm-4">
                <div class="input-group-addon">$</div>
                <input type="number" class="form-control" id="price" placeholder="Dollars">
                <div class="input-group-addon">.00</div>
            </div>
            <p class="col-sm-4"></p>
        </div>
        <!-- tags -->
        <div class="form-inline form-group form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Tags:</label>
            <div class="col-sm-4">
                <label><input type="checkbox" name="tags" value="Certified Organic">Certified Organic</label>
            </div>
            <p class="col-sm-4"></p>
        </div>
        <!-- new tag -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">New Tag:</label>
            <input class="form-control col-sm-4">
        </div>
    </form>
    <!-- submit -->
    <a href="#" class="btn btn-default btn-lg" id="submit">Submit</a>
    <hr>
</div>
`);