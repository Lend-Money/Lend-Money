const express = require ('express')
const router = express.Router()
const controle =  require ('../controllers/controle')


router.get('/', controle.home)










module.exports = router