const express = require('express')
const router = express.Router()

const todoController = require('../../controllers/todo-controllers')

const { todoCheck } = require('../../middleware/validator')

router.get('/create', todoController.createPage)
router.post('/create', todoCheck, todoController.postTodo)
router.get('/', todoController.getTodos)

module.exports = router