const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

function testQuery(req, res) {
  client.query(
    "SELECT table_schema, table_name FROM information_schema.tables;",
    (err, dbRes) => {
      if (err) throw err;

      rows = [];
      for (let row of dbRes.rows) {
        rows += JSON.stringify(row);
      }
      res.send(JSON.stringify(rows));
      client.end();
    }
  );
}

module.exports = {
  testQuery
};
