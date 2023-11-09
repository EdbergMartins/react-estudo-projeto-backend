const registerController = require('./controles/registerController')
const loginController = require('./controles/loginController')
const loginValidateMiddlewares = require('./middlewares/loginValidateMiddlewares')
const express = require('express')

const router = express.Router();

router.post('/register', registerController.registerUser)
router.get('/login', loginController.loginUser)

module.exports = router;