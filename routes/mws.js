import {Router} from 'express'
import {getReportCount, getSignature} from '../controllers/mws/reports';
import reportRouter from './mws/reports';
import productRouter from './mws/products';

const mwsRouter = Router();

mwsRouter.use('/reports', reportRouter);
mwsRouter.use('/products', productRouter);

export default mwsRouter;
