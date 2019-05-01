import {Router} from 'express';
import {
    getCGA,
    removeCGA,
    getArtisansForCGA,
    addCGA,
    validate
} from '../controllers/cga';
import {upload} from '../util/aws';

const cgaRouter = Router();

cgaRouter.get('/artisans', validate('getArtisansForCGA'), getArtisansForCGA);

cgaRouter.get('/', validate('getCGA'), getCGA);
cgaRouter.delete('/', validate('removeCGA'), removeCGA);
cgaRouter.post('/', upload.single('image'), validate('addCGA'), addCGA);

export default cgaRouter;
