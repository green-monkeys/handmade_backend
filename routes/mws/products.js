import {Router} from 'express';
import {listProducts} from '../../controllers/mws/products';

const router = Router();

router.get('/list_products', listProducts);

export default router;