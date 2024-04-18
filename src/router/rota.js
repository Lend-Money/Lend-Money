const express = require ('express')
const router = express.Router()
const controle =  require ('../controllers/controle')


router.get('/', controle.home)
router.get('/cadastro', controle.cadastro)
router.get('/login', controle.login)










module.exports = router