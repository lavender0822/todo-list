const { Op } = require("sequelize");
const { List, Clock } = require('../models')

const listServices = {
    getTodos: async (req, cb) => {
        try{
            const userId = req.user.id
            const lists = await List.findAll({
                raw: true,
                nest: true,
                where: { userId, date: null }
            })
            cb(null, { lists })
        } catch(e) { cb(e) }
    },

    getSchedules: async (req, cb) => {
        try{
            const userId = req.user.id
            const lists = await List.findAll({
                raw: true,
                nest: true,
                where: { userId, date: { [Op.not]: null } },
                order: [['date', 'asc'], ['startTime', 'asc']]
            })
            cb(null, { lists })
        } catch(e) { cb(e) }
    },

    getMonth: async (req, cb, res) => {
        try {
            const userId = req.user.id
            const { month }= req.query
            const year = '2022'
            if (month === "all") {
                listServices.getSchedules(req,cb)
            } else{
                let startDate = Date.parse(year + '-' + month)
                const endDate = startDate + 2592000000
                const lists = await List.findAll({
                    raw: true,
                    nest: true,
                    where: { userId, date: { [Op.between]: [startDate, endDate] } },
                    order: [['date', 'asc'], ['startTime', 'asc']]
                })
                cb(null, { lists, month })
            }
        } catch(e) { cb(e) }
        
    },

    detailPage: async (req, cb) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id,{
                include: [{ model: Clock }]
            })
            cb(null, { list })
        } catch(e) { cb(e) }
    },

    editPage: async (req, cb) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id,{ raw: true })
            cb(null, { list })
        } catch(e) { cb(e) }
    },

    postList: async (req, cb) => {
        try{
            const userId = req.user.id
            const { name, date, startTime, endTime, description } = req.body
            const newList = await List.create({
                name,
                userId,
                description: description || null,
                isDone: false,
                date: date || null,
                startTime: startTime || null,
                endTime: endTime || null
            })
            cb(null, {list: newList})
        } catch(e) { cb(e) }
    },

    putList: async (req, cb) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            const userId = req.user.id
            if (list.userId !== userId) throw new Error('????????????')
            const { name, date, startTime, endTime, isDone, description } = req.body
            await list.update({
                name,
                userId,
                description: description || null,
                isDone,
                date: date || null,
                startTime: startTime || null,
                endTime: endTime || null
            })
            cb(null, { list })
        } catch(e) { cb(e) }
    },

    patchList: async (req, cb) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            const userId = req.user.id
            if (list.userId !== userId) throw new Error('????????????')
            const { isDone } = list
            list.update({isDone: !isDone})
            cb(null,{ list })
        } catch(e) { cb(e) }
    },

    deleteList: async (req, cb) => {
        try{
            const { id } = req.params
            const list = await List.findByPk(id)
            const userId = req.user.id
            console.log(list.userId,userId)
            if (list.userId !== userId) throw new Error('????????????')
            if (!list) throw new Error('??????????????????')
            await list.destroy()
            cb(null, { list })
        } catch(e) { cb(e) }
    }
}

module.exports = listServices