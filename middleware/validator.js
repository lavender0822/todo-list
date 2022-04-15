const { List } = require('../models')

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

const listCheck = (req, res, next) => {
    const { name, date, startTime, endTime } = req.body
    if (!name) throw new Error('請填寫名稱')
    if (!date && startTime) throw new Error('請填寫日期')
    if (endTime) { 
        if (startTime > endTime || (!startTime && endTime)) throw new Error('結束時間必須晚於開始時間')
    }
    next()
}

const clockCheck = async (req, res, next) => {
    try{
        const { id } = req.params
        const { date, time } = req.body
        const list = await List.findByPk(id,{ raw: true })
        if (!date || !time) throw new Error('請填寫完整')
        if (list.date && list.date < date) {
            throw new Error('日期請早於清單')
        } else if (list.date === date){
            if (list.startTime && list.startTime < time) throw new Error('時間請早於清單')
        }
    } catch (e) { next(e) }
    next()
}

module.exports = {
    registerCheck,
    listCheck,
    clockCheck
}