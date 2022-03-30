const express = require('express')
const router = express.Router()

const user = require('./modules/users')

const userController = require('../controllers/user-controllers')

const { generalErrorHandler } = require('../middleware/error-handler')
const { registerCheck } = require('../middleware/validator')

router.use('/users', user)

router.get('/login', userController.loginPage)
router.post('/login', userController.login)

router.get('/register', userController.registerPage)
router.post('/register', registerCheck, userController.register)

router.use('/', generalErrorHandler)

module.exports = router