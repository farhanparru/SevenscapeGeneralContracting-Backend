const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/userController')

router.post('/contactUs',UserCtrl.Contactus)





module.exports = router