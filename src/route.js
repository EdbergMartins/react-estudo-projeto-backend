const registerController = require('./controles/registerController')
const express = require('express')

const router = express.Router();

router.post('/register', registerController.registerUser)

module.exports = router;