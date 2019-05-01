import {Router} from 'express';
import {getPayout, addPayout, removePayout, validate} from '../controllers/payout';

const payoutRouter = Router();
payoutRouter.get('/:id', validate('getPayout'), getPayout);
payoutRouter.post('/', validate('addPayout'), addPayout);
payoutRouter.delete('/:id', validate('removePayout'), removePayout);

// Send me a CGA, I send back list of artisans, how much they've been paid, how much they're owed as sum totals
// Query an artisan, send back the artisan with all detailed transaction information for the artisan

export default payoutRouter;
