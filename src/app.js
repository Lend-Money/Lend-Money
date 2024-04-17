const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const controle = require('../src/controllers/controle')
const rota = require('./router/rota')

app.engine('handlebars' , exphbs.engine())
app.set('view engine' , 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true,}),)
app.use(express.json())
app.use(rota)



app.listen(5000)