const express = require('express')
const router = express.Router()

const user = require('./modules/users')

const userController = require('../controllers/user-controllers')

router.use('/users', user)

router.get('/login', userController.loginPage)
router.post('/login', userController.login)

router.get('/register', userController.registerPage)
router.post('/register', userController.register)

module.exports = router