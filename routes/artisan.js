import {Router} from 'express'
import {
    getArtisan,
    removeArtisan,
    addArtisan,
    usernameExists
} from '../controllers/artisan';
import {upload} from "../util/aws";

const artisanRouter = Router();

artisanRouter.get('/username_exists', usernameExists);
artisanRouter.post('/', upload.single('image'), addArtisan);
artisanRouter.delete('/:id', removeArtisan);
artisanRouter.get("/:id", getArtisan);


export default artisanRouter;
