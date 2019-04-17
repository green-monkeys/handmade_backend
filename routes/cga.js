import {Router} from 'express';
import {getCGA, addCGA, removeCGA, getCGAByEmail, getArtisansForCGA} from '../controllers/CGAController';

const cgaRouter = Router();

cgaRouter.get('/artisans', getArtisansForCGA);

cgaRouter.get('/:cgaId', getCGA);
cgaRouter.post('/', addCGA);
cgaRouter.delete('/:cgaId', removeCGA);

cgaRouter.get('/', getCGAByEmail);

export default cgaRouter;
