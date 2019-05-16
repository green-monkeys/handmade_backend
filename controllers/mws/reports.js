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

    try {
        const report = await reports.getReport(id);

        sendData(res, report)
    } catch (e) {
        if (e.message === 'Rate Limit Exceeded') {
            sendError(res, 429, 'Rate Limit Exceeded')
        }
        sendError(res, 500, `Error: ${e.message}`)
    }
}

export async function getReportPDF(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        sendError(res, 400, errors.array());
        return;
    }

    const {id} = req.params;

    try {
        const doc = await reports.getReportPDF(id);

        sendPDF(res, doc)
    } catch (e) {
        if (e.message === 'Rate Limit Exceeded') {
            sendError(res, 429, 'Rate Limit Exceeded')
        }
        sendError(res, 500, `Error: ${e.message}`)
    }
}

export async function getReportCount(req, res) {
    try {
        const count = await reports.getReportCount();

        if (!count) {
            sendError(res, 500, "Unable to retrieve report count.")
        }

        sendData(res, {count})
    } catch (e) {
        if (e.message === 'Rate Limit Exceeded') {
            sendError(res, 429, 'Rate Limit Exceeded')
        }
        sendError(res, 500, `Error: ${e.message}`)
    }
}

export async function getReportList(req, res) {
    try {
        const reportList = await reports.getReportList();

        if (!reportList) {
            sendData(res, [])
        }

        sendData(res, reportList)
    } catch (e) {
        if (e.message === 'Rate Limit Exceeded') {
            sendError(res, 429, 'Rate Limit Exceeded')
        }
        sendError(res, 500, `Error: ${e.message}`)
    }
}

export const validate = (method) => {
    switch(method) {
        case 'getReport':
        case 'getReportPDF':
            return [
                param('id')
                    .exists().withMessage("is required")
                    .isInt().withMessage("must be int")
                    .customSanitizer(escapeSingleQuotes)
                    //.custom(reportExists).withMessage("report id not valid")
            ];
        default:
            return [];
    }
};

const reportExists = async (reportId) => {
    const reportList = await reports.getReportList();
    if (!reportList.map(report => report.ReportId).includes(reportId)) {
        return Promise.reject();
    }
    return Promise.resolve();
};
const escapeSingleQuotes = value => value.replace(/'/g, '\'\'');
