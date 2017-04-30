var $ = require('jquery');

module.exports = $(`
<div class="col-lg-12 text-center">
    <!--<img class="img-responsive img-border img-full" src="img/slide-1.jpg" alt="">-->
    <h2>New Receipt
        <!--<br><small>October 13, 2013</small>-->
    </h2>
    <form>
        <div class="input-append date form-group" id="datetimepicker" data-date="12-02-2012" data-date-format="dd-mm-yyyy">
            <label>Date</label>
            <input class="span2" size="16" type="text" value="12-02-2012">
            <span class="add-on"><i class="icon-remove"></i></span>
            <span class="add-on"><i class="icon-th"></i></span>
        </div>
        <div class="form-group">
            <label>Product</label>
            <input>
        </div>
        <div class="form-group">
            <label>Quantity</label>
            <input>
        </div>
        <div class="form-group">
            <label>Company</label>
            <input>
        </div>
        <div class="form-group">
            <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
            <div class="input-group">
                <div class="input-group-addon">$</div>
                <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
                <div class="input-group-addon">.00</div>
            </div>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" value="">Seeds</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" value="">Soil & Fert.</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" value="">Labor</label>
        </div>
        <div class="checkbox">
            <label><input type="checkbox" value="">Certified Organic</label>
        </div>
        <div class="form-group">
            <label>New Tag</label>
            <input>
        </div>
    </form>
    <a href="#" class="btn btn-default btn-lg">Submit</a>
    <hr>
</div>
`);