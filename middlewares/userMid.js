const jwt = require('jsonwebtoken')

module.exports = function decodeToken(req, res, next){
    if (!req.headers.authorization) {
        return res.status('403').json({
            success : false,
            message : "unotaurized"
        })
    }

    try {
        token =  req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        decoded ? next() : ''
    } catch (error) {
        console.log(error)
        return res.status('401').json({
            success : false,
            message : "Accès refusé"
        })
    }
}