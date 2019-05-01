import * as payouts from '../models/payout';
import {body, param, validationResult} from 'express-validator/check';
import {sendData, sendError} from "./responseHelper";

export async function getPayout(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return
    }
    const {id} = req.params;

    const payout = await payouts.getPayout(id);

    if (!payout) {
        sendError(res, 404, `Unable to find payout with id ${id}`);
        return
    }

    sendData(res, payout);
}

export async function addPayout(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return
    }

    const {cgaId, artisanId, amount} = req.body;

    const payout = await payouts.addPayout(cgaId, artisanId, amount);

    if (!payout) {
        sendError(res, 500, `Error inserting payout (${cgaId},${artisanId},${amount})`);
        return
    }

    sendData(res, payout);
}

export async function removePayout(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return
    }

    const {id} = req.params;

    const payout = await payouts.removePayout(id);

    if (!payout) {
        sendError(res, 404, `Couldn't find payout with id ${id}.`);
        return
    }

    sendData(res, payout);
}

export const validate = (method) => {
    switch (method) {
        case 'getPayout':
        case 'removePayout':
            return [
                param('id')
                    .exists().withMessage("is required")
                    .isInt().withMessage("must be int")
            ];
        case 'addPayout':
            return [
                body('cgaId')
                    .exists().withMessage("is required")
                    .isInt().withMessage("must be int"),
                body('artisanId')
                    .exists().withMessage("is required")
                    .isInt().withMessage("must be int"),
                body('amount')
                    .exists().withMessage("is required")
                    .isFloat().withMessage("must be float")
            ];
        default:
            return []
    }
};
