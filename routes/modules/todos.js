const express = require('express')
const router = express.Router()

const todoController = require('../../controllers/todo-controllers')

const { todoCheck } = require('../../middleware/validator')

router.get('/create', todoController.createPage)
router.post('/create', todoCheck, todoController.postTodo)

router.get('/:id/edit', todoController.editPage)
router.put('/:id/edit', todoCheck, todoController.putTodo)

router.get('/:id', todoController.detailPage)
router.delete('/:id', todoController.deleteTodo)

router.get('/', todoController.getTodos)

module.exports = router