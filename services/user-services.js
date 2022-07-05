const bcrypt = require('bcryptjs');

const { User } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

const userController = {
    register: async (req, cb) => {
        const { name, email, account, password } = req.body
        try {
            const userAccount = await User.findOne({ where: { account } })
            const userEmail = await User.findOne({ where: { email } })

            if (userAccount) throw new Error('帳號已存在')
            if (userEmail) throw new Error('信箱已被使用')

            const hash = await bcrypt.hash(password, 10)
            const user = await User.create({ name, email, account, password: hash,  raw: true })
            delete user.password

            cb(null, { user })

        } catch (err) { cb(err) }
    },

    getUser: async (req, cb) => {
        try{
            const { id } = req.user
            const user = await User.findByPk(id,{ raw: true })
            cb(null, { user })
        } catch (e) { cb(e) }
    },

    editPage: async (req, cb) => {
        try{
            const { id } = req.user
            const user = await User.findByPk(id,{ raw: true })
            cb(null, { user })
        } catch (e) { cb(e) }
    },

    putUser: async (req, cb) => {
        try{
            const { id } = req.user
            const user = await User.findByPk(id)
            const { name, email, account, password } = req.body
            const userAccount = await User.findOne({ where: { account } })
            const userEmail = await User.findOne({ where: { email } })

            if (userAccount.id != id) throw new Error('帳號已存在')
            if (userEmail.id != id) throw new Error('信箱已被使用')
            const hash = await bcrypt.hash(password, 10)
            const { file } = req
            const avatar = file ? localFileHandler(file) : null
            const newUser = await user.update({
                name,
                email,
                account,
                password: hash,
                avatar
            })
            cb(null, { user: newUser.toJSON() })
        } catch(e) { cb(e) }
    }
}

module.exports = userController