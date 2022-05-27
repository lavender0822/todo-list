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
            const { name, date, startTime, endTime, descripitioin } = req.body
            const newList = await List.create({
                name,
                userId,
                descripitioin: descripitioin || null,
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
            if (list.userId !== userId) throw new Error('無權更改')
            const { name, date, startTime, endTime, isDone, descripitioin } = req.body
            await list.update({
                name,
                userId,
                descripitioin: descripitioin || null,
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
            if (list.userId !== userId) throw new Error('無權更改')
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
            if (list.userId !== userId) throw new Error('無權刪除')
            if (!list) throw new Error('此清單不存在')
            await list.destroy()
            cb(null, { list })
        } catch(e) { cb(e) }
    }
}

module.exports = listServices