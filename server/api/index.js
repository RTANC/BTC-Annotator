const express = require('express')
const router = express.Router()

const { apiAuth } = require('./middleware/auth')
const priceRoutes = require('./prices')
const labelRoutes = require('./labels')

router.get('/test', async (req,res,next)=>{
    try{
        res.status(200).send({
            message: 'System status On.'
        })
    } catch(err) {
        res.sendStatus(500)
    }
})

router.use(apiAuth)
router.use('/prices', priceRoutes)
router.use('/labels', labelRoutes)

module.exports = router