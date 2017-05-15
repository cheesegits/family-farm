const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const chaiDateString = require(`chai-date-string`);
const server = require(`../server.js`);
const Receipt = require(`../src/models/item`);

const app = server.app;

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiDateString);

var postId = 'id';

function date() { // for testing only, remove after a datepicker box is added to form submission 
    return new Date();
}

describe(`Receipts`, function() {
    before(function(done) {
        server.runServer(function() {
            Receipt.create({
                category: `seeds`,
                date: date(),
                company: `Seed Savers`,
                item: `Squash`,
                quantity: 5
            });
            Receipt.create({
                category: `seeds`,
                date: date(),
                company: `Seeds of Change`,
                item: `Beans`
            });
            Receipt.create({
                category: `seeds`,
                date: date(),
                company: `Burpee`,
                item: `Corn`,
                price: 3.99
            });
            Receipt.create({
                category: `soil`,
                date: date(),
                company: `Lowe's`,
                item: `Avocado`
            });
            Receipt.create({
                category: `soil`,
                date: date(),
                company: `Home Depot`,
                item: `Compost`
            });
            Receipt.create({
                category: `soil`,
                date: date(),
                company: `Lowe's`,
                item: `Soil`, // cannot create 6 or 8 objects, but can create 7?
                tags: [`Certified Organic`] // can immediately add tags
            });
            Receipt.create({
                category: `soil`,
                date: date(),
                company: `Dr. Earth`,
                item: `Fertilizer`
            });
            done();
        });
    });
    it(`on GET - the data has been populated with temporary documents from before() within server.test.js`, function(done) {
        chai
            .request(app)
            .get(`/receipts`)
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).to.be.an(`array`);
                expect(response.body).length.to.be(7);
                done();
            });
    });
    it(`on GET - all documents in the database have their required keys`, function(done) {
        chai
            .request(app)
            .get(`/receipts`)
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).length.greaterThan(0);
                for (i = 0; i < response.body.length; i++) {
                    expect(response.body[i]).to.have.property(`category`);
                    expect(response.body[i]).to.have.property(`date`);
                    expect(response.body[i]).to.have.property(`item`);
                    expect(response.body[i]).to.have.property(`company`);
                }
                done();
            });
    });
    it(`on GET - those required keys have the correct type of values`, function(done) {
        chai
            .request(app)
            .get(`/receipts`)
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).length.greaterThan(0);
                for (i = 0; i < response.body.length; i++) {
                    expect(response.body[i].category).to.be.a(`string`);
                    expect(response.body[i].date).to.be.a.dateString();
                    expect(response.body[i].company).to.be.a(`string`);
                    expect(response.body[i].item).to.be.a(`string`);
                }
                done();
            });
    });
    it(`on GET - if any optional key/values were included, they also have correct type of values`, function(done) {
        chai
            .request(app)
            .get(`/receipts`)
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).length.greaterThan(0);
                for (i = 0; i < response.body.length; i++) {
                    if (response.body[i].hasOwnProperty(`quantity`)) {
                        expect(response.body[i].quantity).to.be.a(`number`);
                    };
                    if (response.body[i].hasOwnProperty(`price`)) {
                        expect(response.body[i].price).to.be.a(`number`);
                    };
                    if (response.body[i].hasOwnProperty(`tags`)) {
                        expect(response.body[i].tags).to.be.an(`array`);
                    }
                }
                done();
            });
    });
    it(`on POST - a test document was successfully added to the database`, function(done) {
        chai
            .request(app)
            .post(`/receipts`)
            .send({
                category: `seeds`,
                date: `2017-05-03T17:53:27.865Z`,
                item: `Bell Peppers`,
                company: `Seeds of Change`,
                quantity: 12345
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body.date).to.be.a.dateString();
                expect(response.body.quantity).to.equal(12345);
                postId = response.body._id;
                done();
            });
    });
    it(`on PUT - the test document was successfully modified`, function(done) {
        chai
            .request(app)
            .put(`/receipts/` + postId)
            .send({
                _id: postId,
                quantity: 54321
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body._id).to.equal(postId);
                expect(response.body.quantity).to.equal(54321);
                done();
            });
    });
    it(`on DELETE - the recently added object was successfully deleted in the mockData Seeds array`, function(done) {
        chai
            .request(app) // add :id for mongoDB object
            .delete(`/receipts`)
            .send({
                id: 3
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body.seeds).length.to.be(3);
                done();
            });
    });
    after(function(done) {
        Receipt.remove(function() {
            done();
        });
    });
});