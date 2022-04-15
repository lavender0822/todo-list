const { Op } = require("sequelize");
const { List, Clock } = require('../../models')

const listServices = require('../../services/list-services')

const listController = {
    getTodos: (req, res, next) => {
        listServices.getTodos(req, (err,data) => err ? next(err) : res.render('todos', data))
    },

    getSchedules: (req, res, next) => {
        listServices.getSchedules(req, (err,data) => err ? next(err) : res.render('schedules', data))
    },

    getMonth: (req, res, next) => {
        listServices.getMonth(req, (err,data) => err ? next(err) : res.render('schedules', data))    
    },

    detailPage: (req, res, next) => {
        listServices.detailPage(req, (err,data) => err ? next(err) : res.render('detail', data))  
    },

    editPage: (req, res, next) => {
        listServices.editPage(req, (err,data) => err ? next(err) : res.render('edit', data)) 
    },

    postList: (req, res, next) => {
        listServices.postList(req, (err) => {
            if (err) return next(err)
            res.redirect('/lists/todos')
        })
    },

    putList: async (req, res, next) => {
        listServices.putList(req, (err) => {
            if (err) return next(err)
            res.redirect(`/lists/${req.params.id}`)
        })
    },

    patchList: async (req, res, next) => {
        listServices.patchList(req, (err) => {
            if (err) return next(err)
            res.redirect(`/lists/todos`)
        })
    },

    deleteList: async (req, res, next) => {
        listServices.deleteList(req, (err) => {
            if (err) return next(err)
            res.redirect(`/lists/todos`)
        })
    },

    createPage: (req, res) => {
        res.render('create')
    }
}

module.exports = listController