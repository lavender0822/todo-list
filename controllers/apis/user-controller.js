const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { User } = require('../../models')

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
    },

    getUser: async (req, res, next) => {
        try{
            const { id } = req.user
            const user = await User.findByPk(id,{ raw: true })
            res.render('user/profile')
        } catch (e) { next(e) }
    },

    editPage: async (req, res, next) => {
        try{
            const { id } = req.user
            const user = await User.findByPk(id,{ raw: true })
            res.render('user/edit')
        } catch (e) { next(e) }
    },

    putUser: async (req, res, next) => {
        try{
            const { id } = req.params
            const user = await User.findByPk(id)
            const { name, email, account, password } = req.body
            const hash = await bcrypt.hash(password, 10)
            await user.update({
                name,
                email,
                account,
                password: hash
            })
            res.redirect(`/users/${id}`)
        } catch(e) { next(e) }
    }
}

module.exports = userController