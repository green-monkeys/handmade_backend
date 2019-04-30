import MwsApi from 'amazon-mws';
const mws = new MwsApi(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

export default mws;

