import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {describe} from "mocha";

chai.use(chaiHttp);
chai.should();

describe("cga", () => {

    describe("POST /cga", () => {
        it("should fail creating a new cga and return status code 400 (no pic)", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","testCGAemail@email.com")
                .field("firstName", "test")
                .field("lastName", "user")
                .end((err, res) => {
                    res.body.message.should.equal("Unable to upload image to S3. Are you sure you attached it to the form with a key of 'image'?");
                    res.should.have.status(400);

                    done();
                })
        })
    });

    //will create cga for this test
    describe("POST /cga", () => {
        it("should create a new cga and return status code 200 ", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","testCGAemail@email.com")
                .field("firstName", "test")
                .field("lastName", "user")
                .attach('image' , __dirname + '/hqdefault.jpg')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });




    describe("POST /cga", () => {
        it("should fail creating a new cga and return status code 200 ", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","testCGAemail@email.com")
                .field("firstName", "test")
                .field("lastName", "user")
                .attach('image' , __dirname + '/hqdefault.jpg')
                .end((err, res) => {
                    res.should.have.status(400);

                    done();
                })
        })
    });
    describe("POST /cga", () => {
        it("should fail creating a new cga and return status code 400 ", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","")
                .field("firstName", "test")
                .field("lastName", "user")
                .attach('image' , __dirname + '/hqdefault.jpg')
                .end((err, res) => {
                    res.should.have.status(400);

                    done();
                })
        })
    });

    describe("POST /cga", () => {
        it("should fail creating a new cga and return status code 400 ", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","testCGAemail@email.com")
                .field("firstName", "")
                .field("lastName", "user")
                .attach('image' , __dirname + '/hqdefault.jpg')
                .end((err, res) => {
                    res.should.have.status(400);

                    done();
                })
        })
    });

    describe("POST /cga", () => {
        it("should fail creating a new cga and return status code 400 ", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","testCGAemail@email.com")
                .field("firstName", "bob")
                .field("lastName", "")
                .attach('image' , __dirname + '/hqdefault.jpg')
                .end((err, res) => {
                    res.should.have.status(400);

                    done();
                })
        })
    });

    describe("POST /cga", () => {
        it("should fail creating a new cga and return status code 400 ", (done) => {
            chai.request(app)
                .post('/cga')
                .type('form')
                .field("email","testCGAemail@email.com")
                .field("firstName", "bob")
                .field("lastName", "joe")
                .end((err, res) => {
                    res.should.have.status(400);

                    done();
                })
        })
    });



    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga?email=testCGAemail@email.com')
                .end((err, res) => {
                    res.body.data["email"].should.equal("testCGAemail@email.com");
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /cga", () => {
        it("should get cga by email and create new artisan for it", (done) => {
            chai.request(app)
                .get('/cga?email=testCGAemail@email.com')
                .end((err, res) => {
                    res.body.data["email"].should.equal("testCGAemail@email.com");
                    let id = res.body.data["id"];
                    chai.request(app)
                        .post('/artisan')
                        .type('form')
                        .field("cgaId", id)
                        .field("username", "test_user9001")
                        .field("firstName", "test")
                        .field("lastName", "user")
                        .field("password", "avpoiadf83208")
                        .field("phoneNumber", "+15555049082")
                        .field("isSmart", false)
                        .attach('image' , __dirname + '/hqdefault.jpg')
                        .end((err, res) => {
                            res.should.have.status(200);

                            done();
                        });
                    res.should.have.status(200);
                })
        })
    });



    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga?username=testCGAemail@email.com')
                .end((err, res) => {

                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga?email=')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga?email=notAnEmail@email.com')
                .end((err, res) => {
                    res.body.message[0]["msg"].should.equal('cga with that email not found');
                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga?email=notAnEmail@email.com')
                .end((err, res) => {
                    res.body.message[0]["msg"].should.equal('cga with that email not found');
                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga/artisans?email=testCGAemail@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("GET /cga", () => {
        it("should get cga by email", (done) => {
            chai.request(app)
                .get('/cga/artisans?email=')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    });

    describe("DELETE /artisan", () => {
        it("delete artisan by id ", (done) => {
            chai.request(app)
                .get('/artisan?username=test_user9001')
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
    describe("DELETE /cga", () => {
        it("delete cga by email ", (done) => {
            chai.request(app)
                .delete('/cga?email=testCGAemail@email.com')
                .end((err, res) => {
                   res.should.have.status(200);
                   done();
                })
        })
    });



    describe("DELETE /cga", () => {
        it("should fail delete cga by email ", (done) => {
            chai.request(app)
                .delete('/cga?email=') //should not exist
                .end((err,res)=>{
                    res.should.have.status(400);
                    done();
                });
        })
    });
});
