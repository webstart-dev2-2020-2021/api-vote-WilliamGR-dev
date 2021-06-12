const Vote = require("../models/vote")
const jwt = require('jsonwebtoken')
const json = require('body-parser')

module.exports = {
    async create(req, res) {
        const {name } = req.body
        if(!name)
        {
            return res.status('401').json({
                success : false,
                msg : "name mandatory"
            })
        }

        try {
            const newVote = new Vote({name})
            const sendVote = await newVote.save()

            return res.status(201).send({
                success: true,
                msg : 'Vote register'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success : false,
                msg : "lost connexion"
            })
        }
    },

    async vote(req, res) {
        const { id } = req.params
        try{
            const token =  req.headers.authorization.split(' ')[1]
            const decoded = jwt.verifys(token, JWT_SECRET)
            const vote = await Vote.findById(id)

            if (vote.users.includes(decoded._id)) {
                return res.status(201).send({
                    success: false,
                    msg : 'you already vote'
                })
            }

            const postVote = await Vote.updateOne(
                { _id: id },
                { $push: { users: decoded._id } }
            )

            return res.status(201).send({
                success: true,
                msg : "vote accepted"
            })
        }
        catch(error){
            console.log(error)
            return res.status('500').json({
                success : false,
                msg : "lost connexion"
            })
        }
    },

    async votes(req, res) {
        const votes = await Vote.find({}, 'name users')
        return res.status(201).send({
            success: true,
            votes : votes
        })
    },

    async remove(req, res) {
        const { id } = req.params
        try{
            const token =  req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, JWT_SECRET)
            const vote = await Vote.findById(id)

            if (!vote.users.includes(decoded._id)) {
                return res.status(403).send({
                    success: false,
                    msg : "Vote inexistant !"
                })
            }

            const remove = await Vote.updateOne(
                { _id: id },
                { $pull: { users: decoded._id } }
            )
            return res.status(201).send({
                success: true,
                msg : "Vote supprimé !"
            })
        }
        catch(error){
            console.log(error)
            return res.status('500').json({
                success : false,
                msg : "Problème de connexion !"
            })
        }
    }
}