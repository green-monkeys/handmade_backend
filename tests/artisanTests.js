import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

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
                    email: "temporaryArtisan@email.com",
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
                    console.log(res.body.data);
                    done();
                })
        })
    })
});
