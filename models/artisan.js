import client from './client';

export const getArtisan = async (id) => {
    const response = await client.query(`SELECT * FROM artisans WHERE id=${id}`);
    if (response.rowCount === 0) {
        return null;
    }

    const payouts = await client.query(`SELECT * FROM payouts WHERE artisan=${id}`);
    const payoutList = (payouts.rowCount > 0) ? payouts.rows : [];

    return {...response.rows[0], payouts: payoutList};
};

export const removeArtisan = async (id) => {
    const response = await client.query(`SELECT * FROM artisans WHERE id=${id}`);

    if (response.rowCount === 0) {
        return null;
    }

    await client.query(`DELETE FROM artisans WHERE id=${id}`);
    return response.rows[0];
};

export const addArtisan = async (information) => {
    const {cgaId, username, firstName, lastName, password, salt, phoneNumber, isSmart, image} = information;

    const existingUsers = (await client.query(`SELECT * FROM artisans WHERE username='${username}'`)).rowCount;
    if (existingUsers > 0) {
        return null
    }

    await client.query(`INSERT INTO artisans (cgaid, username, first_name, last_name, password, salt, phone, is_smart, image) VALUES (${cgaId}, '${username}', '${firstName}', '${lastName}', '${password}', '${salt}', '${phoneNumber}', ${isSmart}, '${image}')`);
    return (await client.query(`SELECT * FROM artisans WHERE username='${username}'`)).rows[0];
};
