import client from './DBClient';
import {getImage} from './AWSController';

export async function getCGA(req, res) {
    const response = await client.query(`SELECT * FROM cgas WHERE id=${req.params.cgaId}`);
    res.status(200).json({
        data: response.rows ? response.rows : null
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
    console.log(`SELECT * FROM cgas WHERE email='${email}'`);
    const response = await client.query(`SELECT * FROM cgas WHERE email='${email}'`);
    res.status(200).json({
        data: response.rows ? response.rows : null
    });
}

export async function getArtisansForCGA(req, res) {
    const {email} = req.query;
    try {
        const response = await client.query(`SELECT a.* FROM artisans a, cgas c WHERE a.cgaid=c.id AND c.email='${email}'`);
        res.status(200).json({
            data: response.rows ? response.rows : null
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: e
        })
    }
}

export async function uploadCGAImage(req, res) {
    res.status(200).json({
        message: "Successfully Uploaded!",
        file: req.file
    })
}

export async function getCGAImage(req, res) {
    const {email} = req.query;
    try {
        const data = await getImage(res, 'cga', `${email}.jpg`);
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    } catch (e) {
        console.error(e);
        res.status(500).json({message: e.message});
    }
}
