import {Router} from 'express'
import {
    getArtisan,
    removeArtisan,
    addArtisan
} from '../controllers/artisan';
import {upload} from "../util/aws";

const artisanRouter = Router();

artisanRouter.post('/', upload.single('image'), addArtisan);
artisanRouter.delete('/:id', removeArtisan);
artisanRouter.get("/:id", getArtisan);


export default artisanRouter;
