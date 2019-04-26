import {emailIsValid} from "./requestHelper";
import {sendData, sendError} from "./responseHelper";
import {deleteImage} from "../util/aws";
import * as db from '../models/cga';

export async function getCGA(req, res) {
    if (!emailIsValid(req.query.email)) {
        sendError(res, 400, `${req.query.email} is not a valid email.`);
        return
    }

    const {email} = req.query;

    const cga = await db.getCGA(email);

    if (cga === null) {
        sendError(res, 404, `Could not find CGA with email ${email}`);
        return
    }

    sendData(res, cga);
}

export async function removeCGA(req, res) {
    if (!emailIsValid(req.query.email)) {
        sendError(res, 400, `${req.query.email} is not a valid email.`);
        return
    }

    const {email} = req.query;

    const cga = await db.removeCGA(email);

    if (cga === null) {
        sendError(res, 404, `Could not find CGA with email ${email}`);
        return
    }

    if (cga.image) {
        await deleteImage(cga.image);
    }

    sendData(res, cga);
}

export async function getArtisansForCGA(req, res) {
    if (!emailIsValid(req.query.email)) {
        sendError(res, 400, `${req.query.email} is not a valid email.`)
    }
    const {email} = req.query;

    const artisans = await db.getArtisansForCGA(email);

    sendData(res, artisans);
}

export async function addCGA(req, res) {
    const {email} = req.body;

    if (!req.file) {
        sendError(res, 400, "Unable to upload image to S3. Are you sure you attached it to the form with a key of 'image'?");
        return
    }

    const image = req.file.location;

    const cga = await db.addCGA({...req.body, image});

    if (cga === null) {
        sendError(res, 409, `A CGA with email ${email} already exists. Please use a different email.`);
        return
    }

    sendData(res, cga);
}
/*
export async function getCGA(req, res) {
    if (!emailIsValid(req.query.email)) {
        sendError(res, 400, `${req.query.email} is not a valid email.`);
        return
    }

    const {email} = req.query;

    const response = await client.query(`SELECT * FROM cgas WHERE email='${email}'`);

    if (response.rowCount === 0) {
        sendError(res, 404, `Could not find CGA with email ${email}`);
        return
    }

    sendData(res, response.rows[0]);
}

export async function removeCGA(req, res) {
    if (!emailIsValid(req.query.email)) {
        sendError(res, 400, `${req.query.email} is not a valid email.`);
        return
    }

    const {email} = req.query;
    const response = await client.query(`SELECT * FROM cgas WHERE email='${email}'`);

    if (response.rowCount === 0) {
        sendError(res, 404, `Could not find CGA with email ${email}`);
        return
    }

    const cga = response.rows[0];

    if (cga.image) {
        await deleteImage(cga.image);
    }

    await client.query(`DELETE FROM cgas WHERE email='${email}'`);

    sendData(res, cga);
}

export async function getArtisansForCGA(req, res) {
    if (!emailIsValid(req.query.email)) {
        sendError(res, 400, `${req.query.email} is not a valid email.`)
    }
    const {email} = req.query;

    const response = await client.query(`SELECT a.* FROM artisans a, cgas c WHERE a.cgaid = c.id AND c.email = '${email}'`);
    if (response.rowCount === 0) {
        sendError(res, 404, `Unable to find any artisans registered under a CGA with email ${email}.`)
        return
    }

    let artisans = [];
    for (let i = 0; i < response.rowCount; i++) {
        const artisan = response.rows[i];
        const owed = await client.query(`SELECT SUM(amount) as owed FROM payouts WHERE artisan = ${artisan.id} AND paid = false`);
        const paid = await client.query(`SELECT SUM(amount) as paid FROM payouts WHERE artisan = ${artisan.id} AND paid = true`);
        artisans.push({
            ...artisan,
            owed: (owed.rowCount > 0) ? owed.rows[0].owed : 0.0,
            paid: (paid.rowCount > 0) ? paid.rows[0].paid : 0.0
        })
    }

    sendData(res, artisans);
}

export async function addCGAUnified(req, res) {
    const {email, firstName, lastName} = req.body;

    if (!req.file) {
        sendError(res, 400, "Unable to upload image to S3. Are you sure you attached it to the form with a key of 'image'?")
    }

    const image = req.file.location;

    const existingUsers = (await client.query(`SELECT * FROM cgas WHERE email='${email}'`)).rowCount;
    if (existingUsers > 0) {
        sendError(res, 409, `A CGA with email ${email} already exists. Please use a different email.`);
        return
    }

    await client.query(`INSERT INTO cgas (first_name, last_name, email, image) VALUES ('${firstName}', '${lastName}', '${email}', '${image}')`);
    const response = (await client.query(`SELECT * FROM cgas WHERE email='${email}'`)).rows[0];

    sendData(res, response);
}
*/
