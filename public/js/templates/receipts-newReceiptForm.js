var $ = require(`jquery`);
module.exports = $(`
<div class="col-lg-12 text-center">
    <h2>New Receipt</h2>
    <!-- form -->
    <form class="form-horizontal new-receipt" id="new-receipt">
        <!-- date -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Date:</label>
            <select class="form-control col-sm-1 date" id="years" required>
                    <option value="">Year</option>
                </select>
            <select class="form-control col-sm-2 date" id="months" required>
                    <option value="">Month</option>
                </select>
            <select class="form-control col-sm-1 date" id="days" required>
                    <option value="">Day</option>
                </select>
        </div>
        <!-- category -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Category:</label>
            <select class="form-control col-sm-4" id="category" required>
                <option value="">Select one</option>
                <option value="seeds">Seeds</option>
                <option value="soil">Soil & Fertilizer</option>
                <option value="trees">Trees & Perrenials</option>
            </select>
        </div>
        <!-- item -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Item:</label>
            <input class="form-control col-sm-4" type="text" placeholder="Required" id="item" required>
        </div>
        <!-- company -->
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Company:</label>
            <input class="form-control col-sm-4" type="text" placeholder="Required" id="company" required>
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
        <div class="form-inline form-group">
            <label class="control-label col-sm-2 col-sm-offset-2">Item tags:</label>
            <div class="col-sm-4" id="form-tags">
                <label><input type="checkbox" name="tags" value="Certified Organic" id="organic-tag">Certified Organic</label><br>
                <label><input type="checkbox" name="tags" value="Certified for Organic Farming" id="organic-farming-tag">Certified for Organic Farming</label><br>
            </div>
            <p class="col-sm-4"></p>
        </div>
        <!-- submit -->
        <button type="submit" class="btn btn-default btn-lg">Submit</button>
    </form>
    <hr>
</div>
`);
