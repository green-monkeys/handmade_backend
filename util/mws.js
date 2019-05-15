import axios from 'axios';

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
