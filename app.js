import 'babel-polyfill';
import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import artisanRouter from "./routes/artisan";
import cgaRouter from "./routes/cga";
import payoutRouter from "./routes/payout";
import mwsRouter from './routes/mws';
import * as swaggerUi from 'swagger-ui-express';
import {specs} from './swagger/jsDoc';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/mws", mwsRouter);

app.use("/artisan", artisanRouter);
app.use("/cga", cgaRouter);
app.use("/payout", payoutRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));

export default app;
