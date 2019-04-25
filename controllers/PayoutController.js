import client from './DBClient';

export async function getPayout(req, res) {
    //sanitize input by casting to int
    let id =  parseInt(req.params.payoutId,10) || 0;
    const response = await client.query(`SELECT * FROM payouts WHERE id=${id}`);

    res.status(200).json({
        data: response
    });
}

export async function addPayout(req, res) {
    const {cgaId, artisanId, amount} = req.body;
    try {
        const response = await client.query(`INSERT INTO payouts (cga, artisan, amount) VALUES (${cgaId},${artisanId},${amount})`);

        res.status(200).json({
            data: response
        });
    }catch(e){
        console.error(e);
        res.status(500).json({message: e.message})
    }
}

export async function removePayout(req, res) {
    //sanitize input by casting to int
    let id =  parseInt(req.params.payoutId,10) || 0;
    const response = await client.query(`DELETE FROM payouts WHERE id=${id}`);
    res.status(200).json({
        data: response
    });
}
