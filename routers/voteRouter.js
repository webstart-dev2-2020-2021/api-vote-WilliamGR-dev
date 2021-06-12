const express = require('express')

const voteController = require('../controllers/voteController')

exports.router = (() => {

    const voteRouter = express.Router()

    voteRouter.route('/').get(voteController.votes)

    voteRouter.route('/:id').post(voteController.vote)

    voteRouter.route('/create').post(voteController.create)

    voteRouter.route('/:id').delete(voteController.remove)

    return voteRouter
})()