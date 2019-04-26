import {Client} from 'pg';
import 'dotenv/config';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export default client;
