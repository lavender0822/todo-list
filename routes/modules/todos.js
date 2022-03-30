const express = require('express')
const router = express.Router()

const todoController = require('../../controllers/todo-controllers')

router.get('/', todoController.getTodos)

module.exports = router