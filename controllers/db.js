import pool from "../models/db";

pool.connect();

function testQuery(req, res) {
    pool.query(
        "SELECT table_schema, table_name FROM information_schema.tables;",
        (err, dbRes) => {
            if (err) throw err;

            let rows = [];
            for (let row of dbRes.rows) {
                rows.push(row);
            }
            res.status(200).json({rows: rows});
            pool.end();
        }
    );
}

module.exports = {
    testQuery
};
