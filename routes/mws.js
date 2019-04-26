import {Router} from 'express'
import mws from '../util/mws';

const mwsRouter = Router();
mwsRouter.post("/list_mws_reports", mws.listMWSReports);
mwsRouter.post("/hmac_encode", mws.hmacEncodeRequest);

export default mwsRouter;
