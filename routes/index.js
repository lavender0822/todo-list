const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

const user = require('./modules/users')
const todo = require('./modules/todos')

const userController = require('../controllers/user-controllers')

const { generalErrorHandler } = require('../middleware/error-handler')
const { registerCheck } = require('../middleware/validator')
const { authenticator } = require('../middleware/auth')



router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)

router.get('/register', userController.registerPage)
router.post('/register', registerCheck, userController.register)

router.use('/users', user)
router.use('/todos', authenticator, todo)

router.use('/', (req, res) => res.redirect('/todos'))
router.use('/', generalErrorHandler)

module.exports = router