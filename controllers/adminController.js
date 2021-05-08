const User = require('../models/user')
module.exports = {

    async getUsers(req, res) {

        try{
            const allUsers = await User.find().select('name');
          return res.status(200).json({
            "success": true,
            "users": [
                allUsers
            ]
        })
        }
        catch (error){
            return res.status(500).send('erreur')
        }
  
    },

    async getUser(req, res) {

        const idSelected = req.params.id;
        try{
            const userSelected = await User.findById(idSelected).select('name');
          return res.status(200).json({
            "success": true,
            "user":
                userSelected

        })
        }
        catch (error){
            return res.status(500).send('erreur')
        }
  
    },
  
  }