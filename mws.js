const axios = require("axios");
const fs = require("fs");
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const crypto = require("crypto");
const HOST = "mws.amazonservices.com";
const ROUTES = {
  REPORTS: "/Reports/2009-01-01"
};
const requiredParameters = {
  AWSAccessKeyId: credentials.AWS_ACCESS_KEY_ID,
  MWSAuthToken: credentials.MWS_AUTH_TOKEN,
  SellerId: credentials.SELLER_ID,
  SignatureMethod: "HmacSHA256",
  SignatureVersion: 2
};

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

module.exports = {
  listMWSReports,
  hmacEncodeRequest
};
