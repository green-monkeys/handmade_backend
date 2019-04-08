import {Client} from 'pg';
import fs from 'fs';
const dbCredentials = JSON.parse(fs.readFileSync("credentials.json"));

let client;
if (process.env.DATABASE_URL) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
} else {
  client = new Client({
    user: "maxwell",
    host: "localhost",
    database: "capstone",
    password: dbCredentials.DB_PASSWORD,
    port: 5432
  });
}

client.connect();

function testQuery(req, res) {
  client.query(
    "SELECT table_schema, table_name FROM information_schema.tables;",
    (err, dbRes) => {
      if (err) throw err;

      rows = [];
      for (let row of dbRes.rows) {
        rows.push(row);
      }
      res.status(200).json({ rows: rows });
      client.end();
    }
  );
}

module.exports = {
  testQuery
};
