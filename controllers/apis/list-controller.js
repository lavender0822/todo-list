const listServices = require('../../services/list-services')

const listController = {
    getTodos: (req, res, next) => {
        listServices.getTodos(req, (err,data) => err ? next(err) : res.json(data))
    },

    getSchedules: (req, res, next) => {
        listServices.getSchedules(req, (err,data) => err ? next(err) : res.json(data))
    },

    getMonth: (req, res, next) => {
        listServices.getMonth(req, (err,data) => err ? next(err) : res.json(data))    
    },

    detailPage: async (req, res, next) => {
        listServices.detailPage(req, (err,data) => err ? next(err) : res.json(data)) 
    },

    editPage: async (req, res, next) => {
        listServices.editPage(req, (err,data) => err ? next(err) : res.json(data)) 
    },

    postList: (req, res, next) => {
        listServices.postList(req, (err,data) => err ? next(err): res.json(data))
    },

    putList: async (req, res, next) => {
        listServices.putList(req, (err,data) => err ? next(err): res.json(data))
    },

    patchList: async (req, res, next) => {
        listServices.patchList(req, (err,data) => err ? next(err): res.json(data))
    },

    deleteList: async (req, res, next) => {
        listServices.patchList(req, (err,data) => err ? next(err): res.json(data))
    }
}

module.exports = listController