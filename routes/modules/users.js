const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user-controllers')
const { generalErrorHandler } = require('../../middleware/error-handler')
const { registerCheck } = require('../../middleware/validator')

router.get('/:id/edit', userController.editPage)
router.put('/:id/edit', registerCheck, userController.putUser)

router.get('/:id', userController.getUser)

router.use('/:id', generalErrorHandler)

module.exports = router