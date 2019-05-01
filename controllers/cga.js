import {sendData, sendError} from "./responseHelper";
import {body, query, validationResult} from 'express-validator/check';
import {deleteImage} from "../util/aws";
import * as db from '../models/cga';
import {query as dbQuery} from '../models/db';

export async function getCGA(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }

    const {email} = req.query;

    const cga = await db.getCGA(email);

    sendData(res, cga);
}

export async function removeCGA(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }

    const {email} = req.query;

    const cga = await db.removeCGA(email);

    if (cga.image) {
        await deleteImage(cga.image);
    }

    sendData(res, cga);
}

export async function getArtisansForCGA(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }
    const {email} = req.query;

    const artisans = await db.getArtisansForCGA(email);

    sendData(res, artisans);
}

export async function addCGA(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }

    if (!req.file) {
        sendError(res, 400, "Unable to upload image to S3. Are you sure you attached it to the form with a key of 'image'?");
        return
    }

    const image = req.file.location;

    const cga = await db.addCGA({...req.body, image});

    sendData(res, cga);
}

export const validate = (method) => {
    switch(method) {
        case 'getCGA':
        case 'removeCGA':
        case 'getArtisansForCGA':
            return [
                query('email')
                    .exists().withMessage("is required")
                    .isEmail().withMessage("must be a valid email address")
                    .customSanitizer(escapeSingleQuotes)
                    .custom(emailDoesNotExist).withMessage("cga with that email not found")
            ];
        case 'addCGA':
            return [
                body('email')
                    .exists().withMessage("is required")
                    .isEmail().withMessage("must be a valid email address")
                    .customSanitizer(escapeSingleQuotes)
                    .custom(emailAlreadyExists).withMessage("email already exists in database"),
                body('firstName')
                    .exists().withMessage("is required")
                    .customSanitizer(escapeSingleQuotes),
                body('lastName')
                    .exists().withMessage("is required")
                    .customSanitizer(escapeSingleQuotes)
            ];
        default:
            return []
    }
};

const emailAlreadyExists = async (email) => {
    const results = await dbQuery(`SELECT * FROM cgas WHERE email='${email}'`);
    if (results.rowCount > 0)
        return Promise.reject();
    return Promise.resolve();
};

const emailDoesNotExist = async(email) => {
    const results = await dbQuery(`SELECT * FROM cgas WHERE email='${email}'`);
    if (results.rowCount > 0)
        return Promise.resolve();
    return Promise.reject();
};

const escapeSingleQuotes = value => value.replace(/'/g, '\'\'');
