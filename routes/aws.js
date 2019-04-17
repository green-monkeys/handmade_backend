import {Router} from 'express';
import {upload, storeImage} from "../controllers/AWSController";

const awsRouter = Router();

awsRouter.post('/image', upload.single('image'), storeImage);

export default awsRouter;
