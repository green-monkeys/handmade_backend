import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {describe} from "mocha";

chai.use(chaiHttp);
chai.should();


describe("payout", () => {

    describe("POST /artisan", () => {
        it("should create a new artisan (for payout tests) and return status code 200 ", (done) => {
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

    describe("POST /payout", () => {
        it("should add payout to created artisan ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .post('/payout')
                        .send({
                            cgaId : 2,
                            artisanId : id,
                            amount : 400
                        }).end((err,res) =>{
                        res.should.have.status(200);
                        done();
                        });
                })
        })
    });

    describe("GET /artisan", () => {
        it("should fail add payout to created artisan because cga DNE", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .post('/payout')
                        .send({
                            cgaId : 1, //should not exist
                            artisanId : id,
                            amount : 400
                        }).end((err,res) =>{
                        res.should.have.status(400);
                        done();
                    });
                })
        })
    });

    describe("GET /artisan", () => {
        it("should add payout to created artisan ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .post('/payout')
                        .send({
                            cgaId : 2,
                            artisanId : id,
                            amount : 500
                        }).end((err,res) =>{
                        res.should.have.status(200);
                        done();
                    });
                })
        })
    });

    describe("GET /artisan", () => {
        it("get payouts artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data["payouts"].length.should.equal(2);
                    res.body.data["payouts"][0]["amount"].should.equal(400);
                    res.body.data["payouts"][0]["paid"].should.equal(false);
                    res.body.data["payouts"][1]["amount"].should.equal(500);
                    res.body.data["payouts"][1]["paid"].should.equal(false);
                    done();
                })
        })
    });



    describe("PATCH /payout", () => {
        it("patch payouts artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["payouts"][0]["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .patch('/payout/' + id)
                        .send({
                            paid : true
                        })
                        .end((err,res)=>{
                            res.body.data["paid"].should.equal(true);
                            done();
                        })
                })
        })
    });

    describe("PATCH /payout", () => {
        it("fail patch payouts artisan by id because payout DNE", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .patch('/payout/' + 1) //should not exist
                        .send({
                            paid : true
                        })
                        .end((err,res)=>{
                            res.should.have.status(400);
                            done();
                        })
                })
        })
    });

    describe("GET /payout", () => {
        it("GET payout by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["payouts"][0]["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/payout/' + id)
                        .end((err,res)=>{
                            res.body.data["id"].should.equal(id);
                            res.should.have.status(200);
                            done();
                        })
                })
        })
    });

    describe("GET /payout", () => {
        it("fail GET payout by id because it doesn't exist ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/payout/' + 1)
                        .end((err,res)=>{
                            res.should.have.status(404);
                            done();
                        })
                })
        })
    });

    describe("GET /payout", () => {
        it("fail GET payout by id because invalid params", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .get('/payout/' + "adsfsa")
                        .end((err,res)=>{
                            res.should.have.status(400);
                            done();
                        })
                })
        })
    });


    describe("DELETE /payout", () => {
        it("delete payout by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    let id = res.body.data["payouts"][0]["id"];
                    res.should.have.status(200);
                    chai.request(app)
                        .delete('/payout/' + id)
                        .end((err,res)=>{
                            res.should.have.status(200);
                            done();
                        })
                })
        })
    });

    describe("DELETE /payout", () => {
        it("should fail delete payout by id because doesn't exist", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .delete('/payout/' + 1) // should not exist
                        .end((err,res)=>{
                            res.body.message.should.equal("Couldn't find payout with id 1.");
                            res.should.have.status(404);
                            done();
                        })
                })
        })
    });

    describe("DELETE /payout", () => {
        it("should fail delete payout by id because invalid param", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app)
                        .delete('/payout/asdfas') // should not exist
                        .end((err,res)=>{
                            res.should.have.status(400);
                            done();
                        })
                })
        })
    });

    describe("GET /artisan", () => {
        it("get payouts artisan by id (only 1 should exist after deleting)", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9000')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data["payouts"].length.should.equal(1);
                    done();
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

});

