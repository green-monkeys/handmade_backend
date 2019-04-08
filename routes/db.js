import {Router} from 'express'
import db from '../controllers/DBController';

const dbRouter = Router();
dbRouter.get("/test_db", db.testQuery);

export default dbRouter;
