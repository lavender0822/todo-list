const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const userServices = require('../../services/user-services')

const userController = {
    login: (req, res, next) => {
        try {
            const userData = req.user.toJSON()
            const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
            delete userData.password
            res.json({
                status: 'success',
                data: {
                    token,
                    user: userData
                }
            })
        } catch (err) {
            next(err)
        }
    },

    register: (req, res, next) => {
        userServices.register(req, (err,data) => err ? next(err): res.json(data))
    },

    getUser: (req, res, next) => {
        userServices.getUser(req, (err,data) => err ? next(err): res.json(data))
    },

    editPage: (req, res, next) => {
        userServices.editPage(req, (err,data) => err ? next(err): res.json(data))
    },

    putUser: async (req, res, next) => {
        userServices.putUser(req, (err,data) => err ? next(err): res.json(data))
    }
}

module.exports = userController