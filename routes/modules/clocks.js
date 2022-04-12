const express = require('express')
const router = express.Router()

const clockController = require('../../controllers/clock-controllers')

const { clockCheck } = require('../../middleware/validator')

router.post('/create/:id', clockCheck, clockController.postClock)

router.patch('/:id', clockController.patchClock)
router.delete('/:id', clockController.deleteClock)


module.exports = router