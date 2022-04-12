const { Op } = require("sequelize");
const { List, Clock } = require('../models')

const listController = {
    getTodos: async (req, res) => {
        try{
            const userId = req.user.id
            const lists = await List.findAll({
                raw: true,
                nest: true,
                where: { userId, date: null }
            })
            res.render('todos', { lists })
        } catch(e) { next(e) }
    },

    getSchedules: async (req, res) => {
        try{
            const userId = req.user.id
            const lists = await List.findAll({
                raw: true,
                nest: true,
                where: { userId, date: { [Op.not]: null } },
                order: [['date', 'asc'], ['startTime', 'asc']]
            })
            res.render('schedules', { lists })
        } catch(e) { next(e) }
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

    detailPage: async (req, res, next) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id,{
                include: [{ model: Clock }]
            })
            res.render('detail', { list })
        }catch(e) { next(e) }
    },

    editPage: async (req, res) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id,{ raw: true })
            res.render('edit', { list })
        } catch(e) { next(e) }
    },

    putList: async (req, res) => {
        try{
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
        } catch(e) { next(e) }
    },

    patchList: async (req, res) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            const { isDone } = list
            list.update({isDone: !isDone})
            res.redirect('/lists/todos')
        } catch(e) { next(e) }
    },

    deleteList: async (req, res) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            await list.destroy()
            res.redirect('/lists/todos')
        } catch(e) { next(e) }
    }
}

module.exports = listController