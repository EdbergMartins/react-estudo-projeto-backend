const registerController = require('./controles/registerController')
const loginController = require('./controles/loginController')
const loginValidateMiddlewares = require('./middlewares/loginValidateMiddlewares')
const projectsController = require('./controles/projectsController')
const movimentationFinanceControler = require('./controles/movimentationFinanceController')
const express = require('express')

const router = express.Router();

router.post('/register', registerController.registerUser)
router.post('/login', loginController.loginUser)
router.post('/project', [loginValidateMiddlewares.verificaToken], projectsController.createProject)
router.put('/project', [loginValidateMiddlewares.verificaToken], projectsController.editProject)
router.delete('/project', [loginValidateMiddlewares.verificaToken], projectsController.deleteProject)
router.get('/project', [loginValidateMiddlewares.verificaToken], projectsController.getProjectsUser)
router.post('/transaction/debit', [loginValidateMiddlewares.verificaToken], movimentationFinanceControler.registerDebit)
router.post('/transaction/credit', [loginValidateMiddlewares.verificaToken], movimentationFinanceControler.registerCredit)
router.get('/transactions', [loginValidateMiddlewares.verificaToken], movimentationFinanceControler.getAllTransactions) 

module.exports = router;