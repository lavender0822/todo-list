const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User, Todo } = require('../models')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
    {
    usernameField: 'account',
    passwordField: 'password',
    passReqToCallback: true
    },
    async (req, account, password, cb) => {
        try {
            const user = await User.findOne({ where: { account } })
            if (!user) throw new Error('帳號或密碼輸入錯誤！')
            const isMatched = await bcrypt.compare(password, user.password)
            if (!isMatched) throw new Error('帳號或密碼輸入錯誤！')
            return cb(null, user)
        } catch (err) { return cb(err, false) }
    }))

const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findByPk(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))


passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    User.findByPk(id).then(user => {
        user = user.toJSON()
        return cb(null, user)
    })
})

module.exports = passport