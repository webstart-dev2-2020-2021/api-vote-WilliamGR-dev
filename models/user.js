const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    hash : {
        type : String,
        select: false
    },
    salt : {
        type : String,
        select: false
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
})

userSchema.methods.setPassword = function(password)
{
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.passwordIsValid = function(password)
{
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
}

userSchema.methods.generateJWT = function()
{
    return jwt.sign({
        _id : this._id,
        name : this.name,
    }, JWT_SECRET, { expiresIn : '7d' })
}

const User = mongoose.model('User', userSchema)
module.exports = User

