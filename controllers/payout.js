import {query} from '../models/db';
import * as payouts from '../models/payout';
import {sendData, sendError} from "./responseHelper";
import {idIsValid} from "./requestHelper";

export async function getPayout(req, res) {
    const {id} = req.params;

    if(!idIsValid(id)) {
        sendError(res, 404, `Incorrect ID format.`);
        return
    }

    const payout = await payouts.getPayout(id);

    if (!payout) {
        sendError(res, 404, `Unable to find payout with id ${id}`);
        return
    }

    sendData(res, payout);
}

export async function addPayout(req, res) {
    const {cgaId, artisanId, amount} = req.body;

    if (!idIsValid(cgaId)) {
        sendError(res, 400, `Invalid CGA ID`);
        return
    }
    if (!idIsValid(artisanId)) {
        sendError(res, 400, `Invalid Artisan ID`);
        return;
    }


    const payout = await payouts.addPayout(cgaId, artisanId, amount);

    if(!payout) {
        sendError(res, 500, `Error inserting payout (${cgaId},${artisanId},${amount})`)
    }

    sendData(res, payout);
}

export async function removePayout(req, res) {
    const {id} = req.params;

    if (!idIsValid(id)) {
        sendError(res, 400, `Invalid ID Format`);
        return
    }

    const payout = await payouts.removePayout(id);

    if (!payout) {
        sendError(res, 404, `Couldn't find payout with id ${id}.`);
        return
    }

    sendData(res, payout);
}
