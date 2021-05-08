const express = require('express')

const adminController = require('../controllers/adminController')

exports.router = (() => {

  const adminRouter = express.Router()

  adminRouter.route('/users/').get(adminController.getUsers)

  adminRouter.route('/users/:id').get(adminController.getUser)

  return adminRouter

})()