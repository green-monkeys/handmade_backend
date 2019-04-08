import {Router} from 'express'

const indexRouter = Router();
indexRouter.get("/", (req, res) => res.status(200).json({"message": "Hello World!"}));

export default indexRouter;
