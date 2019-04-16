import {Router} from 'express';
import {getCGA, addCGA, removeCGA} from '../controllers/CGAController';

const cgaRouter = Router();
cgaRouter.get('/:cgaId', getCGA);
cgaRouter.post('/', addCGA);
cgaRouter.delete('/:cgaId', removeCGA);

export default cgaRouter;
