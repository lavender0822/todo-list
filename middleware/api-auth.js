const passport = require('../config/passport')

const authenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) return res.json({ status: 'error', message: 'unauthorized' })
        req.user = user
        next()
    })(req, res, next)
}

module.exports = {
    authenticated
}