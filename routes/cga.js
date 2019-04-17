import {Router} from 'express';
import {getCGA, addCGA, removeCGA, getCGAByEmail, getArtisansForCGA, getCGAImage} from '../controllers/CGAController';

const cgaRouter = Router();

cgaRouter.get('/artisans', getArtisansForCGA);
cgaRouter.get('/image', getCGAImage);

cgaRouter.get('/:cgaId', getCGA);
cgaRouter.post('/', addCGA);
cgaRouter.delete('/:cgaId', removeCGA);

cgaRouter.get('/', getCGAByEmail);

export default cgaRouter;
