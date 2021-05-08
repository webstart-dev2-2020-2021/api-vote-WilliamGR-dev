const User = require('../models/user')
module.exports ={
    async signup(req, res){
        
        const{name, email, password} = req.body

        try{
            const newUser = new User({name, email, password})
            const savedUser = await newUser.save()
            return res.status(201).send({
                success: true,
                name: savedUser.name,
                _id: savedUser._id,
            })

        }
        catch (error){
            return res.status(500).send('erreur')
        }
    },
    async signin(req, res){

        const{email, password} = req.body

        try{
            const user = await User.findOne({
                "email": email,
                "password": password
            })
            return res.status(201).json({
                "success": true,
                "user": {
                    name: user.name,
                    _id: user._id
                }
                } )
        }
        catch (error){
            return res.status(500).send('erreur')
        }
    },

}