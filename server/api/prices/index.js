const express = require('express')
const router = express.Router()

const { getPrices } = require('./prices.controller')
router.get('/', getPrices)
module.exports = router