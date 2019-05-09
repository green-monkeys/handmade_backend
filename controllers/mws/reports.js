import * as reports from '../../models/mws/reports';
import {param, validationResult} from 'express-validator/check'
import {sendData, sendError, sendPDF} from "../responseHelper";

export async function getReport(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }

    const {id} = req.params;

    const report = await reports.getReport(id);

    sendData(res, report)
}

export async function getReportPDF(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }

    const {id} = req.params;

    const doc = await reports.getReportPDF(id);

    sendPDF(res, doc)
}

export async function getReportCount(req, res) {
    const count = await reports.getReportCount();

    if (!count) {
        sendError(res, 500, "Unable to retrieve report count.")
    }

    sendData(res, {count})
}

export async function getReportList(req, res) {
    const reportList = await reports.getReportList();

    if (!reportList) {
        sendData(res, [])
    }

    sendData(res, reportList)
}

export const validate = (method) => {
    switch(method) {
        case 'getReport':
        case 'getReportPDF':
            return [
                param('id')
                    .exists().withMessage("is required")
                    .isInt().withMessage("must be int")
            ];
        default:
            return [];
    }
};
