const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')

const list = require('./modules/lists')
const user = require('./modules/users')
const clock = require('./modules/clocks')

const listController = require('../../controllers/apis/list-controller')
const userController = require('../../controllers/apis/user-controller')

const { registerCheck } = require('../../middleware/validator')
const { authenticated } = require('../../middleware/api-auth')
const { apiErrorHandler } = require('../../middleware/error-handler')

router.post('/login', passport.authenticate('local', { session: false }), userController.login)

router.post('/register', registerCheck, userController.register)

router.get('/month', authenticated, listController.getMonth)

router.use('/lists', authenticated, list)
router.use('/users', authenticated, user)
router.use('/clocks', authenticated, clock)

router.use('/', apiErrorHandler)

module.exports = router