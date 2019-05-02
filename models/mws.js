import MwsApi from 'amazon-mws';
const mws = new MwsApi(process.env.MWS_AWS_ACCESS_KEY_ID, process.env.MWS_AWS_SECRET_ACCESS_KEY);

export default mws;

