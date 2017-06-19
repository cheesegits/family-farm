// https://www.w3schools.com/code/tryit.asp?filename=FGONF6XWNNAT

var $ = require(`jquery`);
module.exports = $(`
<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header" style="padding:35px 50px;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4>Edit Receipt</h4>
            </div>
            <div class="modal-body" style="padding:40px 50px;">
                <form role="form">
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select name="" id="editCategory">
                            <option value="currentCategory">populate default by _id</option>
                            <option value="seeds">Seeds</option>
                            <option value="soil">Soil & Fertilizer</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <select id="editYear">
                            <option value="currentYear">populate default year by _id</option>
                            <option value="-10Years">populate extra years by date function</option>
                        </select>
                        <select id="editMonth">
                            <option value="currentMonth">populate default month by _id</option>
                            <option value="12months">remove this option, populate twelve months by date function</option>
                        </select>
                        <select id="editDay">
                            <option value="currentDay">populate default month by _id</option>
                            <option value="dayFunction">remove this option, populate days based on year/month</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="item">Item</label>
                        <input type="text" class="form-control" id="editItem" placeholder="Populate receipt item from _id">
                    </div>
                    <div class="form-group">
                        <label for="Company">Company</label>
                        <input type="text" class="form-control" id="editCompany" placeholder="Populate receipt company from _id">
                    </div>
                    <div class="checkbox">
                        <label><input type="checkbox" value="organic" checked>Organic, Populate checkbox from _id</label>
                    </div>
                    <button type="submit" class="btn btn-success btn-block">Submit</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
            </div>
        </div>
    </div>
</div>
`);
