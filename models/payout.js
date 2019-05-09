import {query} from '../models/db';

export const getPayout = async (id) => {
    const payout = await query(`SELECT * FROM payouts WHERE id=${id}`);

    return payout.rowCount > 0 ? payout.rows[0] : null;
};

export const addPayout = async (cgaId, artisanId, amount) => {
    await query(`INSERT INTO payouts (cga, artisan, amount) VALUES (${cgaId},${artisanId},${amount})`);

    const payouts = await query(`SELECT * FROM payouts WHERE cga=${cgaId} AND artisan=${artisanId} AND amount=${amount}`);

    if(payouts.rowCount === 0) {
        return null;
    }

    return payouts.rows[0];
};

export const removePayout = async (payoutId) => {
    const payout = await query(`SELECT * FROM payouts WHERE id=${payoutId}`);

    if (payout.rowCount === 0) {
        return null
    }

    await query(`DELETE FROM payouts WHERE id=${payoutId}`);

    return payout.rows[0];
};

export const updatePayout = async (payoutId, isPaid) => {
    await query(`UPDATE payouts SET paid=${isPaid} WHERE id=${payoutId}`);
    return await getPayout(payoutId);
};
