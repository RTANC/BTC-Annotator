const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

exports.label = async (req, res, next) => {
    try {
        let tblName = `tb_btc2017min_1`
        if (!['15m', '30m', '1d'].includes(req.query.dur)) {
            throw Error('duration invalid format.')
        }

        let sql_query = `UPDATE ${tblName}
        SET t_label1 = ${req.body.label1 || 'NULL'}, t_label2 = ${req.body.label2 || 'NULL'}, t_label3 = ${req.body.label3 || 'NULL'}
        WHERE t_id = ${req.params.id}`

        await sequelize.query(sql_query, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}