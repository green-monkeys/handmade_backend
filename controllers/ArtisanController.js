import client from './DBClient';
import {getImage} from './AWSController';

export async function getArtisan(req, res) {
    const response = await client.query(`SELECT * FROM artisans WHERE id=${req.params.artisanId}`);
    res.status(200).json({
        data: response.rows ? response.rows[0] : null
    });
}

export async function addArtisan(req, res) {
    try {
        const {cgaId, username, firstName, lastName, password, salt, phone, isSmart} = req.body;
        const response = await client.query(`INSERT INTO artisans (cgaid, username, first_name, last_name, password, salt, phone, is_smart) VALUES (${cgaId},'${username}','${firstName}','${lastName}','${password}', '${salt}', '${phone}', ${isSmart})`);
        res.status(200).json({
            data: response
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message})
    }
}

export async function removeArtisan(req, res) {
    const response = await client.query(`DELETE FROM artisans WHERE id=${req.params.artisanId}`);

    res.status(200).json({
        data: response
    });
}

export async function getArtisanByUsername(req, res) {
    const {username} = req.query;
    const response = await client.query(`SELECT * FROM artisans WHERE username='${username}'`);
    res.status(200).json({
        data: response.rows ? response.rows[0] : null
    });
}

export async function getArtisanImage(req, res) {
    const {username} = req.query;
    try {
        const data = await getImage(res, 'artisan', `${username}.jpg`);
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
}

export async function uploadArtisanImage(req, res) {
    res.status(200).json({
        message: "Successfully Uploaded!",
        file: req.file
    })
}
