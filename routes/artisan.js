import {Router} from 'express'
import {getArtisan, addArtisan, removeArtisan} from '../controllers/ArtisanController';

const artisanRouter = Router();
artisanRouter.get("/:artisanId", getArtisan);
artisanRouter.post('/', addArtisan);
artisanRouter.delete('/:artisanId', removeArtisan);

export default artisanRouter;
