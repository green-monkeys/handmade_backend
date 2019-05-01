import {Router} from 'express'
import {
    getArtisan,
    removeArtisan,
    addArtisan,
    usernameExists,
    validate
} from '../controllers/artisan';
import {upload} from "../util/aws";

const artisanRouter = Router();

artisanRouter.get('/username_exists', validate('usernameExists'), usernameExists);
artisanRouter.post('/', upload.single('image'), validate('addArtisan'), addArtisan);
artisanRouter.delete('/:id', validate('removeArtisan'), removeArtisan);
artisanRouter.get("/:id", validate('getArtisan'), getArtisan);


export default artisanRouter;
