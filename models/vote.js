const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    users : {
        type : Array
    }
})

const Vote = mongoose.model('Vote', voteSchema)
module.exports = Vote