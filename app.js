const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/test_db", db.testQuery);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
