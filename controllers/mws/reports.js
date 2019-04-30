import * as reports from '../../models/mws/reports';
import {sendData, sendError} from "../responseHelper";

export async function getReport(req, res) {
    const {id} = req.params;

    if (!id) {
        sendError(res, 400, "Invalid Report ID. Report ID needs to be passed as a URL parameter.");
        return;
    }

    const report = await reports.getReport(id);

    sendData(res, report)
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
