import {deleteImage} from '../util/aws';
import {sendData, sendError} from "./responseHelper";
import {idIsValid} from "./requestHelper";
import * as db from '../models/artisan';

export async function getArtisan(req, res) {
    if (!idIsValid(req.params.id)) {
        sendError(res, 400, `${req.params.id} is not an integer. Please provide an integer value for artisan ID.`);
        return
    }

    const id = parseInt(req.params.id);

    const artisan = await db.getArtisan(id);

    if (artisan === null) {
        sendError(res, 404, `Could not find artisan with id ${id}`);
        return
    }

    sendData(res, artisan);
}

export async function removeArtisan(req, res) {
    if (!idIsValid(req.params.id)) {
        sendError(res, 400, `${req.params.id} is not an integer. Please provide an integer value for artisan ID.`);
        return
    }

    const id = parseInt(req.params.id);

    const artisan = await db.removeArtisan(id);

    if (!artisan) {
        sendError(res, 404, `Could not find artisan with id ${id}`);
        return
    }

    if (artisan.image) {
        await deleteImage(artisan.image);
    }

    sendData(res, artisan);
}

export async function addArtisan(req, res) {
    const {username} = req.body;

    if (username.length === 0) {
        sendError(res, 400, "Invalid username. Username must be greater than 0 characters in length. The bar is set very low. Do better. Be ashamed of yourself.");
        return
    }

    if (!req.file) {
        sendError(res, 400, "Unable to upload image to S3. Are you sure you attached it to the form with a key of 'image'? Artisan was not added to database.");
        return
    }

    const image = req.file.location;

    const artisan = await db.addArtisan({...req.body, image});

    if (artisan === null) {
        sendError(res, 409, `A user with username ${username} already exists. Please pick another username.`);
        return;
    }

    sendData(res, artisan);
}
/*
export async function getArtisan(req, res) {
    if (!idIsValid(req.params.id)) {
        sendError(res, 400, `${req.params.id} is not an integer. Please provide an integer value for artisan ID.`);
        return
    }

    const id = parseInt(req.params.id);

    const response = await client.query(`SELECT * FROM artisans WHERE id=${id}`);

    if (response.rowCount === 0) {
        sendError(res, 404, `Could not find artisan with id ${id}`);
        return
    }

    sendData(res, response.rows[0]);
}

export async function removeArtisan(req, res) {
    if (!idIsValid(req.params.id)) {
        sendError(res, 400, `${req.params.id} is not an integer. Please provide an integer value for artisan ID.`);
        return
    }

    const id = parseInt(req.params.id);
    const response = await client.query(`SELECT * FROM artisans WHERE id=${id}`);

    if (response.rowCount === 0) {
        sendError(res, 404, `Could not find artisan with id ${id}`);
        return
    }

    const artisan = response.rows[0];

    if (artisan.image) {
        await deleteImage(artisan.image);
    }

    await client.query(`DELETE FROM artisans WHERE id=${id}`);

    sendData(res, artisan);
}

export async function addArtisan(req, res) {
    const {cgaId, username, firstName, lastName, password, salt, phoneNumber, isSmart} = req.body;

    if (!req.file) {
        sendError(res, 400, "Unable to upload image to S3. Are you sure you attached it to the form with a key of 'image'?")
    }

    const image = req.file.location;

    const existingUsers = (await client.query(`SELECT * FROM artisans WHERE username='${username}'`)).rowCount;
    if (existingUsers > 0) {
        sendError(res, 409, `A user with username ${username} already exists. Please pick another username.`)
        return
    }

    await client.query(`INSERT INTO artisans (cgaid, username, first_name, last_name, password, salt, phone, is_smart, image) VALUES (${cgaId}, '${username}', '${firstName}', '${lastName}', '${password}', '${salt}', '${phoneNumber}', ${isSmart}, '${image}')`);
    const response = (await client.query(`SELECT * FROM artisans WHERE username='${username}'`)).rows[0];

    sendData(res, response);
}
*/
