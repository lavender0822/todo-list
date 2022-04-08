const { Op } = require("sequelize");
const { List } = require('../models')

const listController = {
    getTodos: async (req, res) => {
        const userId = req.user.id
        const lists = await List.findAll({
            raw: true,
            nest: true,
            where: { userId, date: null }
        })
        res.render('todos', { lists })
    },

    getSchedules: async (req, res) => {
        const userId = req.user.id
        const lists = await List.findAll({
            raw: true,
            nest: true,
            where: { userId, date: { [Op.not]: null } },
            order: [['date', 'asc'], ['startTime', 'asc']]
        })
        res.render('schedules', { lists })
    },

    createPage: (req, res) => {
        res.render('create')
    },

    postList: (req, res) => {
        const userId = req.user.id
        const { name, date, startTime, endTime } = req.body
        List.create({
            name,
            userId,
            isDone: false,
            date: date || null,
            startTime: startTime || null,
            endTime: endTime || null
        })
        res.redirect('/lists/todos')
    },

    detailPage: async (req, res) => {
        const { id } = req.params
        const list = await List.findByPk(id,{ raw: true })
        res.render('detail', { list })
    },

    editPage: async (req, res) => {
        const { id } = req.params
        const list = await List.findByPk(id,{ raw: true })
        res.render('edit', { list })
    },

    putList: async (req, res) => {
        const { id } = req.params
        const list = await List.findByPk(id)
        const userId = req.user.id
        const { name, date, startTime, endTime, isDone } = req.body
        await list.update({
            name,
            userId,
            isDone,
            date: date || null,
            startTime: startTime || null,
            endTime: endTime || null
        })
        res.redirect(`/lists/${id}`)
    },

    patchList: async (req, res) => {
        const { id } = req.params
        const list = await List.findByPk(id)
        const { isDone } = list
        list.update({isDone: !isDone})
        res.redirect('/lists/todos')
    },

    deleteList: async (req, res) => {
        const { id } = req.params
        const list = await List.findByPk(id)
        await list.destroy()
        res.redirect('/lists/todos')
    }
}

module.exports = listController