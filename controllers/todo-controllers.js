const { Op } = require("sequelize");
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
    },

    detailPage: async (req, res) => {
        const { id } = req.params
        const todo = await Todo.findByPk(id)
        res.render('detail', { todo: todo.toJSON() })
    },

    editPage: async (req, res) => {
        const { id } = req.params
        const todo = await Todo.findByPk(id)
        res.render('edit', { todo: todo.toJSON() })
    },

    putTodo: async (req, res) => {
        const { id } = req.params
        const todo = await Todo.findByPk(id)
        const userId = req.user.id
        const { name, date, startTime, endTime, isDone } = req.body
        todo.update({
            name,
            userId,
            isDone,
            date: date || null,
            startTime: startTime || null,
            endTime: endTime || null
        })
        res.redirect(`/todos/${id}`)
    },

    deleteTodo: async (req, res) => {
        const { id } = req.params
        const todo = await Todo.findByPk(id)
        todo.destroy()
        res.redirect('/todo/:id')
    }
}

module.exports = todoController