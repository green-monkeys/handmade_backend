import axios from 'axios';
import crypto from 'crypto';

const HOST = "mws.amazonservices.com";
const SIGNATURE_VERSION = 2;
const SIGNATURE_METHOD = 'HmacSHA256';
const VERSION_2009_01_01 = '2009-01-01';

const defaultParams = {
    AWSAccessKeyId: process.env.MWS_AWS_ACCESS_KEY_ID,
    Merchant: process.env.SELLER_ID,
    MWSAuthToken: process.env.MWS_AUTH_TOKEN,
    SignatureVersion: SIGNATURE_VERSION,
    Version: VERSION_2009_01_01,
    SignatureMethod: SIGNATURE_METHOD
};

export const generateUnsignedRequestString = (requestType, action, timestamp=Date.now()) => {
    const params = {
        ...defaultParams,
        Action: action,
        Timestamp: timestamp,
    };

    const paramEntries = Object.entries(params);
    const sortedParams = paramEntries.sort(([key1], [key2]) => byteCompare(key1, key2));
    const mappedParams = sortedParams.map(([key, value]) => `${key}=${value}`);
    const paramString = mappedParams.join('&');

    return `${requestType}\n${HOST}\n/\n${paramString}`
};

const byteCompare = (s1, s2) => {
    if (s1 === s2) {
        return 0;
    }

    let i = 0;
    while(i < s1.length && i < s2.length) {
        if (s1[i] === s2[i]) {
            i++;
            continue;
        }
        return s1[i] > s2[i];
    }

    return (s1.length > s2.length) ? 1 : -1;
}

export const generateSignature = (paramString) => {
    return crypto.createHmac('SHA256', process.env.AWS_SECRET_ACCESS_KEY).update(paramString).digest('base64');
};

/*
function generateSignature(requestType, host, route, body) {
    let bodyArray = Object.keys(body).map(key => `${key}=${body[key]}`);
    let bodyString = bodyArray.join("&");
    let queryString = `${requestType}\n${host}\n${route}\n${bodyString}\n`;
    let hmacString = hmacEncode(queryString, credentials.CLIENT_SECRET);
    let hmacBuffer = new Buffer(hmacString);
    let hmacBase64 = hmacBuffer.toString("base64").replace(/=/g, "");
    return hmacBase64;
}

function hmacEncode(unhashedString, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    let hmacString = hmac.update(unhashedString).digest("base64");
    let hmacBuffer = new Buffer(hmacString);
    let hmacBase64 = hmacBuffer.toString("base64").replace(/=/g, "");
    return hmacBase64;
}

async function hmacEncodeRequest(req, res) {
    let parameters = req.body ? JSON.parse(req.body) : {};
    let unhashed = parameters["unhashed"] ? parameters["unhashed"] : "";
    let secret = parameters["secret"]
        ? parameters["secret"]
        : credentials.CLIENT_SECRET;
    res.status(200).json({
        hashed: hmacEncode(unhashed, secret)
    });
}

async function listMWSReports(req, res) {
    const config = {
        "Content-Type": "x-www-form-encoded"
    };

    let parameters = req.body ? JSON.parse(req.body) : {};

    Object.assign(parameters, requiredParameters);
    Object.assign(parameters, {
        Action: "GetReportList",
        Timestamp: new Date().toISOString(),
        Version: "2009-01-01"
    });

    const signature = generateSignature("POST", HOST, ROUTES.REPORTS, parameters);

    parameters["Signature"] = signature;

    const parameterString = Object.keys(parameters)
        .sort()
        .map(key => `${key}=${parameters[key]}`)
        .join("&");

    try {
        let response = await axios.post(
            `https://${HOST}${ROUTES.REPORTS}`,
            parameterString,
            config
        );
        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(err.response.status).send(err.response.data);
    }
}
*/
