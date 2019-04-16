import client from './DBClient';

export async function getCGA(req, res) {
    const response = await client.query(`SELECT * FROM cga WHERE id=${req.params.cgaId}`);
    res.status(200).json({
        data: response.rows.length > 0 ? response.rows[0] : null
    });
}

export async function addCGA(req, res) {
    const {email, firstName, lastName} = req.body;
    const response = await client.query(`INSERT INTO cga (email, firstname, lastname) VALUES ('${email}','${firstName}','${lastName}')`);
    res.status(200).json({
        data: response
    });
}

export async function removeCGA(req, res) {
    const response = await client.query(`DELETE FROM cga WHERE id=${req.params.cgaId}`);
    res.status(200).json({
        data: response
    });
}
