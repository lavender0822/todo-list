const { Todo } = require('../models')

const todoController = {
    getTodos: async (req, res) => {
        const userId = req.user.id
        const todos = await Todo.findAll({
            raw: true,
            nest: true,
            where: { userId },
            order: [['date', 'asc'], ['startTime', 'asc']]
        })
        res.render('todos', { todos })
    },

    createPage: (req, res) => {
        res.render('create')
    },

    postTodo: (req, res) => {
        const userId = req.user.id
        const { name, date, startTime, endTime } = req.body
        Todo.create({
            name,
            userId,
            date: date || null,
            startTime: startTime || null,
            endTime: endTime || null
        })
        res.redirect('/todos')
    }
}

module.exports = todoController