const jwt = require('jsonwebtoken')

exports.apiAuth = (req, res, next) => {
    try {
        const authId = req.headers.auth_id
        if (authId === process.env.AUTH_ID) {
            next()
        } else {
            throw Error()
        }
    } catch (error) {
        res.sendStatus(401)
    }
}