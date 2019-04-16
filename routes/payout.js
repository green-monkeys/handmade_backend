import {Router} from 'express';
import {getPayout, addPayout, removePayout} from '../controllers/PayoutController';

const payoutRouter = Router();
payoutRouter.get('/:payoutId', getPayout);
payoutRouter.post('/', addPayout);
payoutRouter.delete('/:payoutId', removePayout);

export default payoutRouter;
