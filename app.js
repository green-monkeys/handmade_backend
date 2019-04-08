const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");
const mws = require("./mws");

const testRouter = express.Router();
const dbRouter = express.Router();
const mwsRouter = express.Router();

testRouter.get("/", (req, res) => res.send("Hello World!"));
dbRouter.get("/test_db", db.testQuery);
mwsRouter.post("/list_mws_reports", mws.listMWSReports);
mwsRouter.post("/hmac_encode", mws.hmacEncodeRequest);

app.use("/", testRouter);
app.use("/db", dbRouter);
app.use("/mws", mwsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
