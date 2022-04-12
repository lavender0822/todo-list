const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

const user = require('./modules/users')
const list = require('./modules/lists')
const clocks = require('./modules/clocks')

const userController = require('../controllers/user-controllers')

const { generalErrorHandler } = require('../middleware/error-handler')
const { registerCheck } = require('../middleware/validator')
const { authenticator } = require('../middleware/auth')

router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)

router.get('/logout', userController.logout)

router.get('/register', userController.registerPage)
router.post('/register', registerCheck, userController.register)

router.use('/users', authenticator, user)
router.use('/lists', authenticator, list)
router.use('/clocks', authenticator, clocks)

// router.use('/', (req, res) => res.redirect('/lists/todos'))
router.use('/', generalErrorHandler)

module.exports = router