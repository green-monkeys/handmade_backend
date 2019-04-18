import {Router} from 'express';
import {
    getCGA,
    addCGA,
    removeCGA,
    getCGAByEmail,
    getArtisansForCGA,
    getCGAImage,
    uploadCGAImage
} from '../controllers/CGAController';
import {upload} from '../controllers/AWSController';

const cgaRouter = Router();

cgaRouter.get('/artisans', getArtisansForCGA);

cgaRouter.get('/image', getCGAImage);
cgaRouter.post('/image', upload.single('image'), uploadCGAImage);

cgaRouter.get('/:cgaId', getCGA);
cgaRouter.delete('/:cgaId', removeCGA);

cgaRouter.post('/', addCGA);
cgaRouter.get('/', getCGAByEmail);

export default cgaRouter;
