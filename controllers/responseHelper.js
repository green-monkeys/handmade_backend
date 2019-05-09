/**
 * Simplifies Error Responses
 * @param res: Express Response Object
 * @param status: Status code to be returned
 * @param message: Error message to be returned in the response body
 */
export const sendError = (res, status, message) => {
    res.status(status).json({message})
};

/**
 * Simplifies Successful Responses with Accompanying Data
 * @param res: Express Response Object
 * @param data: Data to be returned in the response body.
 */
export const sendData = (res, data) => {
    res.status(200).json({data})
};

export const sendPDF = (res, doc) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.status(200);
    doc.pipe(res);
};
