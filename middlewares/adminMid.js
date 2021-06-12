const jwt = require('jsonwebtoken')

module.exports = function decodeTokenAndCheckIsAdmin(req, res, next){
    if (!req.headers.authorization) {
        return res.status('403').json({
            success : false,
            message : "unotaurized"
        })
    }

    try {
        token =  req.headers.authorization.split(' ')[1]
        jwt.verify(token, JWT_SECRET, function(error, decoded) {
            console.log('isAdmin: ', decoded.isAdmin)
            if (!decoded.isAdmin) {
                return res.status('403').json({
                    success : false,
                    message : "Accès refusé"
                })
            }
            next()
        });
    } catch (error) {
        console.log(error)
        return res.status('401').json({
            success : false,
            message : "Accès refusé"
        })
    }
}