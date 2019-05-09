import {Router} from 'express'
import {
    getArtisan,
    removeArtisan,
    addArtisan,
    usernameExists,
    getArtisanByUsername,
    login,
    validate
} from '../controllers/artisan';
import {upload} from "../util/aws";

const artisanRouter = Router();

artisanRouter.get('/login', validate('login'), login);
artisanRouter.get('/username_exists', validate('usernameExists'), usernameExists);
artisanRouter.post('/', upload.single('image'), validate('addArtisan'), addArtisan);

artisanRouter.get('/', validate('getArtisanByUsername'), getArtisanByUsername);

artisanRouter.delete('/:id', validate('removeArtisan'), removeArtisan);
artisanRouter.get("/:id", validate('getArtisan'), getArtisan);


export default artisanRouter;
