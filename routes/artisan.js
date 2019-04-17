import {Router} from 'express'
import {getArtisan, addArtisan, removeArtisan, getArtisanByEmail} from '../controllers/ArtisanController';

const artisanRouter = Router();
artisanRouter.get("/:artisanId", getArtisan);
artisanRouter.post('/', addArtisan);
artisanRouter.delete('/:artisanId', removeArtisan);

artisanRouter.get('/', getArtisanByEmail);

export default artisanRouter;
