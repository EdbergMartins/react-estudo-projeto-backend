const registerController = require('./controles/registerController')
const loginController = require('./controles/loginController')
const loginValidateMiddlewares = require('./middlewares/loginValidateMiddlewares')
const projectsController = require('./controles/projectsController')
const movimentationFinanceControler = require('./controles/movimentationFinanceController')
const express = require('express')

const router = express.Router();

router.post('/register', registerController.registerUser)
router.post('/login', loginController.loginUser)
router.post('/project', projectsController.createProject)
router.put('/project', projectsController.editProject)
router.delete('/project', projectsController.deleteProject)
router.get('/project', projectsController.getProjectsUser)
router.post('/transaction/debit', movimentationFinanceControler.registerDebit)
router.post('/transaction/credit', movimentationFinanceControler.registerCredit)
router.get('/transactions', movimentationFinanceControler.getAllTransactions) 

module.exports = router;