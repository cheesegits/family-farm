const chai = require(`chai`);
const chaiHttp = require(`chai-http`);
const chaiDateString = require(`chai-date-string`);
const server = require(`../server.js`);
const Receipt = require(`../src/models/item`);

const app = server.app;

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiDateString);

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
    it(`on GET - the data has been populated with temporary data from before() within server.test.js`, function(done) {
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
    it(`on GET - all objects within those arrays have the required keys`, function(done) {
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
    it(`on POST - object successfully added to mockData Seeds array`, function(done) {
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
                // when testing mongoDB make sure to return and save recently created object /id
                done();
            });
    });
    it(`on PUT - the recently added object was successfully modified in the mockData Seeds array`, function(done) {
        chai
            .request(app) // add :id for mongoDB object
            .put(`/receipts`)
            .send({
                id: 3, // based on pushing to mockData for development, change to mongoDB id when server is running
                category: `seeds`,
                quantity: 54321
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body.seeds).length.greaterThan(3);
                if (response.body.seeds[3].quantity === 54321) { // when mongoDB is configured, switch to a function that targets the object id created by POST above
                    expect(response.body.seeds[3].date).to.be.a.dateString(); // when mongoDB is configured, change 3 to object id and to check equality of deep property
                    expect(response.body.seeds[3].quantity).to.equal(54321); // when mongoDB is configured, change 3 to object id and to check equality of deep property
                }
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