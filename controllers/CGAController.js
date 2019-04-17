import client from './DBClient';

export async function getCGA(req, res) {
    const response = await client.query(`SELECT * FROM cgas WHERE id=${req.params.cgaId}`);
    res.status(200).json({
        data: response.rows.length > 0 ? response.rows[0] : null
    });
}

export async function addCGA(req, res) {
    const {email, firstName, lastName} = req.body;
    const response = await client.query(`INSERT INTO cgas (email, first_name, last_name) VALUES ('${email}','${firstName}','${lastName}')`);
    res.status(200).json({
        data: response
    });
}

export async function removeCGA(req, res) {
    const response = await client.query(`DELETE FROM cgas WHERE id=${req.params.cgaId}`);
    res.status(200).json({
        data: response
    });
}

export async function getCGAByEmail(req, res) {
    const {email} = req.query;
    const response = await client.query(`SELECT * FROM cgas WHERE email='${email}'`);
    res.status(200).json({
        data: response.rows.length > 0 ? response.rows : null
    });
}

export async function getArtisansForCGA(req, res) {
    const {email} = req.query;
    try {
        const response = await client.query(`SELECT a.* FROM artisans a, cgas c WHERE a.cgaid=c.id AND c.email='${email}'`);
        res.status(200).json({
            data: response.rows.length > 0 ? response.rows : null
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            error: e
        })
    }
}
