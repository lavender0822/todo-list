const bcrypt = require('bcryptjs');

const { User } = require('../../models')

const userServices = require('../../services/user-services')

const userController = {
    login: (req, res) => {
        req.flash('success_messages', '成功登入！')
        res.redirect('/lists/todos')
    },

    register: (req, res, next) => {
        userServices.register(req, (err) => {
            if (err) return next(err)
            req.flash('success_messages', '成功註冊帳號!')
            res.redirect('/login')
        })
    },

    getUser: (req, res, next) => {
        userServices.getUser(req, (err,data) => err ? next(err) : res.render('user/profile', data))
    },

    editPage: (req, res, next) => {
        userServices.editPage(req, (err,data) => err ? next(err) : res.render('user/edit', data))
    },

    putUser: async (req, res, next) => {
        userServices.putUser(req, (err,data) => err ? next(err) : res.render('user/profile', data))
    },

    logout: (req, res) => {
        req.logout()
        req.flash('success_msg', '你已成功登出')
        res.redirect('/login')
    },

    loginPage: (req, res) => {
        res.render('login')
    },

    registerPage: (req, res) => {
        res.render('register')
    },
}

module.exports = userController