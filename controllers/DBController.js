import client from "./DBClient";

client.connect();

function testQuery(req, res) {
    client.query(
        "SELECT table_schema, table_name FROM information_schema.tables;",
        (err, dbRes) => {
            if (err) throw err;

            let rows = [];
            for (let row of dbRes.rows) {
                rows.push(row);
            }
            res.status(200).json({rows: rows});
            client.end();
        }
    );
}

module.exports = {
    testQuery
};
