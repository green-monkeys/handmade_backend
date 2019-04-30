import mws from '../mws';

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

        return [firstRow, ...laterRows].join('\n');
    } catch (e) {
        console.error(e.message);
        return null;
    }
};

export const getReportList = async () => {
    const reports = await mws.reports.search({
        ...config,
        'Action': 'GetReportList',
    });

    return reports.ReportInfo ? reports.ReportInfo : null;
};

export const getReportCount = async () => {
    const reportCount = await mws.reports.search({
        ...config,
        'Action': 'GetReportCount',
    });

    return reportCount.Count ? reportCount.Count : null;
};
