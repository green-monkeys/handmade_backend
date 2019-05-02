import {query} from './db';
import {genSalt, hash} from 'bcrypt';

export const getArtisan = async (id) => {
    const response = await query(`SELECT * FROM artisans WHERE id=${id}`);
    if (response.rowCount === 0) {
        return null;
    }

    const payouts = await query(`SELECT * FROM payouts WHERE artisan=${id}`);
    const payoutList = (payouts.rowCount > 0) ? payouts.rows : [];

    return {...response.rows[0], payouts: payoutList};
};

export const removeArtisan = async (id) => {
    const response = await query(`SELECT * FROM artisans WHERE id=${id}`);

    if (response.rowCount === 0) {
        return null;
    }

    await query(`DELETE FROM artisans WHERE id=${id}`);
    return response.rows[0];
};

export const addArtisan = async (information) => {
    const {cgaId, username, firstName, lastName, password, phoneNumber, isSmart, image} = information;

    const existingUsers = (await query(`SELECT * FROM artisans WHERE username='${username}'`)).rowCount;
    if (existingUsers > 0) {
        return null
    }

    const salt = await genSalt(10);
    const hashString = await hash(password, salt);

    let qStr;
    if (image) {
        qStr = `INSERT INTO artisans (cgaid, username, first_name, last_name, password, salt, phone, is_smart, image) VALUES (${cgaId}, '${username}', '${firstName}', '${lastName}', '${hashString}', '${salt}', '${phoneNumber}', ${isSmart}, '${image}')`;
    } else {
        qStr = `INSERT INTO artisans (cgaid, username, first_name, last_name, password, salt, phone, is_smart) VALUES (${cgaId}, '${username}', '${firstName}', '${lastName}', '${hashString}', '${salt}', '${phoneNumber}', ${isSmart})`;
    }

    await query(qStr);
    return (await query(`SELECT * FROM artisans WHERE username='${username}'`)).rows[0];

};

export const usernameExists = async (username) => {
    const existingUsers = await query(`SELECT * FROM artisans WHERE username='${username}'`).rowCount;
    return existingUsers > 0;
};
