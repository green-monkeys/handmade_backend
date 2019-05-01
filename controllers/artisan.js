import {deleteImage} from '../util/aws';
import {sendData, sendError} from "./responseHelper";
import {body, query, param, validationResult} from 'express-validator/check';
import {query as dbQuery} from '../models/db';
import * as db from '../models/artisan';

export async function getArtisan(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sendError(res, 400, errors.array());
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
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
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
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return
    }

    if (!req.file) {
        sendError(res, 400, {
            location: "body",
            param: "file",
            value: "null",
            msg: "could not upload file to s3. are you sure you attached it in the form data?"
        });
        return
    }

    const image = req.file.location;

    const artisan = await db.addArtisan({...req.body, image});

    if (artisan === null) {
        sendError(res, 409, `A user with username ${req.body.username} already exists. Please pick another username.`);
        return;
    }

    sendData(res, artisan);
}

export async function usernameExists(req, res) {
    const {username} = req.query;

    if (!username) {
        sendError(res, 400, "Invalid username. You need to provide the username as a flag in the query parameters.");
        return
    }


    const usernameExists = await db.usernameExists(username);

    sendData(res, {username_exists: usernameExists})
}

export const validate = (method) => {
    switch(method) {
        case 'usernameExists':
            return [
                query('username')
                    .exists().withMessage("is required")
                    .isLength({min: 1}).withMessage("must be at least 1 character long")
                    .customSanitizer(escapeSingleQuotes),
            ];
        case 'addArtisan':
            return [
                body('cgaId')
                    .exists().withMessage("is required")
                    .isInt().withMessage("must be int"),
                body('username')
                    .exists().withMessage("is required")
                    .isLength({min: 1}).withMessage("must be at least 1 character long")
                    .customSanitizer(escapeSingleQuotes)
                    .custom(usernameAlreadyExists).withMessage("already exists in database"),
                body('firstName')
                    .exists().withMessage("is required")
                    .customSanitizer(escapeSingleQuotes),
                body('lastName')
                    .exists().withMessage("is required")
                    .customSanitizer(escapeSingleQuotes),
                body('password')
                    .exists().withMessage("is required")
                    .customSanitizer(escapeSingleQuotes),
                body('phoneNumber')
                    .exists().withMessage("is required")
                    .customSanitizer(escapeSingleQuotes),
                body('isSmart')
                    .exists().withMessage("is required")
                    .isBoolean().withMessage("must be boolean")
            ];
        case 'removeArtisan':
        case 'getArtisan':
            return [
                param('id').exists().isInt()
            ];
        default:
            return []
    }
};

const usernameAlreadyExists = async (username) => {
    const results = await dbQuery(`SELECT * FROM artisans WHERE username='${username}'`);
    if (results.rowCount > 0)
        return Promise.reject();
    return Promise.resolve();
};
const escapeSingleQuotes = value => value.replace(/'/g, '\'\'');
