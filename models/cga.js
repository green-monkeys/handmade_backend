import {query} from './db';
import {emailIsValid} from "../controllers/requestHelper";

export const getCGA = async (email) => {
    const response = await query(`SELECT * FROM cgas WHERE email='${email}'`);

    if (response.rowCount === 0) {
        return null
    }

    return response.rows[0]
};

export const removeCGA = async (email) => {
    const response = await query(`SELECT * FROM cgas WHERE email='${email}'`);

    if (response.rowCount === 0) {
        return null
    }

    await query(`DELETE FROM cgas WHERE email='${email}'`);
    return response.rows[0]
};

export const getArtisansForCGA = async (email) => {
    const response = await query(`SELECT a.* FROM artisans a, cgas c WHERE a.cgaid = c.id AND c.email = '${email}'`);

    let artisans = [];
    for (let i = 0; i < response.rowCount; i++) {
        const artisan = response.rows[i];
        const owed = await query(`SELECT SUM(amount) as owed FROM payouts WHERE artisan = ${artisan.id} AND paid = false`);
        const paid = await query(`SELECT SUM(amount) as paid FROM payouts WHERE artisan = ${artisan.id} AND paid = true`);
        artisans.push({
            ...artisan,
            owed: (owed.rowCount > 0) ? owed.rows[0].owed : 0.0,
            paid: (paid.rowCount > 0) ? paid.rows[0].paid : 0.0
        })
    }
    return artisans;
};

export const addCGA = async (information) => {
    const {email, firstName, lastName, image} = information;

    const existingUsers = (await query(`SELECT * FROM cgas WHERE email='${email}'`)).rowCount;
    if (existingUsers > 0) {
        return null;
    }

    await query(`INSERT INTO cgas (first_name, last_name, email, image) VALUES ('${firstName}', '${lastName}', '${email}', '${image}')`);

    const response = await query(`SELECT * FROM cgas WHERE email='${email}'`);

    return response.rows[0];
};

export const emailExists = async (email) => {
    const resp = await query(`SELECT * FROM cgas WHERE email='${email}'`);
    return resp.rowCount > 0;
};
