import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {describe} from "mocha";
chai.use(chaiHttp);
chai.should();


describe("reports", () => {

    describe("GET /mws/reports" , ()=> {
        it("regular get reports list", (done) => {
            chai.request(app)
                .get('/mws/reports/report_list')
                .end((err,res) =>{
                    res.should.have.status(200);
                    done();
                });

        })
    });

    describe("GET /mws/reports count" , ()=> {
        it("regular get", (done) => {
            chai.request(app)
                .get('/mws/reports/report_count')
                .end((err,res) =>{
                    res.should.have.status(200);
                    done();
                });

        })
    });

    describe("GET /mws/reports" , ()=> {
        it("regular get specific report", (done) => {
            chai.request(app)
                .get('/mws/reports/report_list')
                .end((err,res) =>{

                    console.log(res.body);
                    let repID = res.body.data[0]["ReportId"];


                    chai.request(app)
                        .get('/mws/reports/' + repID)
                        .end((err,res)=>{
                            res.should.have.status(200);
                            done();
                        });
                    res.should.have.status(200);
                });

        })
    });

    describe("GET /mws/reports" , ()=> {
        it("regular get report pdf", (done) => {
            chai.request(app)
                .get('/mws/reports/report_list')
                .end((err,res) =>{
                    if(res.body.data.length < 1){
                        console.log("got here");
                        done();
                    }

                    let repID = res.body.data[0]["ReportId"];


                    chai.request(app)
                        .get('/mws/reports/pdf/' + repID)
                        .end((err,res)=>{
                            res.should.have.status(200);
                            console.log(res);

                            done();
                        });
                    res.should.have.status(200);
                });

        })
    })
});
