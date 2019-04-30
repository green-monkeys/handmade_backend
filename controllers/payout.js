import {query} from '../models/db';
import * as payouts from '../models/payout';
import {sendData, sendError} from "./responseHelper";

export async function getPayout(req, res) {
    const {id} = req.params;

    const payout = await payouts.getPayout(id);

    if (!payout) {
        sendError(res, 404, `Unable to find payout with id ${id}`);
        return
    }

    sendData(res, payout);
}

export async function addPayout(req, res) {
    const {cgaId, artisanId, amount} = req.body;

    const payout = await payouts.addPayout(cgaId, artisanId, amount);

    if(!payout) {
        sendError(res, 500, `Error inserting payout (${cgaId},${artisanId},${amount})`)
    }

    sendData(res, payout);
}

export async function removePayout(req, res) {
    const {id} = req.params;

    const payout = await payouts.removePayout(id);

    if (!payout) {
        sendError(res, 404, `Couldn't find payout with id ${id}.`);
        return
    }

    sendData(res, payout);
}
