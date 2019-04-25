import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {describe} from "mocha";

chai.use(chaiHttp);
chai.should();


describe("payout", () => {

    describe("GET /payout" , ()=> {
        it("regular get", (done) => {
            chai.request(app)
                .get('/payout/7')
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.data["rowCount"].should.equal(1);
                    done();
                });

        })
    })

    describe("GET /payout" , ()=> {
        it("regular get", (done) => {
            chai.request(app)
                .get('/payout/id')
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.data["rowCount"].should.equal(0);
                    done();
                });

        })
    })

    describe("POST /payout" , ()=> {
        it("should add payout to artisan with username  test_artisan@email.com", (done) => {
            chai.request(app)
                .post('/payout')
                .send({
                    cgaId : 2,
                    artisanId : 3,
                    amount : 400
                }).end((err,res) =>{
                res.should.have.status(200);
                done();
            });

        })
    })

})

