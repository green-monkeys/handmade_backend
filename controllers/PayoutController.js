import client from './DBClient';

export async function getPayout(req, res) {
    const response = await client.query(`SELECT * FROM payouts WHERE id=${req.params.payoutId}`);
    res.status(200).json({
        data: response
    });
}

export async function addPayout(req, res) {
    const {cgaId, artisanId, amount} = req.body;
    const response = await client.query(`INSERT INTO payouts (cga, artisan, amount) VALUES (${cgaId},${artisanId},${amount})`);
    res.status(200).json({
        data: response
    });
}

export async function removePayout(req, res) {
    const response = await client.query(`DELETE FROM payouts WHERE id=${req.params.payoutId}`);
    res.status(200).json({
        data: response
    });
}
