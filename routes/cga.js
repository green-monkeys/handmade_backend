import {Router} from 'express';
import {
    getCGA,
    removeCGA,
    getArtisansForCGA,
    addCGA
} from '../controllers/cga';
import {upload} from '../util/aws';

const cgaRouter = Router();

cgaRouter.get('/artisans', getArtisansForCGA);

cgaRouter.get('/', getCGA);
cgaRouter.delete('/', removeCGA);
cgaRouter.post('/', upload.single('image'), addCGA);

export default cgaRouter;
