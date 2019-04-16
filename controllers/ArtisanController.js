import client from './DBClient';

export async function getArtisan(req, res) {
    const response = await client.query(`SELECT * FROM artisans WHERE id=${req.params.artisanId}`);
    res.status(200).json({
        data: response
    });
}

export async function addArtisan(req, res) {
    const {cgaId, email, firstName, lastName, password, salt} = req.body;
    const response = await client.query(`INSERT INTO artisans (cgaid, email, firstname, lastname, password, salt) VALUES (${cgaId},'${email}','${firstName}','${lastName}','${password}', '${salt}')`);
    res.status(200).json({
        data: response
    });
}

export async function removeArtisan(req, res) {
    const response = await client.query(`DELETE FROM artisans WHERE id=${req.params.artisanId}`);
    res.status(200).json({
        data: response
    });
}