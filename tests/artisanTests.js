import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {describe} from "mocha";

chai.use(chaiHttp);
chai.should();

describe("artisan", () => {
    //will create cga for this test
    describe("POST /artisan", () => {
        it("should create a new artisan for CGA with id 2 ", (done) => {
            chai.request(app)
                .post('/artisan')
                .send({
                    cgaId: "2",
                    username: "temporaryArtisan@email.com",
                    firstName: "TestFirst",
                    lastName: "CGA",
                    password: "pass",
                    salt: "12345678",
                    phone: "18001231234",
                    isSmart: "true"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /artisan?username=temporaryArtisan@email.com", () => {
        it("get artisan by email ", (done) => {
            chai.request(app)
                .get('/artisan?username=temporaryArtisan@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data["cgaid"].should.equal(2);
                    res.body.data["username"].should.equal('temporaryArtisan@email.com');
                    res.body.data["first_name"].should.equal('TestFirst');
                    res.body.data["last_name"].should.equal('CGA',);
                    res.body.data["password"].should.equal('pass');
                    res.body.data["salt"].should.equal('12345678');
                    res.body.data["phone"].should.equal('18001231234');
                    res.body.data["is_smart"].should.equal(true);
                    done();
                })
        })
    });

    describe("GET /artisan/:artisanId", () => {
        it("get artisan by ID ", (done) => {
            chai.request(app)
                .get('/artisan?username=temporaryArtisan@email.com')
                .end((err, res) => {
                    let id = res.body.data["id"];
                    res.should.have.status(200);
                    res.body.data["cgaid"].should.equal(2);
                    res.body.data["username"].should.equal('temporaryArtisan@email.com');
                    res.body.data["first_name"].should.equal('TestFirst');
                    res.body.data["last_name"].should.equal('CGA',);
                    res.body.data["password"].should.equal('pass');
                    res.body.data["salt"].should.equal('12345678');
                    res.body.data["phone"].should.equal('18001231234');
                    res.body.data["is_smart"].should.equal(true);

                    chai.request(app).get("/artisan/" + id)
                        .end((err,res)=>{
                            res.body.data["cgaid"].should.equal(2);
                            res.body.data["username"].should.equal('temporaryArtisan@email.com');
                            res.body.data["first_name"].should.equal('TestFirst');
                            res.body.data["last_name"].should.equal('CGA',);
                            res.body.data["password"].should.equal('pass');
                            res.body.data["salt"].should.equal('12345678');
                            res.body.data["phone"].should.equal('18001231234');
                            res.body.data["is_smart"].should.equal(true);
                        });
                    done();
                })
        })
    });

/*
    //delete artisan created here
    describe("POST /artisan/image", () => {
        it("should upload image", (done) => {
            chai.request(app)
                .get('/artisan?username=temporaryArtisan@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    let id = res.body.data["id"];
                    let curDir = process.cwd();
                    chai.request(app)
                        .post('/artisan/image?id=' + id)
                        .attach(
                            'image' , curDir + '/tests/testImage.jpg'
                        )
                        .end((err, res) => {
                            res.body['message'].should.equal("Successfully Uploaded!");
                            res.should.have.status(200);

                            done();
                        });
                    done();
                })
        })
    });


    describe("get /artisan/image", () => {
        it("should get image ", (done) => {
            chai.request(app)
                .get('/artisan/image?username=temporaryArtisan@email.com')
                .end((err, res) => {
                    res.body['message'].should.equal("Successfully Uploaded!");
                    res.should.have.status(200);

                    done();
                })
        })
    }); */



    //delete artisan created here
    describe("DELETE /artisan?username=temporaryArtisan@email.com", () => {
        it("should delete artisan ", (done) => {
            chai.request(app)
                .get('/artisan?username=temporaryArtisan@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    let id = res.body.data["id"];

                    chai.request(app)
                        .delete('/artisan/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                        });
                    done();
                })
        })
    })
});