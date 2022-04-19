const { Clock, List } = require('../models')

const clockService = {
    postClock: async (req, cb) => {
        try{
            const userId = req.user.id
            const listId = req.params.id
            const list = await List.findByPk(listId)
            if (list.userId !== userId) throw new Error('無權新增')
            const { date, time } = req.body
            const newClock = await Clock.create({
                listId,
                date,
                time,
                isDone: false
            })
            cb(null, { clock: newClock })
        } catch(e) { cb(e) }
    },

    patchClock: async (req, cb) => {
        try{
            const userId = req.user.id
            const { id } = req.params
            const clock = await Clock.findByPk(id)
            const { isDone, listId } = clock
            const list = await List.findByPk(listId)
            if (list.userId !== userId) throw new Error('無權更改')
            const newClock = await clock.update({isDone: !isDone })
            cb(null, { clock: newClock })
        } catch(e){ cb(e) }
    },

    deleteClock: async (req, cb) => {
        try{
            const userId = req.user.id
            const { id } = req.params
            const clock = await Clock.findByPk(id)
            const { listId } = clock
            const list = await List.findByPk(listId)
            if (list.userId !== userId) throw new Error('無權更改')
            await clock.destroy()
            cb(null, { clock })
        } catch(e){ cb(e) }
    }
}

module.exports = clockService