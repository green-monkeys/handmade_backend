
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe("cga", () => {
    describe("POST /cga", () => {
        it("should create a new CGA.", (done) => {
            chai.request(app)
                .post('/cga')
                .send({
                    email: "temporary@email.com",
                    firstName: "TestFirst",
                    lastName: "CGA"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //   res.body.data.should.have.keys(["RowCtor", "_parsers", "command", "fields", "oid", "rowAsArray", "rowCount", "rows"]);
                    done();
                })
        })
    });

    describe("GET /cga/artisans?email=temporary@email.com", () => {
        it("should return CGA's artisans.", (done) => {
            chai.request(app)
                .get('/cga/artisans')
                .send({
                    email: "temporary@email.com",
                    firstName: "TestFirst",
                    lastName: "CGA"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    //since we're not adding artisans to account
                    res.body.data.length.should.equal(0);
                    done();
                })
        })
    });

    /*
    describe("GET /cga/image?email=temporary@email.com", () => {
        it("should return CGA's image.", (done) => {
            chai.request(app)
                .get('/cga/image?email=temporary@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    //since we're not adding artisans to account
                    console.log(res.body);
                    done();
                })
        })
    });
*/


    describe("GET /cga?email=temporary@email.com", () => {
        let id;
        it("should get CGA by id.", (done) => {
            chai.request(app)
                .get('/cga?email=temporary@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data['0']['email'].should.equal('temporary@email.com');
                    res.body.data['0']['first_name'].should.equal('TestFirst');
                    res.body.data['0']['last_name'].should.equal('CGA');

                    id = res.body.data['0']['id'];

                    chai.request(app)
                        .get('/cga/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                        });
                    done();
                })
        })
    });



    describe("GET /cga?email=temporary@email.com", () => {
        let id;
        it("should get CGA by email.", (done) => {
            chai.request(app)
                .get('/cga?email=temporary@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data['0']['email'].should.equal('temporary@email.com');
                    res.body.data['0']['first_name'].should.equal('TestFirst');
                    res.body.data['0']['last_name'].should.equal('CGA');

                    id = res.body.data['0']['id'];
                    //DELETE test CGA
                    chai.request(app)
                        .delete('/cga/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                        });
                    done();
                });

        })
    })

});
