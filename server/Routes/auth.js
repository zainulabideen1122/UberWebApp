const express = require('express')

const router = express.Router();

const loginController = require('../controller/auth')

router.post('/login', loginController.Login)
router.post('/register', loginController.Register)
router.post('/googleAuth', loginController.googleAuth)


module.exports = router