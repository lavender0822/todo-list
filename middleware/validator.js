const { check, validationResult } = require('express-validator')

const registerCheck = (req, res, next) => {
    const data = req.body
    const { name, email, account, password, checkPassword } = data
    if (!account || !password || !checkPassword || !name || !email) throw new Error('不可有空白')
    if (name.length > 50) throw new Error('名字須在五十字以內')
    if (account.length < 6) throw new Error('帳號需六碼以上')
    if (password.length < 8) throw new Error('密碼需八碼以上')
    if (password !== checkPassword) throw new Error('兩次輸入的密碼不相同')
    next()
}

module.exports = {
    registerCheck
}

