const { Clock } = require('../../models')

const clockController = {
    postClock: (req, res) => {
        const listId = req.params.id
        const { date, time } = req.body
        Clock.create({
            listId,
            date,
            time,
            isDone: false
        })
        res.redirect(`/lists/${ listId }`)
    },

    patchClock: async (req, res, next) => {
        try{
            const { id } = req.params
            const clock = await Clock.findByPk(id)
            const { isDone, listId } = clock
            await clock.update({isDone: !isDone })
            res.redirect(`/lists/${listId}`)
        } catch(e){ next(e) }
    },

    deleteClock: async (req, res, next) => {
        try{
            const { id } = req.params
            const clock = await Clock.findByPk(id)
            const { listId } = clock
            await clock.destroy()
            res.redirect(`/lists/${listId}`)
        } catch(e){ next(e) }
    }
}

module.exports = clockController