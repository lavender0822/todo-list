const { Clock } = require('../../models')

const clockService = require('../../services/clock-services')

const clockController = {
    postClock: (req, res, next) => {
        clockService.postClock(req, (err) => {
            if (err) return next(err)
            res.redirect(`/lists/${ req.params.id }`)
        })
    },

    patchClock: async (req, res, next) => {
        clockService.patchClock(req, (err) => {
            if (err) return next(err)
            res.redirect(`back`)
        })
    },

    deleteClock: async (req, res, next) => {
        clockService.deleteClock(req, (err) => {
            if (err) return next(err)
            res.redirect(`back`)
        })
    }
}

module.exports = clockController