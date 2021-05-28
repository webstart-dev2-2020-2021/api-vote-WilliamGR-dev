const User = require("../models/user")
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

module.exports = {
    async signup(req, res) {
        const {
            body: {name, password, email},
        } = req
        if(!name || !password || !email) {
            return res.status('401').json({
                success : false,
                msg : "All input required"
            })
        }

        try {
            const newUser = new User({name, password, email})
            newUser.setPassword(password)

            const savedUser = await newUser.save()

            let transporter = nodemailer.createTransport({
                service : 'gmail',
                auth : {
                    user : process.env.MAIL_USER,
                    pass : process.env.MAIL_PASSWORD
                }
            })

            let mailSend = await transporter.sendMail({
                from : 'wgirardreydet@gmail.com',
                to : email,
                subject : 'Compte crée',
                text : `
                    Bonjour ${name} !
                    Féliciation votre compte a été crée !
                    Vous pouvez maintenant voter.
                `
            });

            return res.status(201).send({
                success: true,
                name: savedUser.name,
                _id: savedUser._id
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
            })
        }
    },

    async signin(req, res) {
        const {
            body: { name, password },
        } = req
        if(!name || !password)  {
            return res.status('401').json({
                success : false,
                msg : "All input required"
            })
        }

        try {
            const user = await User.findOne({name})
            if(!user || !user.passwordIsValid(password)) {
                res.status('401').json({
                    success : false,
                    msg : "An user as use this email"
                })
                throw new Error("Error !")
            }
            const jwt = user.generateJWT()
            return res.status('200').json({
                success : true,
                jwt,
            })
        }
        catch (error) {
            console.error('error in post /signin : ', error)
            return res.status('500').json({
                success : false,
                msg : "error connexion"
            })
        }
    }
}