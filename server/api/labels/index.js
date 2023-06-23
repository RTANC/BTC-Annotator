const express = require('express')
const router = express.Router()
const { label } = require('./labels.controller')

router.patch('/:id', label)

module.exports = router