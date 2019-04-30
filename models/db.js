import {Pool} from 'pg';
import 'dotenv/config';

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export const query = async (q) => {
    const client = await db.connect();
    try {
        return (await client.query(q));
    } catch (e) {
        throw e;
    }finally {
        client.release()
    }
};
