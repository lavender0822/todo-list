const { Op } = require("sequelize");
const { List, Clock } = require('../models')

const listController = {
    getTodos: async (req, res, next) => {
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

    getSchedules: async (req, res, next) => {
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

    getMonth: async (req, res, next) => {
        try {
            const userId = req.user.id
            const { month }= req.query
            const year = '2022'
            if (month === "all") {
                res.redirect('/lists/schedules')
            } else{
                let startDate = Date.parse(year + '-' + month)
                const endDate = startDate + 2592000000
                const lists = await List.findAll({
                    raw: true,
                    nest: true,
                    where: { userId, date: { [Op.between]: [startDate, endDate] } },
                    order: [['date', 'asc'], ['startTime', 'asc']]
                })
                res.render('schedules', { lists, month })
            }
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
        } catch(e) { next(e) }
    },

    editPage: async (req, res, next) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id,{ raw: true })
            res.render('edit', { list })
        } catch(e) { next(e) }
    },

    putList: async (req, res, next) => {
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

    patchList: async (req, res, next) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            const { isDone } = list
            list.update({isDone: !isDone})
            res.redirect('/lists/todos')
        } catch(e) { next(e) }
    },

    deleteList: async (req, res, next) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            await list.destroy()
            res.redirect('/lists/todos')
        } catch(e) { next(e) }
    }
}

module.exports = listController