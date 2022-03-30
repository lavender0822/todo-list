const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator')
const { User } = require('../models')

const userController = {
    loginPage: (req, res) => {
        res.render('login')
    },

    registerPage: (req, res) => {
        res.render('register')
    },

    login: (req, res) => {
        req.flash('success_messages', '成功登入！')
        res.redirect('/todos')
    },

    register: async (req, res, next) => {
        const { name, email, account, password } = req.body

        try {
            const userAccount = await User.findOne({ where: { account } })
            const userEmail = await User.findOne({ where: { email } })

            if (userAccount) throw new Error('帳號已存在')
            if (userEmail) throw new Error('信箱已被使用')

            const hash = await bcrypt.hash(password, 10)
            const user = await User.create({ name, email, account, password: hash })

            req.flash('success_messages', '成功註冊帳號!')
            res.redirect('/login')
        } catch (err) { next(err) }
    },

    logout: (req, res) => {
        req.logout()
        req.flash('success_msg', '你已成功登出')
        res.redirect('/login')
    }
}

module.exports = userController