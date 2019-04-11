import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import indexRouter from './routes/index';
import dbRouter from './routes/db';
import mwsRouter from './routes/mws';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/db", dbRouter);
app.use("/mws", mwsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));

export default app;
