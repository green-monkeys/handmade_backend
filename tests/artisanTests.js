import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {describe} from "mocha";

chai.use(chaiHttp);
chai.should();

describe("artisan", () => {
    //will create artisan for this test
    describe("POST /artisan", () => {
        it("should create a new artisan and return status code 200 ", (done) => {
            chai.request(app)
                .post('/artisan')
                .type('form')
                .field("cgaId", 2)
                .field("username", "test_user9000")
                .field("firstName", "test")
                .field("lastName", "user")
                .field("password", "avpoiadf83208")
                .field("phoneNumber", "+15555049082")
                .field("isSmart", false)
                .attach('image' , __dirname + '/hqdefault.jpg')
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                })
        })
    });

    describe("POST /artisan", () => {
        it("should fail creating new artisan and return status code 400 ", (done) => {
            chai.request(app)
                .post('/artisan')
                .type('form')
                .field("cgaId", 2)
                .field("username", "test_user9000")
                .field("firstName", "test")
                .field("lastName", "user")
                .field("password", "avpoiadf83208")
                .field("phoneNumber", "+15555049082")
                .field("isSmart", false)
                .end((err, res) => {
                    res.should.have.status(400);

                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("should verify login for artisan ", (done) => {
            chai.request(app)
                .get('/artisan/login?username=test_user9000&password=avpoiadf83208')
                .end((err, res) => {
                    res.body.data["loginIsValid"].should.equal(true);

                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("should fail at verifying login for artisan ", (done) => {
            chai.request(app)
                .get('/artisan/login?username=test_user9000&password=notThePassword')
                .end((err, res) => {
                    res.body.data["loginIsValid"].should.equal(false);
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("should fail at verifying login for artisan ", (done) => {
            chai.request(app)
                .get('/artisan/login?username=test_user9000&passwordasd=notThePassword')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("should get artisan by username ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.body.data["username"].should.equal('test_user9000');
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("should get artisan by username ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.body.data["username"].should.equal('test_user9000');
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("get artisan by username should fail", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user90asdDOESNTEXIST')
                .end((err, res) => {
                    res.body.message.should.equal("Could not find artisan with username " + "'test_user90asdDOESNTEXIST'.");
                    res.should.have.status(404);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("get artisan by username should fail", (done) => {
            chai.request(app)
                .get('/artisan?usernamaasdfase=test_user9000')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("GET /artisan", () => {
        it("checks if artisan by username exists ", (done) => {
            chai.request(app)
                .get('/artisan/username_exists?username=test_user9000')
                .end((err, res) => {
                    res.body.data["username_exists"].should.equal(true);
                    res.should.have.status(200);
                    done();

                })
        })
    });

    describe("GET /artisan", () => {
        it("fails checks if artisan by username exists ", (done) => {
            chai.request(app)
                .get('/artisan/username_exists?')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();

                })
        })
    });

    describe("GET /artisan", () => {
        it("should get artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/artisan/' + id)
                        .end((err,res)=>{
                            res.should.have.status(200);
                            done();
                        });

                })
        })
    });

    describe("GET /artisan", () => {
        it("should fail get artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/artisan/sfasd' + id)
                        .end((err,res)=>{
                            res.should.have.status(400);
                            done();
                        });

                })
        })
    });

    describe("GET /artisan", () => {
        it("should fail get artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/artisan/' + 1)//should not exist
                        .end((err,res)=>{
                            res.should.have.status(404);
                            done();
                        });

                })
        })
    });

    describe("DELETE /artisan", () => {
        it("delete artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .delete('/artisan/' + id)
                        .end((err,res)=>{
                            res.should.have.status(200);
                            done();
                        });

                })
        })
    });

    describe("DELETE /artisan", () => {
        it("should fail delete artisan by id ", (done) => {
            let failID = 1;
            chai.request(app)
                .delete('/artisan/' + failID) //should not exist
                .end((err,res)=>{
                    res.body.message.should.equal("Could not find artisan with id " + failID);
                    res.should.have.status(404);
                    done();
                });
        })
    });

    describe("DELETE /artisan", () => {
        it("should fail delete artisan by id ", (done) => {
            chai.request(app)
                .delete('/artisan/asd') //should not exist
                .end((err,res)=>{
                    res.should.have.status(400);
                    done();
                });
        })
    });

    //not important
    describe("Get /", () => {
        it("should fail ", (done) => {
            chai.request(app)
                .get('/asd') //should not exist
                .end((err,res)=>{
                    res.should.have.status(404);
                    done();
                });
        })
    });

});
