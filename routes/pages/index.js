const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

const user = require('./modules/users')
const list = require('./modules/lists')
const clock = require('./modules/clocks')

const userController = require('../../controllers/pages/user-controller')
const listController = require('../../controllers/pages/list-controller')

const { generalErrorHandler } = require('../../middleware/error-handler')
const { registerCheck } = require('../../middleware/validator')
const { authenticator } = require('../../middleware/auth')

router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)

router.get('/logout', userController.logout)

router.get('/register', userController.registerPage)
router.post('/register', registerCheck, userController.register)

router.get('/month', authenticator, listController.getMonth)

router.use('/users', authenticator, user)
router.use('/lists', authenticator, list)
router.use('/clocks', authenticator, clock)

router.use('/', (req, res) => res.redirect('/lists/todos'))
router.use('/', generalErrorHandler)

module.exports = router