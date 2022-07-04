const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')

const userController = require('../../../controllers/apis/user-controller')

const { registerCheck } = require('../../../middleware/validator')

router.get('/:id/edit', userController.editPage)
router.put('/:id/edit', upload.single('avatar'), registerCheck, userController.putUser)

router.get('/:id', userController.getUser)

module.exports = router