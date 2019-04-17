import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();
describe("index", () => {
    describe("GET /", () => {
        it("should return an object.", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

/*
describe("cga", () => {
    describe("POST /cga", () => {
        it("should create a new CGA.", (done) => {
            chai.request(app)
                .request(app)
                .post('/cga')
                .send({
                    email: "testing_new_cga5@email.com",
                    firstName: "Testing New5",
                    lastName: "CGA"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.have.keys(["RowCtor", "_parsers", "command", "fields", "oid", "rowAsArray", "rowCount", "rows"]);
                    done();
                })
        })
    })
});
*/