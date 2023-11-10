const registerController = require('./controles/registerController')
const loginController = require('./controles/loginController')
const loginValidateMiddlewares = require('./middlewares/loginValidateMiddlewares')
const projectsController = require('./controles/projectsController')
const express = require('express')

const router = express.Router();

router.post('/register', registerController.registerUser)
router.get('/login', loginController.loginUser)
router.post('/project', projectsController.createProject)
router.put('/project', projectsController.editProject)
router.delete('/project', projectsController.deleteProject)
router.get('/project', projectsController.getProjectsUser)

module.exports = router;