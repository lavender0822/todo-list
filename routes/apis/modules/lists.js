const express = require('express')
const router = express.Router()

const listController = require('../../../controllers/apis/list-controller')

const { listCheck } = require('../../../middleware/validator')

router.post('/create', listCheck, listController.postList)

router.get('/todos', listController.getTodos)
router.get('/schedules', listController.getSchedules)

router.get('/:id/edit', listController.editPage)
router.put('/:id/edit', listCheck, listController.putList)

router.get('/:id', listController.detailPage)
router.patch('/:id', listController.patchList)
router.delete('/:id', listController.deleteList)


module.exports = router