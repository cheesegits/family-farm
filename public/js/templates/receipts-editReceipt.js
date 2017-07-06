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
                <form role="form" id="editForm">
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select name="" id="editCategory">
                            <option value="seeds">Seeds</option>
                            <option value="soil">Soil & Fertilizer</option>
                            <option value="trees">Trees & Perrenials</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <select id="editYear" required></select>
                        <select id="editMonth" required></select>
                        <select id="editDay" required></select>
                    </div>
                    <div class="form-group">
                        <label for="item" required>Item</label>
                        <input type="text" class="form-control" id="editItem" placeholder="Required" required>
                    </div>
                    <div class="form-group">
                        <label for="Company">Company</label>
                        <input type="text" class="form-control" id="editCompany" placeholder="Required" required>
                    </div>
                    <div class="form-group">
                        <label for="Quantity">Quantity</label>
                        <input type="text" class="form-control" id="editQuantity" placeholder="Optional quantity">
                    </div>
                    <div class="form-group">
                        <label for="Price">Price</label>
                        <input type="text" class="form-control" id="editPrice" placeholder="Optional price">
                    </div>
                    <div class="checkbox" id="edit-tags">
                        <label><input type="checkbox" name="tags" value="Certified Organic">Certified Organic</label><br>
                        <label><input type="checkbox" name="tags" value="Certified for Organic Farming">Certified for Organic Farming</label>
                    </div>
                    <button type="submit" class="btn btn-success btn-block" id="editSubmit">Submit</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <button type="submit" class="btn btn-danger btn-default pull-right" data-dismiss="modal" id="deleteItem"><span class="glyphicon glyphicon-remove"></span> Delete</button>
            </div>
        </div>
    </div>
</div>
`);
