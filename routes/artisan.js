import {Router} from 'express'
import {
    getArtisan,
    addArtisan,
    removeArtisan,
    getArtisanByUsername,
    getArtisanImage,
    uploadArtisanImage
} from '../controllers/ArtisanController';
import {upload} from "../controllers/AWSController";

const artisanRouter = Router();

artisanRouter.get('/image', getArtisanImage);
artisanRouter.post('/image', upload.single('image'), uploadArtisanImage);

artisanRouter.get("/:artisanId", getArtisan);
artisanRouter.delete('/:artisanId', removeArtisan);

artisanRouter.get('/', getArtisanByUsername);
artisanRouter.post('/', addArtisan);

export default artisanRouter;
