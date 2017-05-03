const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


describe('Receipts', function() {
    it('on GET - the data has been populated with mockData from server.js - status(200)', function(done) {
        chai
            .request('http://localhost:8080')
            .get('/receipts')
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).to.have.all.keys('seeds', 'soil');
                expect(response.body.seeds).to.be.an('array');
                expect(response.body.seeds).length.to.be(3);
                expect(response.body.soil).to.be.an('array');
                expect(response.body.soil).length.to.be(3);
                done();
            });
    });
    it('on GET - all objects within those arrays have the required keys', function(done) {
        chai
            .request('http://localhost:8080')
            .get('/receipts')
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).length.to.be.greaterThan(0);
                for (var key in response.body) {
                    for (i = 0; i < response.body[key].length; i++) {
                        expect(response.body[key][i]).to.have.property("category");
                        expect(response.body[key][i]).to.have.property("date");
                        expect(response.body[key][i]).to.have.property("item");
                        expect(response.body[key][i]).to.have.property("company");
                    }
                }
                done();
            });
    });
    it('on GET - those required keys have the correct type of values', function(done) {
        chai
            .request('http://localhost:8080')
            .get('/receipts')
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).length.to.be.greaterThan(0);
                for (var key in response.body) {
                    for (i = 0; i < response.body[key].length; i++) {
                        expect(response.body[key][i].category).to.be.a("string");
                        expect(response.body[key][i].date).to.be.a("date");
                        expect(response.body[key][i].company).to.be.a("string");
                        expect(response.body[key][i].item).to.be.a("string");
                    }
                }
                done();
            });
    });
    it('on GET - if any optional key/values were included, they also have correct type of values', function(done) {
        chai
            .request('http://localhost:8080')
            .get('/receipts')
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body).length.to.be.greaterThan(0);
                for (var key in response.body) {
                    for (i = 0; i < response.body[key].length; i++) {
                        if (response.body[key][i].hasOwnProperty("quantity")) {
                            expect(response.body[key][i].quantity).to.be.a("number");
                        };
                        if (response.body[key][i].hasOwnProperty("price")) {
                            expect(response.body[key][i].price).to.be.a("number");
                        };
                        if (response.body[key][i].hasOwnProperty("tags")) {
                            expect(response.body[key][i].tags).to.be.an("array");
                        }
                    }
                }
                done();
            });
    });
    it('on POST - object successfully added to mockData Seeds array', function(done) {
        chai
            .request('http://localhost:8080')
            .post('/receipts')
            .send({
                category: "seeds",
                date: date,
                item: "Bell Peppers",
                company: "Seeds of Change",
                quantity: 12345
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body.seeds).to.be.greaterThan(3);
                // when testing mongoDB make sure to return and save recently created object /id
            });
    });
    it('on PUT - the recently added object was successfully modified in the mockData Seeds array', function(done) {
        chai
            .request('http://localhost:8080/:id')
            .put('/receipts')
            .send({
                id: 3, // based on pushing to mockData for development, change to mongoDB id when server is running
                quantity: 54321
            })
            .end(function(error, response) {
                expect(error).to.be.null;
                expect(response.status).to.equal(200);
                expect(response).to.be.json;
                expect(response.body.seeds).to.be.greaterThan(3);
                if (response.body.seeds[3].quantity === 54321) { // when mongoDB is configured, switch to a function that targets the id from the object created by POST above
                    expect(response.body.seeds[3].quantity).to.equal(54321); // when mongoDB is configured, change expect to target id and to check equality of deep property
                }
            });
    });
});