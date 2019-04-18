import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

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
                    res.body.data[0]["cgaid"].should.equal(2);
                    res.body.data[0]["username"].should.equal('temporaryArtisan@email.com');
                    res.body.data[0]["first_name"].should.equal('TestFirst');
                    res.body.data[0]["last_name"].should.equal('CGA',);
                    res.body.data[0]["password"].should.equal('pass');
                    res.body.data[0]["salt"].should.equal('12345678');
                    res.body.data[0]["phone"].should.equal('18001231234');
                    res.body.data[0]["is_smart"].should.equal(true);
                 //   console.log(res.body.data);
                    done();
                })
        })
    });


    //delete artisan created here
    describe("GET /artisan?username=temporaryArtisan@email.com", () => {
        it("should delete artisan ", (done) => {
            chai.request(app)
                .get('/artisan?username=temporaryArtisan@email.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    let id = res.body.data[0]["id"];

                    //   console.log(res.body.data);
                    chai.request(app)
                        .delete('/artisan/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                        });
                    done();
                })
        })
    });

