import client from './DBClient';
import {getImage} from './AWSController';

export async function getArtisan(req, res) {
    const response = await client.query(`SELECT * FROM artisans WHERE id=${req.params.artisanId}`);
    res.status(200).json({
        data: response
    });
}

export async function addArtisan(req, res) {
    const {cgaId, email, firstName, lastName, password, salt, phone, isSmart} = req.body;
    const response = await client.query(`INSERT INTO artisans (cgaid, username, first_name, last_name, password, salt, phone, is_smart) VALUES (${cgaId},'${email}','${firstName}','${lastName}','${password}', '${salt}', '${phone}', ${isSmart})`);
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

export async function getArtisanByEmail(req, res) {
    const {username} = req.query;
    const response = await (`SELECT * FROM artisans WHERE username=${username}`);
    res.status(200).json({
        data: response.rows.length > 0 ? response.rows : null
    });
}

export async function getArtisanImage(req, res) {
    const {username} = req.query;
    getImage(res, 'artisan', `${username}.jpg`);
}
