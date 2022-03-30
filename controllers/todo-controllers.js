const { Todo } = require('../models')

const todoController = {
    getTodos: async (req, res) => {
        const userId = req.user.id
        const todos = await Todo.findAll({
            raw: true,
            nest: true,
            where: { userId },
            order: [['startTime', 'asc']]
        })
        res.render('todos', { todos })
    }
}

module.exports = todoController