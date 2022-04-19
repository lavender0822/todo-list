const { Clock } = require('../../models')

const clockService = require('../../services/clock-services')

const clockController = {
    postClock: (req, res, next) => {
        clockService.postClock(req, (err,data) => err ? next(err) : res.json(data))
    },

    patchClock: (req, res, next) => {
        clockService.patchClock(req, (err,data) => err ? next(err) : res.json(data))
    },

    deleteClock: (req, res, next) => {
        clockService.deleteClock(req, (err,data) => err ? next(err) : res.json(data))
    }
}

module.exports = clockController