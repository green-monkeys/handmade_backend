import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


chai.use(chaiHttp);
chai.should();

describe("db", () => {
    describe("GET /db/test_db", () => {
        it("run test db function", (done) => {
            chai.request(app)
                .get('/db/test_db')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })


});
