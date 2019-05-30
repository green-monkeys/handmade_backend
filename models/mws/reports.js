import mws from '../mws';
import PDFDocument from 'pdfkit';
import PdfPrinter from 'pdfmake';

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
const printer = new PdfPrinter(fonts);

const config = {
    'Version': '2009-01-01',
    'SellerId': process.env.SELLER_ID,
    'MWSAuthToken': process.env.MWS_AUTH_TOKEN
};

export const getReport = async (reportId) => {
    const report = await mws.reports.search({
        ...config,
        'Action': 'GetReport',
        'ReportId': reportId
    });

    try {
        const reportData = report.data;
        const firstRow = Object.keys(reportData[0])[0].replace(/"/g, '');
        const laterRows = reportData.map(row => Object.values(row)[0].replace(/"/g, ''));

        const allRows = [firstRow, ...laterRows];
        const preliminaryInfo = allRows.slice(0, 7);
        const tableHeader = allRows[7].split(',');
        const dataRows = allRows.slice(8).map(row => row.split(','));

        return {
            description: preliminaryInfo,
            header: tableHeader,
            data: dataRows
        };
    } catch (e) {
        if (e.message === undefined) {
            throw new Error("Rate Limit Exceeded")
        } else {
            console.error(e.message);
            return null;
        }
    }
};

const generateSKU = (length) => {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    const numbers = '0123456789';
    const numbersLength = numbers.length;

    for (let i = 0; i < 3; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (let i = 3; i < length; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength));
    }
    return result;
};

const generateFakeData = (count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        data.push([
            new Date().toDateString(),
            count - i,
            ['Processing', 'Refund', 'Processed'][Math.floor(Math.random() * 3)],
            count - i,
            generateSKU(10),
            'Description of Item',
            Math.ceil(Math.random() * 100),
            ['US', 'MX', 'CA'][Math.floor(Math.random() * 3)],
            'Amazon',
            ...[
                ['Chicago', 'IL', 60007],
                ['New York', 'NY', 10032],
                ['San Francisco', 'CA', 94105],
                ['Miami', 'FL', 33101]
            ][Math.floor(Math.random() * 4)],
            Math.ceil(Math.random() * 1000)
        ])
    }
    return data;
};

export const getReportPDFMake = async (reportId) => {
    let report;
    try {
        report = await getReport(reportId);
    } catch (e) {
        if (e.message === undefined) {
            throw new Error("Rate Limit Exceeded")
        } else {
            throw e;
        }
    }

    if (report.data.length === 0) {
        report.data = generateFakeData(20)
    }

    const docDefinition = {
        pageOrientation: 'landscape',
        content: [
            {
                image: 'public/images/handmade_logo.png',
                width: 300,
            },
            {canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 3}]},
            ...report.description,
            {
                style: 'table',
                table: {
                    body: [
                        report.header.slice(0, 12).map(cell => cell.replace(/^([a-z])|(?:[/ ])([a-z])/, (match, p1) => p1.toUpperCase())),
                        ...report.data.map(row => row.slice(0, 12))
                    ]
                }
            }
        ],
        styles: {
            table: {
                margin: [0, 5, 0, 15]
            }
        }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.end();

    return pdfDoc;
};

export const getReportPDF = async (reportId) => {
    let report;
    try {
        report = await getReport(reportId);
    } catch (e) {
        if (e.message === undefined) {
            throw new Error("Rate Limit Exceeded")
        } else {
            throw e;
        }
    }

    const doc = new PDFDocument({
        autoFirstPage: false
    });

    doc.addPage({
        margin: 15
    });

    doc.image('public/images/handmade_logo.png', 15, 15, {width: 300});

    doc.moveTo(15, 70)
        .lineTo(600, 70)
        .stroke();

    doc.fontSize(12)
        .moveDown()
        .text(report.description.join('\n'),
            {
                width: 585,
                align: 'left'
            });

    doc.fontSize(12)
        .moveDown()
        .text(report.header.join(','),
            {
                width: 585,
                align: 'left'
            });

    doc.fontSize(12)
        .moveDown()
        .text(report.data.join(','),
            {
                width: 585,
                align: 'left'
            });

    doc.end();

    return doc;
};

export const getReportList = async () => {
    try {
        const reports = await mws.reports.search({
            ...config,
            'Action': 'GetReportList',
        });
        return reports.ReportInfo ? reports.ReportInfo : null;
    } catch (e) {
        throw new Error("Rate Limit Exceeded");
    }
};

export const getReportCount = async () => {
    try {
        const reportCount = await mws.reports.search({
            ...config,
            'Action': 'GetReportCount',
        });

        return reportCount.Count ? reportCount.Count : null;
    } catch (e) {
        throw new Error("Rate Limit Exceeded");

    }
};
