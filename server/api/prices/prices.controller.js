const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

exports.getPrices = async (req, res, next) => {
    try {
        let tblName = `tb_btc2017min_1`
        if (!req.query.startDate || !req.query.endDate || !req.query.dur || typeof req.query.startDate === 'undefined' || typeof req.query.endDate === 'undefined' || typeof req.query.dur === 'undefined') {
            throw Error('startDate and endDate and dur is require.')
        }
        if (!['15m', '30m', '1d'].includes(req.query.dur)) {
            throw Error('duration invalid format.')
        }

        let sql_query = `SELECT t_id, t_date, t_open, t_high, t_low, t_close
        from ${tblName}
        WHERE t_date BETWEEN '${req.query.startDate}' AND '${req.query.endDate}'
        ORDER BY t_date ASC`
        const prices = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        res.status(200).send(prices)
    } catch (error) {
        next(error)
    }
}