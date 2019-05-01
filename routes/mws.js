import {Router} from 'express'
import reportRouter from './mws/reports';
import productRouter from './mws/products';

const mwsRouter = Router();

mwsRouter.use('/reports', reportRouter);
mwsRouter.use('/products', productRouter);

export default mwsRouter;
