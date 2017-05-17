var $ = require(`jquery`); module.exports = $(`
<div class="col-lg-12 text-center">
    <!--<img class="img-responsive img-border img-full" src="img/slide-1.jpg" alt="">-->
    <h2>New Receipt
        <!--<br><small>October 13, 2013</small>-->
    </h2>
    <form class="form-horizontal" id="new-receipt">
        <!-- class="form-horizonal" not working properly-->
        <!-- All you have to do is to add .form-horizontal class to the <form> element
            and .control-label class to all <label> element. 
            Use Bootstrap’s predefined grid classes to align labels and form controls. -->
        <div id="category">
            <label>Category:</label>
            <!-- switch to drop down menu? -->
            <div class="radio-inline">
                <label><input type="radio" value="seeds" name="category">Seeds</label>
            </div>
            <div class="radio-inline">
                <label><input type="radio" value="soil" name="category">Soil & Fertilizer</label>
            </div>
        </div>
        <!-- need help with datepicker setup -->
        <div class="input-append date form-group" id="datetimepicker" data-date="12-02-2012" data-date-format="dd-mm-yyyy">
            <label>Date:</label>
            <input class="span2" size="16" type="text" value="12-02-2012">
            <span class="add-on"><i class="icon-remove"></i></span>
            <span class="add-on"><i class="icon-th"></i></span>
        </div>
        <div class="form-group">
            <label>Item:</label>
            <input type="text" id="item">
        </div>
        <div class="form-group">
            <label>Quantity:</label>
            <input type="text" id="quantity">
        </div>
        <div class="form-group">
            <label>Company:</label>
            <input type="text" id="company">
        </div>
        <div class="form-group">
            <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
            <div class="input-group">
                <div class="input-group-addon">$</div>
                <input type="text" class="form-control" id="price" placeholder="Amount">
                <div class="input-group-addon">.00</div>
            </div>
        </div>
        <div class="form-group">
            <label>Tags:</label>
            <label><input type="checkbox" name="tags" value="Certified Organic">Certified Organic</label>
        </div>
        <div class="form-group">
            <label>New Tag:</label>
            <input>
        </div>
    </form>
    <a href="#" class="btn btn-default btn-lg" id="submit">Submit</a>
    <hr>
</div>
`);